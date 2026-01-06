import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Lightbulb,
  Network,
  Briefcase,
  Zap
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "CEO Dashboard",
    description: "Today's priority, revenue risks, growth opportunities",
    href: "/ceo-dashboard",
    color: "text-blue-500",
  },
  {
    icon: DollarSign,
    title: "Revenue Command Center",
    description: "Real-time revenue intelligence and optimization",
    href: "/revenue",
    color: "text-green-500",
  },
  {
    icon: Target,
    title: "Growth Blueprint",
    description: "90-day growth roadmap with bottleneck detection",
    href: "/ceo-dashboard",
    color: "text-purple-500",
  },
  {
    icon: TrendingUp,
    title: "Demand Engine",
    description: "Multi-channel lead generation and optimization",
    href: "/ceo-dashboard",
    color: "text-orange-500",
  },
  {
    icon: Briefcase,
    title: "Capital Intelligence",
    description: "Fundability scoring and investor matching",
    href: "/ceo-dashboard",
    color: "text-indigo-500",
  },
  {
    icon: Network,
    title: "Market Intelligence",
    description: "Competitor tracking and opportunity alerts",
    href: "/ceo-dashboard",
    color: "text-pink-500",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="max-w-7xl mx-auto px-6 py-20 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              AI-Powered Business Growth Platform
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
              Your Complete <span className="text-primary">Business Operating System</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              From diagnostics to execution. Growth blueprint, demand generation, capital intelligence, 
              and market surveillance — all in one platform.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/ceo-dashboard">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Open Dashboard
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/auth">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Everything You Need to Scale</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive suite of tools designed to diagnose, strategize, and execute your growth plan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Link key={feature.title} to={feature.href}>
              <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer h-full">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-foreground">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">7</p>
              <p className="text-sm text-muted-foreground">Intelligence Engines</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">50+</p>
              <p className="text-sm text-muted-foreground">Business Metrics</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">90</p>
              <p className="text-sm text-muted-foreground">Day Roadmaps</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">24/7</p>
              <p className="text-sm text-muted-foreground">Market Monitoring</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-12 text-center">
            <Lightbulb className="w-12 h-12 text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get instant access to your personalized growth blueprint, AI-powered recommendations, 
              and real-time business intelligence.
            </p>
            <Button size="lg" asChild>
              <Link to="/auth">Start Free Trial</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
