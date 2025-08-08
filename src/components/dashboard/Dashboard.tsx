import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DynamicMetricsCard from "./DynamicMetricsCard";
import { 
  DollarSign, 
  Package, 
  TrendingUp, 
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Users,
  ShoppingCart
} from "lucide-react";
import {
  ResponsiveContainer,
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
  Cell
} from "recharts";

// Sample data for charts
const salesData = [
  { name: "Mon", sales: 4500, target: 4000 },
  { name: "Tue", sales: 3200, target: 4000 },
  { name: "Wed", sales: 5100, target: 4000 },
  { name: "Thu", sales: 4800, target: 4000 },
  { name: "Fri", sales: 6200, target: 4000 },
  { name: "Sat", sales: 7500, target: 4000 },
  { name: "Sun", sales: 5800, target: 4000 },
];

const topProducts = [
  { name: "Bananas", sales: 1250 },
  { name: "Milk", sales: 980 },
  { name: "Bread", sales: 850 },
  { name: "Apples", sales: 720 },
];

const categoryData = [
  { name: "Fruits", value: 35, color: "hsl(142, 71%, 45%)" },
  { name: "Dairy", value: 25, color: "hsl(214, 84%, 56%)" },
  { name: "Bakery", value: 20, color: "hsl(38, 92%, 50%)" },
  { name: "Others", value: 20, color: "hsl(220, 15%, 60%)" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Report</Button>
          <Button className="bg-gradient-primary shadow-button hover:shadow-none">
            Sync Data
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DynamicMetricsCard
          title="Today's Sales"
          prompt="What are today's total sales in INR?"
          icon={DollarSign}
          variant="success"
          formatValue={(data) => `₹${data.total_sales?.toLocaleString() || data[Object.keys(data)[0]]?.toLocaleString() || '0'}`}
          getChange={() => "+12% from yesterday"}
          getChangeType={() => "positive"}
        />
        <DynamicMetricsCard
          title="Total Products"
          prompt="How many unique products are currently in stock?"
          icon={Package}
          formatValue={(data) => data.product_count?.toString() || data[Object.keys(data)[0]]?.toString() || '0'}
          getChange={(data) => {
            const firstRow = data[0] || {};
            const lowStock = firstRow.low_stock_count || 0;
            return lowStock > 0 ? `${lowStock} low stock items` : "All items in stock";
          }}
          getChangeType={(data) => {
            const firstRow = data[0] || {};
            const lowStock = firstRow.low_stock_count || 0;
            return lowStock > 0 ? "negative" : "positive";
          }}
        />
        <DynamicMetricsCard
          title="Weekly Growth"
          prompt="What is the percentage increase or decrease in sales compared to last week?"
          icon={TrendingUp}
          formatValue={(data) => {
            const firstRow = data[0] || {};
            const growth = firstRow.growth_percentage || firstRow[Object.keys(firstRow)[0]];
            return `${growth > 0 ? '+' : ''}${growth}%`;
          }}
          getChange={() => "Compared to last week"}
          getChangeType={(data) => {
            const firstRow = data[0] || {};
            const growth = firstRow.growth_percentage || firstRow[Object.keys(firstRow)[0]] || 0;
            return growth > 0 ? "positive" : growth < 0 ? "negative" : "neutral";
          }}
        />
        <DynamicMetricsCard
          title="Active Alerts"
          prompt="How many active alerts or critical issues are there in the system?"
          icon={AlertTriangle}
          variant="warning"
          formatValue={(data) => data.alert_count?.toString() || data[Object.keys(data)[0]]?.toString() || '0'}
          getChange={(data) => {
            const firstRow = data[0] || {};
            const critical = firstRow.critical_count || 0;
            return critical > 0 ? `${critical} critical` : "No critical issues";
          }}
          getChangeType={(data) => {
            const firstRow = data[0] || {};
            const critical = firstRow.critical_count || 0;
            return critical > 0 ? "negative" : "positive";
          }}
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Sales Trend */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Weekly Sales Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeDasharray="5 5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Top Selling Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts} layout="horizontal">
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
                <Bar 
                  dataKey="sales" 
                  fill="hsl(var(--primary))" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Category Distribution */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Sales by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="md:col-span-2 bg-gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Sale completed", item: "Bananas (10kg)", time: "2 min ago", icon: ArrowDown, color: "text-success" },
                { action: "Stock added", item: "Milk (50 units)", time: "15 min ago", icon: ArrowUp, color: "text-primary" },
                { action: "Low stock alert", item: "Bread (5 left)", time: "1 hour ago", icon: AlertTriangle, color: "text-warning" },
                { action: "Sale completed", item: "Apples (5kg)", time: "2 hours ago", icon: ArrowDown, color: "text-success" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background transition-colors">
                  <activity.icon className={`h-4 w-4 ${activity.color}`} />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.item}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}