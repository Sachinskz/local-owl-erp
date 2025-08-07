import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Zap, 
  Shield, 
  Globe, 
  Users, 
  BarChart3, 
  Workflow,
  Clock,
  Smartphone,
  Database
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built for speed with modern technologies. Experience instant loading and real-time updates.",
    badge: "Performance"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security with SOC 2 compliance, end-to-end encryption, and advanced threat protection.",
    badge: "Security"
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Deploy worldwide with our global infrastructure. 99.9% uptime guaranteed with automatic failover.",
    badge: "Infrastructure"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together seamlessly with real-time collaboration, shared workspaces, and team management.",
    badge: "Collaboration"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Make data-driven decisions with comprehensive analytics, custom reports, and AI-powered insights.",
    badge: "Analytics"
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Automate repetitive tasks and create custom workflows to boost productivity and reduce errors.",
    badge: "Automation"
  },
  {
    icon: Clock,
    title: "Time Tracking",
    description: "Track time effortlessly with automatic timers, project categorization, and detailed reporting.",
    badge: "Productivity"
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Access your workspace anywhere with our fully responsive design and native mobile apps.",
    badge: "Mobile"
  },
  {
    icon: Database,
    title: "Data Integration",
    description: "Connect with 500+ tools and services. Import data seamlessly with our powerful API and webhooks.",
    badge: "Integration"
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">Features</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything you need to
            <span className="block text-primary">succeed and scale</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our comprehensive platform provides all the tools and features your team needs to work efficiently, 
            collaborate effectively, and grow your business.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-card-hover transition-all duration-300 border-border">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Ready to experience the full power of our platform?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#" 
              className="inline-flex items-center text-primary font-medium hover:text-primary-hover transition-colors"
            >
              View all features
              <BarChart3 className="ml-2 h-4 w-4" />
            </a>
            <span className="text-muted-foreground hidden sm:inline">•</span>
            <a 
              href="#" 
              className="inline-flex items-center text-primary font-medium hover:text-primary-hover transition-colors"
            >
              Compare plans
              <Users className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}