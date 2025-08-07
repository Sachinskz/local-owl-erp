import AppleNavigation from "@/components/landing/AppleNavigation";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PricingSection from "@/components/landing/PricingSection";
import FooterSection from "@/components/landing/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <AppleNavigation />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <FooterSection />
    </div>
  );
};

export default Index;
