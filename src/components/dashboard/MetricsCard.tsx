import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
}

export default function MetricsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  variant = "default",
  className
}: MetricsCardProps) {
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
      "transition-all duration-300 hover:scale-[1.02] border-0",
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
            <p className="text-2xl font-bold tracking-tight">
              {typeof value === "number" ? value.toLocaleString() : value}
            </p>
            {change && (
              <p className={cn("text-xs font-medium", 
                variant === "default" ? getChangeStyles() : "text-current opacity-75"
              )}>
                {change}
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
      </CardContent>
    </Card>
  );
}