import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, Star, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
    description: "Perfect for individuals and small teams getting started",
    badge: null,
    features: [
      "Up to 3 team members",
      "5 GB storage",
      "Basic analytics",
      "Email support",
      "Core integrations",
      "Mobile app access"
    ],
    cta: "Get Started",
    variant: "outline" as const
  },
  {
    name: "Professional",
    price: "$29",
    period: "per user/month",
    description: "Advanced features for growing teams and businesses",
    badge: "Most Popular",
    features: [
      "Unlimited team members",
      "100 GB storage",
      "Advanced analytics",
      "Priority support",
      "All integrations",
      "Custom workflows",
      "Team permissions",
      "Advanced reporting"
    ],
    cta: "Start Free Trial",
    variant: "default" as const
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact sales",
    description: "Tailored solutions for large organizations with custom needs",
    badge: null,
    features: [
      "Unlimited everything",
      "Unlimited storage",
      "Custom analytics",
      "Dedicated support",
      "Custom integrations",
      "Advanced security",
      "SSO & SAML",
      "Custom training",
      "SLA guarantee",
      "On-premise options"
    ],
    cta: "Contact Sales",
    variant: "outline" as const
  }
];

export default function PricingSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">Pricing</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Simple, transparent pricing
            <span className="block text-primary">that scales with you</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the perfect plan for your team. Upgrade or downgrade at any time. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden transition-all duration-300 ${
                plan.badge 
                  ? 'ring-2 ring-primary shadow-card-hover scale-105' 
                  : 'hover:shadow-card-hover'
              }`}
            >
              {plan.badge && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-primary text-primary-foreground text-center py-2 text-sm font-medium">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    {plan.badge}
                  </div>
                </div>
              )}
              
              <CardHeader className={`text-center ${plan.badge ? 'pt-12' : 'pt-8'}`}>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {plan.name}
                </h3>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground ml-1">
                      /{plan.period}
                    </span>
                  )}
                </div>
                
                <p className="text-muted-foreground text-sm">
                  {plan.description}
                </p>
              </CardHeader>
              
              <CardContent className="px-8 pb-8">
                <Button 
                  variant={plan.variant} 
                  className="w-full mb-8"
                  size="lg"
                >
                  {plan.cta}
                  {plan.variant === "default" && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-success flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-6">
            Frequently Asked Questions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div>
              <h4 className="font-medium text-foreground mb-2">
                Can I change plans anytime?
              </h4>
              <p className="text-sm text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately with prorated billing.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-2">
                Is there a free trial?
              </h4>
              <p className="text-sm text-muted-foreground">
                Yes, we offer a 14-day free trial for our Professional plan. No credit card required.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-2">
                What payment methods do you accept?
              </h4>
              <p className="text-sm text-muted-foreground">
                We accept all major credit cards, PayPal, and wire transfers for Enterprise customers.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-2">
                Do you offer refunds?
              </h4>
              <p className="text-sm text-muted-foreground">
                Yes, we offer a 30-day money-back guarantee for all paid plans, no questions asked.
              </p>
            </div>
          </div>
          
          <div className="mt-12">
            <p className="text-muted-foreground mb-4">
              Still have questions?
            </p>
            <Button variant="outline">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}