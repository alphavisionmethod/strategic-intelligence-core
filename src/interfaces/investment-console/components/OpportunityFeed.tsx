import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  TrendingUp, 
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Plus
} from 'lucide-react';
import type { OpportunityFeed as OpportunityFeedType } from '../types';

const mockOpportunities: OpportunityFeedType[] = [
  {
    id: 'opp-1',
    symbol: 'AMD',
    name: 'Advanced Micro Devices',
    opportunityScore: 88,
    riskScore: 45,
    thesis: 'AI chip demand surge driving revenue growth. Technical breakout above key resistance with strong volume confirmation. Mean reversion signals indicate oversold conditions in the short term.',
    signals: ['Momentum', 'Mean Reversion', 'Event'],
    detectedAt: new Date(Date.now() - 300000),
    status: 'new'
  },
  {
    id: 'opp-2',
    symbol: 'COST',
    name: 'Costco Wholesale',
    opportunityScore: 76,
    riskScore: 28,
    thesis: 'Defensive consumer play with consistent membership growth. Trading near 52-week low relative to intrinsic value. Quality factors strongly positive.',
    signals: ['Value', 'Quality'],
    detectedAt: new Date(Date.now() - 1800000),
    status: 'new'
  },
  {
    id: 'opp-3',
    symbol: 'META',
    name: 'Meta Platforms',
    opportunityScore: 82,
    riskScore: 38,
    thesis: 'AI monetization accelerating through advertising improvements. Strong cash generation supporting buybacks. Volatility regime shift indicating reduced near-term risk.',
    signals: ['Momentum', 'Volatility', 'Quality'],
    detectedAt: new Date(Date.now() - 3600000),
    status: 'reviewed'
  },
  {
    id: 'opp-4',
    symbol: 'UNH',
    name: 'UnitedHealth Group',
    opportunityScore: 71,
    riskScore: 32,
    thesis: 'Healthcare sector rotation opportunity. Regulatory headwinds priced in, fundamentals remain strong. Trend following signal triggered on weekly chart.',
    signals: ['Trend Following', 'Value'],
    detectedAt: new Date(Date.now() - 7200000),
    status: 'acted'
  }
];

const statusColors = {
  new: 'bg-primary text-primary-foreground',
  reviewed: 'bg-warning/10 text-warning border-warning/20',
  acted: 'bg-accent/10 text-accent border-accent/20',
  dismissed: 'bg-muted text-muted-foreground'
};

export function OpportunityFeedPanel() {
  const [opportunities, setOpportunities] = useState<OpportunityFeedType[]>(mockOpportunities);

  const updateStatus = (id: string, status: OpportunityFeedType['status']) => {
    setOpportunities(prev => prev.map(opp =>
      opp.id === id ? { ...opp, status } : opp
    ));
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-accent';
    if (score >= 60) return 'text-primary';
    if (score >= 40) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">AI Opportunities</h3>
          <Badge variant="secondary" className="ml-2">
            {opportunities.filter(o => o.status === 'new').length} new
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {opportunities.map((opp) => (
          <Card key={opp.id} className={opp.status === 'dismissed' ? 'opacity-50' : ''}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-foreground">{opp.symbol}</span>
                    <span className="text-sm text-muted-foreground">{opp.name}</span>
                    <Badge className={statusColors[opp.status]}>
                      {opp.status.charAt(0).toUpperCase() + opp.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {opp.signals.map(signal => (
                      <Badge key={signal} variant="outline" className="text-xs">
                        {signal}
                      </Badge>
                    ))}
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTimeAgo(opp.detectedAt)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(opp.opportunityScore)}`}>
                      {opp.opportunityScore}
                    </div>
                    <div className="text-xs text-muted-foreground">Opportunity</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${opp.riskScore > 50 ? 'text-destructive' : 'text-accent'}`}>
                      {opp.riskScore}
                    </div>
                    <div className="text-xs text-muted-foreground">Risk</div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg mb-3">
                <p className="text-sm text-foreground">{opp.thesis}</p>
              </div>

              {opp.status === 'new' && (
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="gap-1"
                    onClick={() => updateStatus(opp.id, 'acted')}
                  >
                    <Plus className="h-4 w-4" />
                    Add to Watchlist
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatus(opp.id, 'reviewed')}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Mark Reviewed
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => updateStatus(opp.id, 'dismissed')}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Dismiss
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
