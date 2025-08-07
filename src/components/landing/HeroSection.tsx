import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, ArrowRight, Star, Users, TrendingUp, Shield } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-32 lg:pt-32 lg:pb-40">
        <div className="text-center max-w-4xl mx-auto">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Badge variant="secondary" className="bg-primary text-primary-foreground">New</Badge>
            AI-powered analytics now available
            <ArrowRight className="h-3 w-3" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
            The All-in-One
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              SaaS Platform
            </span>
            for Modern Teams
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Streamline your workflow, boost productivity, and scale your business with our comprehensive suite of tools. 
            Trusted by over 50,000+ teams worldwide.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" className="text-lg px-8 py-4 h-auto">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto">
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-medium">4.9/5</span>
              <span>from 2,500+ reviews</span>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold text-foreground">50,000+</span>
                </div>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  <span className="text-2xl font-bold text-foreground">99.9%</span>
                </div>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Shield className="h-5 w-5 text-success" />
                  <span className="text-2xl font-bold text-foreground">SOC 2</span>
                </div>
                <p className="text-sm text-muted-foreground">Compliant</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image/Dashboard Preview */}
      <div className="relative max-w-6xl mx-auto px-6 -mt-16">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
          <div className="bg-card rounded-lg shadow-card-hover border border-border overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <div className="w-3 h-3 rounded-full bg-success"></div>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-primary/5 rounded-lg p-6">
                  <div className="h-4 bg-primary/20 rounded mb-4"></div>
                  <div className="h-2 bg-primary/10 rounded mb-2"></div>
                  <div className="h-2 bg-primary/10 rounded w-3/4"></div>
                </div>
                <div className="bg-accent/5 rounded-lg p-6">
                  <div className="h-4 bg-accent/20 rounded mb-4"></div>
                  <div className="h-2 bg-accent/10 rounded mb-2"></div>
                  <div className="h-2 bg-accent/10 rounded w-2/3"></div>
                </div>
                <div className="bg-success/5 rounded-lg p-6">
                  <div className="h-4 bg-success/20 rounded mb-4"></div>
                  <div className="h-2 bg-success/10 rounded mb-2"></div>
                  <div className="h-2 bg-success/10 rounded w-4/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}