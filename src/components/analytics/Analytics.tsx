import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Download,
  MessageSquare,
  Search
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

// Sample analytics data
const monthlyRevenue = [
  { month: "Jan", revenue: 45000, target: 40000, growth: 12 },
  { month: "Feb", revenue: 38000, target: 40000, growth: -5 },
  { month: "Mar", revenue: 52000, target: 40000, growth: 23 },
  { month: "Apr", revenue: 48000, target: 40000, growth: 15 },
  { month: "May", revenue: 55000, target: 40000, growth: 28 },
  { month: "Jun", revenue: 62000, target: 40000, growth: 35 },
];

const productPerformance = [
  { name: "Bananas", sales: 1250, profit: 850, margin: 68 },
  { name: "Milk", sales: 980, profit: 420, margin: 43 },
  { name: "Bread", sales: 850, profit: 380, margin: 45 },
  { name: "Apples", sales: 720, profit: 320, margin: 44 },
  { name: "Eggs", sales: 680, profit: 280, margin: 41 },
  { name: "Tomatoes", sales: 590, profit: 240, margin: 41 },
];

const customerSegments = [
  { name: "Regular", value: 45, color: "hsl(214, 84%, 56%)" },
  { name: "Premium", value: 25, color: "hsl(142, 71%, 45%)" },
  { name: "Occasional", value: 20, color: "hsl(38, 92%, 50%)" },
  { name: "New", value: 10, color: "hsl(220, 15%, 60%)" },
];

const hourlyTraffic = [
  { hour: "9 AM", customers: 12 },
  { hour: "10 AM", customers: 18 },
  { hour: "11 AM", customers: 25 },
  { hour: "12 PM", customers: 35 },
  { hour: "1 PM", customers: 42 },
  { hour: "2 PM", customers: 38 },
  { hour: "3 PM", customers: 28 },
  { hour: "4 PM", customers: 32 },
  { hour: "5 PM", customers: 45 },
  { hour: "6 PM", customers: 52 },
  { hour: "7 PM", customers: 38 },
  { hour: "8 PM", customers: 22 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground mt-1">Comprehensive insights into your business performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button className="bg-gradient-primary shadow-button">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Revenue Trend */}
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Revenue Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyRevenue}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(214, 84%, 56%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(214, 84%, 56%)" stopOpacity={0}/>
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
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(214, 84%, 56%)" 
                    fillOpacity={1} 
                    fill="url(#revenueGradient)"
                    strokeWidth={3}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="hsl(var(--muted-foreground))" 
                    strokeDasharray="5 5"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Hourly Traffic */}
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Customer Traffic by Hour
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={hourlyTraffic}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar 
                    dataKey="customers" 
                    fill="hsl(142, 71%, 45%)" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader>
              <CardTitle>Product Performance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={productPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" width={80} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Legend />
                  <Bar dataKey="sales" fill="hsl(214, 84%, 56%)" name="Sales (₹)" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="profit" fill="hsl(142, 71%, 45%)" name="Profit (₹)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-gradient-card shadow-card border-0">
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={customerSegments}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {customerSegments.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card border-0">
              <CardHeader>
                <CardTitle>Customer Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-primary-light">
                  <h4 className="font-semibold text-primary">Peak Hours</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Highest customer traffic between 5-6 PM with 52 customers
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-success-light">
                  <h4 className="font-semibold text-success">Top Customer Type</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Regular customers account for 45% of total visits
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-warning-light">
                  <h4 className="font-semibold text-warning">Growth Opportunity</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Morning hours (9-11 AM) show potential for promotion campaigns
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                AI Analytics Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Ask about your business data... e.g., 'What are my best selling products?'"
                  className="pl-10"
                />
              </div>
              
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-background/80 border border-border">
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary">AI</Badge>
                    <div className="space-y-2">
                      <p className="font-medium">Business Health Report</p>
                      <p className="text-sm text-muted-foreground">
                        Your revenue is trending upward with a 35% growth in June. 
                        Bananas are your top performer with highest profit margins. 
                        Consider promoting premium products during peak hours (5-6 PM).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-background/80 border border-border">
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary">AI</Badge>
                    <div className="space-y-2">
                      <p className="font-medium">Inventory Recommendations</p>
                      <p className="text-sm text-muted-foreground">
                        Based on current trends, increase banana stock by 20% and 
                        consider reducing bread inventory during weekdays. 
                        Milk shows consistent demand across all segments.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-background/80 border border-border">
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary">AI</Badge>
                    <div className="space-y-2">
                      <p className="font-medium">Customer Behavior Insights</p>
                      <p className="text-sm text-muted-foreground">
                        Regular customers prefer shopping in the evening. 
                        Consider loyalty programs and extend evening hours. 
                        New customers tend to purchase basic items first.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gradient-primary shadow-button">
                <MessageSquare className="h-4 w-4 mr-2" />
                Ask AI Assistant
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}