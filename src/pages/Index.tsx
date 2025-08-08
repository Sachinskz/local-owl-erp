import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/components/dashboard/Dashboard";
import InventoryManagement from "@/components/inventory/InventoryManagement";
import PointOfSale from "@/components/pos/PointOfSale";
import Analytics from "@/components/analytics/Analytics";
import AlertsCenter from "@/components/alerts/AlertsCenter";
import Forecasting from "@/components/forecasting/Forecasting";
import CustomQuery from "@/components/query/CustomQuery";
import BIInsights from "@/components/insights/BIInsights";
import ApiSetup from "@/components/setup/ApiSetup";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "inventory":
        return <InventoryManagement />;
      case "pos":
        return <PointOfSale />;
      case "analytics":
        return <Analytics />;
      case "alerts":
        return <AlertsCenter />;
      case "forecasting":
        return <Forecasting />;
      case "custom-query":
        return <CustomQuery />;
      case "bi-insights":
        return <BIInsights />;
      case "api-setup":
        return <ApiSetup />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </AppLayout>
  );
};

export default Index;
