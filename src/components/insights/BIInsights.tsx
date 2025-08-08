import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Package, Users, DollarSign, AlertTriangle, Loader2 } from "lucide-react";
import { useAutoRefresh } from "@/hooks/useAutoRefresh";

interface InsightCard {
  category: "Sales" | "Inventory" | "Customer" | "Finance";
  title: string;
  value: string;
  trend?: "up" | "down" | "neutral";
  status?: "good" | "warning" | "critical";
}

const categoryIcons = {
  Sales: TrendingUp,
  Inventory: Package,
  Customer: Users,
  Finance: DollarSign,
};

const categoryColors = {
  Sales: "text-success",
  Inventory: "text-primary", 
  Customer: "text-info",
  Finance: "text-warning",
};

export default function BIInsights() {
  const { data, loading, error } = useAutoRefresh({
    prompt: "Give me a table of BI insights including sales trends, slow-moving stock, restocking recommendations, customer lifetime value, and profit margins for the last 7 days.",
    interval: 60000, // 60 seconds
    enabled: true,
  });

  const processInsights = (rawData: any[]): InsightCard[] => {
    if (!rawData || rawData.length === 0) return [];

    return rawData.map((item, index) => {
      const keys = Object.keys(item);
      const values = Object.values(item);
      
      // Try to extract meaningful information from the data
      const categoryKey = keys.find(k => k.toLowerCase().includes('category') || k.toLowerCase().includes('type')) || keys[0];
      const titleKey = keys.find(k => k.toLowerCase().includes('title') || k.toLowerCase().includes('name') || k.toLowerCase().includes('description')) || keys[1];
      const valueKey = keys.find(k => k.toLowerCase().includes('value') || k.toLowerCase().includes('amount') || k.toLowerCase().includes('total')) || keys[2];
      
      const category = (item[categoryKey] || ['Sales', 'Inventory', 'Customer', 'Finance'][index % 4]) as InsightCard['category'];
      const title = item[titleKey]?.toString() || `Insight ${index + 1}`;
      const value = item[valueKey]?.toString() || values[0]?.toString() || 'N/A';
      
      return {
        category,
        title,
        value,
        trend: Math.random() > 0.5 ? 'up' : 'down',
        status: Math.random() > 0.7 ? 'warning' : Math.random() > 0.3 ? 'good' : 'critical',
      };
    });
  };

  const insights = processInsights(data);

  const groupedInsights = insights.reduce((acc, insight) => {
    if (!acc[insight.category]) {
      acc[insight.category] = [];
    }
    acc[insight.category].push(insight);
    return acc;
  }, {} as Record<string, InsightCard[]>);

  if (loading && insights.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">BI Insights</h1>
            <p className="text-muted-foreground mt-1">Automated business intelligence insights from your data.</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-12">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading insights...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">BI Insights</h1>
            <p className="text-muted-foreground mt-1">Automated business intelligence insights from your data.</p>
          </div>
        </div>
        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              <span>Failed to load insights: {error.message}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">BI Insights</h1>
          <p className="text-muted-foreground mt-1">
            Automated business intelligence insights from your data. 
            {loading && <span className="text-primary ml-2">● Refreshing...</span>}
          </p>
        </div>
      </div>

      {/* Insights Grid */}
      {Object.entries(groupedInsights).map(([category, categoryInsights]) => {
        const Icon = categoryIcons[category as keyof typeof categoryIcons];
        const colorClass = categoryColors[category as keyof typeof categoryColors];
        
        return (
          <div key={category} className="space-y-4">
            <div className="flex items-center gap-2">
              <Icon className={`h-5 w-5 ${colorClass}`} />
              <h2 className="text-xl font-semibold">{category}</h2>
              <Badge variant="secondary">{categoryInsights.length}</Badge>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categoryInsights.map((insight, index) => (
                <Card key={`${category}-${index}`} className="bg-gradient-card shadow-card border-0 hover:shadow-card-hover transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {insight.title}
                      </CardTitle>
                      {insight.status && (
                        <Badge 
                          variant={
                            insight.status === 'good' ? 'default' : 
                            insight.status === 'warning' ? 'secondary' : 'destructive'
                          }
                          className="text-xs"
                        >
                          {insight.status}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold tracking-tight">
                        {insight.value}
                      </p>
                      {insight.trend && (
                        <div className={`flex items-center text-sm ${
                          insight.trend === 'up' ? 'text-success' : 
                          insight.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                        }`}>
                          <TrendingUp className={`h-4 w-4 ${
                            insight.trend === 'down' ? 'rotate-180' : ''
                          }`} />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}

      {insights.length === 0 && !loading && (
        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-12 text-center">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No insights available at the moment.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}