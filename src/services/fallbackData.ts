import { supabase } from "@/integrations/supabase/client";

export class FallbackDataService {
  static async getTodaysSales(): Promise<any[]> {
    try {
      // Try to get sales data from your Supabase table
      const { data, error } = await (supabase as any)
        .from('store 1')
        .select('*')
        .limit(1);
      
      if (error) {
        console.log('Supabase query error, using mock data:', error);
      }
      
      // Return mock data for now since we don't know your exact schema
      return [{ 
        total_sales: Math.floor(Math.random() * 10000) + 5000,
        currency: 'INR' 
      }];
    } catch (error) {
      console.error('Fallback data error:', error);
      return [{ total_sales: 6200, currency: 'INR' }];
    }
  }

  static async getProductCount(): Promise<any[]> {
    try {
      const { data, error } = await (supabase as any)
        .from('store 1')
        .select('product_id', { count: 'exact' });
      
      if (error) {
        console.log('Supabase query error, using mock data:', error);
      }
      
      return [{ 
        product_count: data?.length || 248,
        low_stock_count: Math.floor(Math.random() * 5)
      }];
    } catch (error) {
      console.error('Fallback data error:', error);
      return [{ product_count: 248, low_stock_count: 5 }];
    }
  }

  static async getWeeklyGrowth(): Promise<any[]> {
    try {
      // Mock calculation since we don't have historical data
      const growth = (Math.random() - 0.5) * 40; // -20% to +20%
      return [{ growth_percentage: Math.round(growth * 10) / 10 }];
    } catch (error) {
      return [{ growth_percentage: 0 }];
    }
  }

  static async getActiveAlerts(): Promise<any[]> {
    try {
      return [{ 
        alert_count: Math.floor(Math.random() * 5),
        critical_count: Math.floor(Math.random() * 3)
      }];
    } catch (error) {
      return [{ alert_count: 0, critical_count: 0 }];
    }
  }

  static async getWeeklySalesData(): Promise<any[]> {
    try {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      return days.map(day => ({
        name: day,
        sales: Math.floor(Math.random() * 3000) + 2000,
        target: 4000
      }));
    } catch (error) {
      return [];
    }
  }

  static async getTopProducts(): Promise<any[]> {
    try {
      const { data, error } = await (supabase as any)
        .from('store 1')
        .select('Title, Price')
        .limit(5);
      
      if (error) {
        console.log('Supabase query error, using mock data:', error);
      }
      
      return data?.map((item: any, index: number) => ({
        name: item?.Title || `Product ${index + 1}`,
        sales: Math.floor(Math.random() * 1000) + 500
      })) || [
        { name: "Bananas", sales: 1250 },
        { name: "Milk", sales: 980 },
        { name: "Bread", sales: 850 },
        { name: "Apples", sales: 720 },
      ];
    } catch (error) {
      return [
        { name: "Bananas", sales: 1250 },
        { name: "Milk", sales: 980 },
        { name: "Bread", sales: 850 },
        { name: "Apples", sales: 720 },
      ];
    }
  }

  static async getBIInsights(): Promise<any[]> {
    try {
      return [
        { category: 'Sales', title: 'Daily Revenue', value: '₹12,500', status: 'good' },
        { category: 'Inventory', title: 'Low Stock Items', value: '3 products', status: 'warning' },
        { category: 'Customer', title: 'New Customers', value: '24 today', status: 'good' },
        { category: 'Finance', title: 'Profit Margin', value: '15.2%', status: 'good' },
      ];
    } catch (error) {
      return [];
    }
  }
}