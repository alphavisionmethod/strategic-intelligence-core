import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Star, 
  TrendingUp, 
  TrendingDown,
  Search,
  MoreVertical,
  Trash2,
  Eye,
  AlertTriangle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { WatchlistItem, Watchlist } from '../types';

const mockWatchlists: Watchlist[] = [
  {
    id: 'wl-1',
    name: 'Tech Leaders',
    createdAt: new Date('2024-01-01'),
    items: [
      {
        id: 'w-1',
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 178.42,
        change: 2.34,
        changePercent: 1.33,
        opportunityScore: 72,
        riskScore: 35,
        thesis: 'Strong momentum with iPhone 16 cycle approaching',
        signals: ['Momentum', 'Mean Reversion'],
        addedAt: new Date()
      },
      {
        id: 'w-2',
        symbol: 'MSFT',
        name: 'Microsoft Corp.',
        price: 415.28,
        change: -3.12,
        changePercent: -0.75,
        opportunityScore: 85,
        riskScore: 28,
        thesis: 'AI integration driving cloud growth',
        signals: ['Trend Following', 'Quality'],
        addedAt: new Date()
      },
      {
        id: 'w-3',
        symbol: 'NVDA',
        name: 'NVIDIA Corp.',
        price: 875.32,
        change: 15.67,
        changePercent: 1.82,
        opportunityScore: 91,
        riskScore: 52,
        thesis: 'AI chip dominance, high valuation justified by growth',
        signals: ['Momentum', 'Event'],
        addedAt: new Date()
      }
    ]
  },
  {
    id: 'wl-2',
    name: 'Value Picks',
    createdAt: new Date('2024-01-15'),
    items: [
      {
        id: 'w-4',
        symbol: 'BRK.B',
        name: 'Berkshire Hathaway',
        price: 412.56,
        change: 1.23,
        changePercent: 0.30,
        opportunityScore: 68,
        riskScore: 22,
        signals: ['Value', 'Quality'],
        addedAt: new Date()
      }
    ]
  }
];

export function WatchlistPanel() {
  const [watchlists] = useState<Watchlist[]>(mockWatchlists);
  const [selectedWatchlist, setSelectedWatchlist] = useState<string>(mockWatchlists[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const currentWatchlist = watchlists.find(w => w.id === selectedWatchlist);
  const filteredItems = currentWatchlist?.items.filter(item =>
    item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

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
          {watchlists.map(wl => (
            <Button
              key={wl.id}
              variant={selectedWatchlist === wl.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedWatchlist(wl.id)}
            >
              {wl.name}
            </Button>
          ))}
        </div>
        <Button size="sm" variant="outline" className="gap-1">
          <Plus className="h-4 w-4" />
          New List
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search symbols..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-2">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:bg-muted/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">{item.symbol}</span>
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {item.signals.slice(0, 2).map(signal => (
                        <Badge key={signal} variant="outline" className="text-xs">
                          {signal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-semibold text-foreground">${item.price.toFixed(2)}</div>
                    <div className={`flex items-center gap-1 text-sm ${item.change >= 0 ? 'text-accent' : 'text-destructive'}`}>
                      {item.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {item.change >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                    </div>
                  </div>

                  <div className="text-center">
                    <div className={`text-lg font-bold ${getScoreColor(item.opportunityScore)}`}>
                      {item.opportunityScore}
                    </div>
                    <div className="text-xs text-muted-foreground">Opp</div>
                  </div>

                  <div className="text-center">
                    <div className={`text-lg font-bold ${item.riskScore > 50 ? 'text-destructive' : 'text-accent'}`}>
                      {item.riskScore}
                    </div>
                    <div className="text-xs text-muted-foreground">Risk</div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {item.thesis && (
                <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">{item.thesis}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
