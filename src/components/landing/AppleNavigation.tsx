import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Search, ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationItem {
  name: string;
  href: string;
  description: string;
  badge?: string;
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

interface NavigationCategory {
  title: string;
  sections: NavigationSection[];
}

const navigation: Record<string, NavigationCategory> = {
  products: {
    title: "Products",
    sections: [
      {
        title: "Productivity",
        items: [
          { name: "Task Management", href: "#", description: "Organize your workflow" },
          { name: "Team Collaboration", href: "#", description: "Work together seamlessly" },
          { name: "Project Planning", href: "#", description: "Plan and execute projects" },
          { name: "Time Tracking", href: "#", description: "Monitor productivity" }
        ]
      },
      {
        title: "Analytics",
        items: [
          { name: "Performance Dashboard", href: "#", description: "Real-time insights" },
          { name: "Custom Reports", href: "#", description: "Tailored analytics" },
          { name: "Data Visualization", href: "#", description: "Beautiful charts" },
          { name: "AI Insights", href: "#", description: "Smart recommendations" }
        ]
      }
    ]
  },
  solutions: {
    title: "Solutions",
    sections: [
      {
        title: "By Industry",
        items: [
          { name: "Healthcare", href: "#", description: "HIPAA compliant solutions" },
          { name: "Finance", href: "#", description: "Secure financial tools" },
          { name: "Education", href: "#", description: "Learning management" },
          { name: "Retail", href: "#", description: "E-commerce solutions" }
        ]
      },
      {
        title: "By Team Size",
        items: [
          { name: "Startups", href: "#", description: "Scale with confidence" },
          { name: "SMBs", href: "#", description: "Enterprise features" },
          { name: "Enterprise", href: "#", description: "Global scale solutions" }
        ]
      }
    ]
  },
  pricing: {
    title: "Pricing",
    sections: [
      {
        title: "Plans",
        items: [
          { name: "Starter", href: "#", description: "Perfect for individuals", badge: "Free" },
          { name: "Professional", href: "#", description: "For growing teams", badge: "$29/mo" },
          { name: "Enterprise", href: "#", description: "Advanced features", badge: "Custom" }
        ]
      }
    ]
  }
};

interface AppleNavigationProps {
  className?: string;
}

export default function AppleNavigation({ className }: AppleNavigationProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMouseEnter = (key: string) => {
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const DropdownContent = ({ content }: { content: typeof navigation.products }) => (
    <div className="absolute top-full left-0 w-full bg-card/95 backdrop-blur-md border-b border-border shadow-card z-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {content.sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="group flex items-start justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {item.name}
                          </span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.description}
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <header className={cn("sticky top-0 z-50 w-full bg-card/80 backdrop-blur-md border-b border-border", className)}>
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <nav 
          className="relative"
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <a href="#" className="text-xl font-bold text-foreground">
                  SaaSFlow
                </a>
              </div>

              {/* Navigation Items */}
              <div className="flex items-center space-x-8">
                {Object.entries(navigation).map(([key, item]) => (
                  <div
                    key={key}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(key)}
                  >
                    <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                      {item.title}
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                
                <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Resources
                </a>
                <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  About
                </a>
              </div>

              {/* Right Actions */}
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" className="text-sm">
                  Sign In
                </Button>
                <Button className="text-sm">
                  Get Started
                </Button>
              </div>
            </div>
          </div>

          {/* Dropdown Content */}
          {activeDropdown && (
            <DropdownContent content={navigation[activeDropdown as keyof typeof navigation]} />
          )}
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between h-16 px-4">
          <a href="#" className="text-lg font-bold text-foreground">
            SaaSFlow
          </a>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="bg-card border-t border-border">
            <div className="px-4 py-6 space-y-6">
              {Object.entries(navigation).map(([key, item]) => (
                <div key={key}>
                  <h3 className="font-semibold text-foreground mb-3">{item.title}</h3>
                  <div className="space-y-4">
                    {item.sections.map((section) => (
                      <div key={section.title}>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          {section.title}
                        </h4>
                        <ul className="space-y-2">
                          {section.items.map((subItem) => (
                            <li key={subItem.name}>
                              <a
                                href={subItem.href}
                                className="block text-sm text-foreground hover:text-primary transition-colors"
                              >
                                {subItem.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="pt-6 border-t border-border space-y-3">
                <Button variant="ghost" className="w-full justify-start">
                  Sign In
                </Button>
                <Button className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}