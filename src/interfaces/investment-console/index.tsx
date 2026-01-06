import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Star, 
  Sparkles, 
  BarChart3, 
  PlayCircle,
  Zap,
  TrendingUp,
  DollarSign,
  Target
} from 'lucide-react';
import { WatchlistPanel } from './components/WatchlistPanel';
import { OpportunityFeedPanel } from './components/OpportunityFeed';
import { BacktestResults } from './components/BacktestResults';
import { PaperTradingDashboard } from './components/PaperTradingDashboard';
import { LiveTradingPanel } from './components/LiveTradingPanel';

const stats = [
  { label: 'Watchlist Items', value: '24', icon: Star, trend: '+4 this week' },
  { label: 'New Opportunities', value: '7', icon: Sparkles, trend: '3 high score' },
  { label: 'Paper P&L', value: '+$2,847', icon: DollarSign, trend: '+2.3% today', positive: true },
  { label: 'Win Rate', value: '68%', icon: Target, trend: 'Last 30 days' }
];

export default function InvestmentConsole() {
  const [activeTab, setActiveTab] = useState('watchlist');

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Investment Console</h1>
          </div>
          <p className="text-muted-foreground">
            Track opportunities, backtest strategies, and manage your trading
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className={`text-3xl font-bold mt-1 ${stat.positive ? 'text-accent' : 'text-foreground'}`}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="watchlist" className="gap-2">
              <Star className="h-4 w-4" />
              Watchlists
            </TabsTrigger>
            <TabsTrigger value="opportunities" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Opportunities
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded">7</span>
            </TabsTrigger>
            <TabsTrigger value="backtest" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Backtest
            </TabsTrigger>
            <TabsTrigger value="paper" className="gap-2">
              <PlayCircle className="h-4 w-4" />
              Paper Trading
            </TabsTrigger>
            <TabsTrigger value="live" className="gap-2">
              <Zap className="h-4 w-4" />
              Live Trading
            </TabsTrigger>
          </TabsList>

          <TabsContent value="watchlist">
            <WatchlistPanel />
          </TabsContent>

          <TabsContent value="opportunities">
            <OpportunityFeedPanel />
          </TabsContent>

          <TabsContent value="backtest">
            <BacktestResults />
          </TabsContent>

          <TabsContent value="paper">
            <PaperTradingDashboard />
          </TabsContent>

          <TabsContent value="live">
            <LiveTradingPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
