import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  Bell, 
  CheckCircle, 
  XCircle, 
  Search,
  Filter,
  Clock,
  Package,
  TrendingDown,
  Shield,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: number;
  type: "critical" | "warning" | "info";
  category: "inventory" | "sales" | "system" | "security";
  title: string;
  description: string;
  timestamp: string;
  acknowledged: boolean;
  actionRequired: boolean;
}

const sampleAlerts: Alert[] = [
  {
    id: 1,
    type: "critical",
    category: "inventory",
    title: "Critical Stock Level",
    description: "White Bread is critically low (8 units remaining, minimum 15)",
    timestamp: "5 minutes ago",
    acknowledged: false,
    actionRequired: true
  },
  {
    id: 2,
    type: "warning",
    category: "inventory",
    title: "Low Stock Alert",
    description: "Milk (1L) stock is below minimum threshold (15 units, minimum 25)",
    timestamp: "1 hour ago",
    acknowledged: false,
    actionRequired: true
  },
  {
    id: 3,
    type: "warning",
    category: "sales",
    title: "Sales Target Behind",
    description: "Daily sales target 20% behind schedule as of 3 PM",
    timestamp: "2 hours ago",
    acknowledged: true,
    actionRequired: false
  },
  {
    id: 4,
    type: "info",
    category: "system",
    title: "Data Sync Complete",
    description: "Daily inventory sync completed successfully",
    timestamp: "3 hours ago",
    acknowledged: true,
    actionRequired: false
  },
  {
    id: 5,
    type: "critical",
    category: "security",
    title: "Unusual Transaction",
    description: "Large cash transaction (₹10,000) detected at 11:30 PM",
    timestamp: "Yesterday",
    acknowledged: false,
    actionRequired: true
  },
  {
    id: 6,
    type: "warning",
    category: "sales",
    title: "Product Performance Alert",
    description: "Tomatoes sales declined 30% compared to last week",
    timestamp: "Yesterday",
    acknowledged: true,
    actionRequired: false
  }
];

const getAlertIcon = (category: string) => {
  switch (category) {
    case "inventory": return Package;
    case "sales": return TrendingDown;
    case "system": return Zap;
    case "security": return Shield;
    default: return Bell;
  }
};

const getAlertColor = (type: string) => {
  switch (type) {
    case "critical": return "destructive";
    case "warning": return "warning";
    case "info": return "secondary";
    default: return "secondary";
  }
};

export default function AlertsCenter() {
  const [alerts, setAlerts] = useState(sampleAlerts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "unread" | "critical">("all");

  const acknowledgeAlert = (id: number) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === id ? { ...alert, acknowledged: true } : alert
    ));
  };

  const dismissAlert = (id: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (filterType) {
      case "unread":
        return matchesSearch && !alert.acknowledged;
      case "critical":
        return matchesSearch && alert.type === "critical";
      default:
        return matchesSearch;
    }
  });

  const criticalCount = alerts.filter(a => a.type === "critical" && !a.acknowledged).length;
  const warningCount = alerts.filter(a => a.type === "warning" && !a.acknowledged).length;
  const unreadCount = alerts.filter(a => !a.acknowledged).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Alerts Center</h1>
          <p className="text-muted-foreground mt-1">Monitor and manage system alerts and notifications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button className="bg-gradient-primary shadow-button">
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Alert Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-destructive shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-destructive-foreground/90 text-sm font-medium">Critical Alerts</p>
                <p className="text-destructive-foreground text-2xl font-bold">{criticalCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-warning shadow-warning border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-warning-foreground/90 text-sm font-medium">Warning Alerts</p>
                <p className="text-warning-foreground text-2xl font-bold">{warningCount}</p>
              </div>
              <Bell className="h-8 w-8 text-warning-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Unread Total</p>
                <p className="text-foreground text-2xl font-bold">{unreadCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Recent Alerts
            </CardTitle>
            <div className="flex gap-2">
              <div className="relative md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={filterType} onValueChange={(value: any) => setFilterType(value)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Alerts</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="critical">Critical</TabsTrigger>
            </TabsList>

            <TabsContent value={filterType} className="mt-6">
              <div className="space-y-3">
                {filteredAlerts.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No alerts found</p>
                  </div>
                ) : (
                  filteredAlerts.map((alert) => {
                    const IconComponent = getAlertIcon(alert.category);
                    const alertColor = getAlertColor(alert.type);
                    
                    return (
                      <div
                        key={alert.id}
                        className={cn(
                          "p-4 rounded-lg border transition-all duration-200",
                          alert.acknowledged ? "bg-background/50 border-border" : "bg-background border-l-4",
                          alert.type === "critical" && !alert.acknowledged && "border-l-destructive bg-destructive-light/50",
                          alert.type === "warning" && !alert.acknowledged && "border-l-warning bg-warning-light/50",
                          alert.type === "info" && !alert.acknowledged && "border-l-primary bg-primary-light/50"
                        )}
                      >
                        <div className="flex items-start gap-4">
                          <div className={cn(
                            "p-2 rounded-lg",
                            alert.type === "critical" && "bg-destructive/10 text-destructive",
                            alert.type === "warning" && "bg-warning/10 text-warning",
                            alert.type === "info" && "bg-primary/10 text-primary"
                          )}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground">{alert.title}</h3>
                              <Badge variant={alertColor as any} className="text-xs">
                                {alert.type}
                              </Badge>
                              {alert.actionRequired && (
                                <Badge variant="outline" className="text-xs">
                                  Action Required
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{alert.description}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {alert.timestamp}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {!alert.acknowledged && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => acknowledgeAlert(alert.id)}
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Acknowledge
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => dismissAlert(alert.id)}
                            >
                              <XCircle className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}