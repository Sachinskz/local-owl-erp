import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAutoRefresh } from "@/hooks/useAutoRefresh";

interface DynamicMetricsCardProps {
  title: string;
  prompt: string;
  icon: LucideIcon;
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
  formatValue?: (value: any) => string;
  getChange?: (data: any[]) => string;
  getChangeType?: (data: any[]) => "positive" | "negative" | "neutral";
}

export default function DynamicMetricsCard({
  title,
  prompt,
  icon: Icon,
  variant = "default",
  className,
  formatValue,
  getChange,
  getChangeType
}: DynamicMetricsCardProps) {
  const [displayValue, setDisplayValue] = useState<string>("-");
  const [change, setChange] = useState<string>("");
  const [changeType, setChangeType] = useState<"positive" | "negative" | "neutral">("neutral");

  const { data, loading, error } = useAutoRefresh({
    prompt,
    interval: 60000, // 60 seconds
    enabled: true,
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const value = data[0];
      
      // Format the display value
      if (formatValue) {
        setDisplayValue(formatValue(value));
      } else {
        // Default formatting - use the first non-null value from the first row
        const firstValue = Object.values(value).find(v => v !== null && v !== undefined);
        setDisplayValue(firstValue?.toString() || "-");
      }
      
      // Set change text if function provided
      if (getChange) {
        setChange(getChange(data));
      }
      
      // Set change type if function provided
      if (getChangeType) {
        setChangeType(getChangeType(data));
      }
    }
  }, [data, formatValue, getChange, getChangeType]);

  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "bg-gradient-success text-success-foreground shadow-success";
      case "warning":
        return "bg-gradient-warning text-warning-foreground shadow-warning";
      case "danger":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-gradient-card shadow-card hover:shadow-card-hover";
    }
  };

  const getChangeStyles = () => {
    switch (changeType) {
      case "positive":
        return "text-success";
      case "negative":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className={cn(
      "transition-all duration-300 hover:scale-[1.02] border-0 relative",
      getVariantStyles(),
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className={cn(
              "text-sm font-medium",
              variant === "default" ? "text-muted-foreground" : "text-current opacity-90"
            )}>
              {title}
            </p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold tracking-tight">
                {loading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : error ? (
                  <span className="text-destructive text-sm">Error</span>
                ) : (
                  displayValue
                )}
              </p>
            </div>
            {change && !loading && !error && (
              <p className={cn("text-xs font-medium", 
                variant === "default" ? getChangeStyles() : "text-current opacity-75"
              )}>
                {change}
              </p>
            )}
            {error && (
              <p className="text-xs text-destructive">
                Failed to load data
              </p>
            )}
          </div>
          <div className={cn(
            "p-3 rounded-xl",
            variant === "default" 
              ? "bg-primary/10 text-primary" 
              : "bg-white/20 text-current"
          )}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        {loading && (
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}