import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Calendar, 
  BarChart3,
  Target,
  Zap,
  ArrowUp,
  ArrowDown,
  Package
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend
} from "recharts";

// Sample forecasting data
const salesForecast = [
  { period: "Week 1", actual: 45000, predicted: 47000, confidence: 0.85 },
  { period: "Week 2", actual: 38000, predicted: 42000, confidence: 0.82 },
  { period: "Week 3", actual: 52000, predicted: 48000, confidence: 0.88 },
  { period: "Week 4", actual: 48000, predicted: 51000, confidence: 0.84 },
  { period: "Week 5", actual: null, predicted: 53000, confidence: 0.79 },
  { period: "Week 6", actual: null, predicted: 56000, confidence: 0.76 },
  { period: "Week 7", actual: null, predicted: 58000, confidence: 0.73 },
  { period: "Week 8", actual: null, predicted: 61000, confidence: 0.70 },
];

const demandForecast = [
  { product: "Bananas", current: 45, predicted: 65, change: 44, trend: "up" },
  { product: "Milk", current: 15, predicted: 35, change: 133, trend: "up" },
  { product: "Bread", current: 8, predicted: 25, change: 213, trend: "up" },
  { product: "Apples", current: 30, predicted: 28, change: -7, trend: "down" },
  { product: "Eggs", current: 25, predicted: 40, change: 60, trend: "up" },
  { product: "Tomatoes", current: 20, predicted: 18, change: -10, trend: "down" },
];

const seasonalTrends = [
  { month: "Jan", bananas: 1200, milk: 980, bread: 850 },
  { month: "Feb", bananas: 1150, milk: 920, bread: 800 },
  { month: "Mar", bananas: 1300, milk: 1050, bread: 900 },
  { month: "Apr", bananas: 1400, milk: 1100, bread: 950 },
  { month: "May", bananas: 1600, milk: 1200, bread: 1000 },
  { month: "Jun", bananas: 1800, milk: 1350, bread: 1100 },
  { month: "Jul", bananas: 1900, milk: 1400, bread: 1150 },
  { month: "Aug", bananas: 1850, milk: 1380, bread: 1120 },
  { month: "Sep", bananas: 1700, milk: 1250, bread: 1050 },
  { month: "Oct", bananas: 1500, milk: 1150, bread: 980 },
  { month: "Nov", bananas: 1350, milk: 1000, bread: 900 },
  { month: "Dec", bananas: 1450, milk: 1080, bread: 950 },
];

const aiInsights = [
  {
    type: "opportunity",
    title: "Summer Demand Surge",
    description: "Fruit demand expected to increase 35% in coming weeks due to seasonal patterns",
    confidence: 0.87,
    action: "Increase fruit inventory by 40%"
  },
  {
    type: "warning",
    title: "Bakery Decline Predicted",
    description: "Bread sales may drop 15% next month based on market trends",
    confidence: 0.72,
    action: "Consider promotional campaigns"
  },
  {
    type: "trend",
    title: "Dairy Consumption Rising",
    description: "Steady 20% growth in dairy products expected over next quarter",
    confidence: 0.81,
    action: "Expand dairy supplier relationships"
  }
];

export default function Forecasting() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Forecasting & Planning</h1>
          <p className="text-muted-foreground mt-1">AI-powered demand prediction and business planning</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 Days</SelectItem>
              <SelectItem value="30days">30 Days</SelectItem>
              <SelectItem value="90days">90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gradient-primary shadow-button">
            <Zap className="h-4 w-4 mr-2" />
            Generate Forecast
          </Button>
        </div>
      </div>

      {/* AI Insights */}
      <div className="grid gap-4 md:grid-cols-3">
        {aiInsights.map((insight, index) => (
          <Card key={index} className={`border-0 shadow-card ${
            insight.type === "opportunity" ? "bg-gradient-success" :
            insight.type === "warning" ? "bg-gradient-warning" :
            "bg-gradient-card"
          }`}>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant={insight.type === "warning" ? "destructive" : "secondary"} className="text-xs">
                    {insight.type}
                  </Badge>
                  <div className={`text-xs font-medium ${
                    insight.type === "opportunity" || insight.type === "warning" ? "text-current opacity-80" : "text-muted-foreground"
                  }`}>
                    {Math.round(insight.confidence * 100)}% confidence
                  </div>
                </div>
                <div>
                  <h3 className={`font-semibold ${
                    insight.type === "opportunity" || insight.type === "warning" ? "text-current" : "text-foreground"
                  }`}>
                    {insight.title}
                  </h3>
                  <p className={`text-sm mt-1 ${
                    insight.type === "opportunity" || insight.type === "warning" ? "text-current opacity-90" : "text-muted-foreground"
                  }`}>
                    {insight.description}
                  </p>
                </div>
                <div className={`text-xs font-medium ${
                  insight.type === "opportunity" || insight.type === "warning" ? "text-current opacity-75" : "text-primary"
                }`}>
                  Action: {insight.action}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Forecasting Tabs */}
      <Tabs defaultValue="sales" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sales">Sales Forecast</TabsTrigger>
          <TabsTrigger value="demand">Demand Planning</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6">
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Revenue Forecast vs Actual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={salesForecast}>
                  <defs>
                    <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(214, 84%, 56%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(214, 84%, 56%)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="hsl(214, 84%, 56%)" 
                    fill="url(#actualGradient)"
                    strokeWidth={3}
                    name="Actual Sales"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="hsl(142, 71%, 45%)" 
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    name="Predicted Sales"
                    dot={{ fill: "hsl(142, 71%, 45%)", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demand" className="space-y-6">
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Inventory Demand Forecast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {demandForecast.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-background transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.product}</h3>
                        <p className="text-sm text-muted-foreground">
                          Current: {item.current} units
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">Predicted: {item.predicted}</p>
                        <div className="flex items-center gap-1 text-sm">
                          {item.trend === "up" ? (
                            <ArrowUp className="h-3 w-3 text-success" />
                          ) : (
                            <ArrowDown className="h-3 w-3 text-destructive" />
                          )}
                          <span className={item.trend === "up" ? "text-success" : "text-destructive"}>
                            {item.change > 0 ? "+" : ""}{item.change}%
                          </span>
                        </div>
                      </div>
                      
                      <Badge variant={item.trend === "up" ? "default" : "destructive"} className={
                        item.trend === "up" ? "bg-success text-success-foreground" : ""
                      }>
                        {item.trend === "up" ? "Growing" : "Declining"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seasonal" className="space-y-6">
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Seasonal Sales Patterns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={seasonalTrends}>
                  <defs>
                    <linearGradient id="bananasGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="milkGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(214, 84%, 56%)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(214, 84%, 56%)" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="breadGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="bananas"
                    stackId="1"
                    stroke="hsl(38, 92%, 50%)"
                    fill="url(#bananasGradient)"
                    name="Bananas"
                  />
                  <Area
                    type="monotone"
                    dataKey="milk"
                    stackId="1"
                    stroke="hsl(214, 84%, 56%)"
                    fill="url(#milkGradient)"
                    name="Milk"
                  />
                  <Area
                    type="monotone"
                    dataKey="bread"
                    stackId="1"
                    stroke="hsl(142, 71%, 45%)"
                    fill="url(#breadGradient)"
                    name="Bread"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}