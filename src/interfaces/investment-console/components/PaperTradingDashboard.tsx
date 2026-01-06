import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Plus,
  X,
  RefreshCw
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { PaperPortfolio, PaperTrade } from '../types';

const mockPortfolio: PaperPortfolio = {
  cash: 75234.56,
  totalValue: 125678.90,
  dayChange: 1234.56,
  dayChangePercent: 0.99,
  positions: [
    {
      id: 'pt-1',
      symbol: 'AAPL',
      side: 'buy',
      quantity: 50,
      entryPrice: 175.50,
      currentPrice: 178.42,
      unrealizedPnL: 146.00,
      unrealizedPnLPercent: 1.66,
      enteredAt: new Date(Date.now() - 86400000 * 3),
      status: 'open'
    },
    {
      id: 'pt-2',
      symbol: 'MSFT',
      side: 'buy',
      quantity: 25,
      entryPrice: 420.00,
      currentPrice: 415.28,
      unrealizedPnL: -118.00,
      unrealizedPnLPercent: -1.12,
      enteredAt: new Date(Date.now() - 86400000 * 5),
      status: 'open'
    },
    {
      id: 'pt-3',
      symbol: 'NVDA',
      side: 'buy',
      quantity: 10,
      entryPrice: 850.00,
      currentPrice: 875.32,
      unrealizedPnL: 253.20,
      unrealizedPnLPercent: 2.98,
      enteredAt: new Date(Date.now() - 86400000 * 2),
      status: 'open'
    }
  ]
};

export function PaperTradingDashboard() {
  const [portfolio, setPortfolio] = useState<PaperPortfolio>(mockPortfolio);
  const [showNewTrade, setShowNewTrade] = useState(false);
  const [newTrade, setNewTrade] = useState({ symbol: '', side: 'buy', quantity: '' });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const closePosition = (id: string) => {
    setPortfolio(prev => ({
      ...prev,
      positions: prev.positions.filter(p => p.id !== id)
    }));
  };

  const placeTrade = () => {
    // Mock trade placement
    const mockPrice = 150 + Math.random() * 50;
    const newPosition: PaperTrade = {
      id: `pt-${Date.now()}`,
      symbol: newTrade.symbol.toUpperCase(),
      side: newTrade.side as 'buy' | 'sell',
      quantity: parseInt(newTrade.quantity),
      entryPrice: mockPrice,
      currentPrice: mockPrice,
      unrealizedPnL: 0,
      unrealizedPnLPercent: 0,
      enteredAt: new Date(),
      status: 'open'
    };

    setPortfolio(prev => ({
      ...prev,
      positions: [...prev.positions, newPosition]
    }));
    setShowNewTrade(false);
    setNewTrade({ symbol: '', side: 'buy', quantity: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Paper Trading</h3>
        <Button className="gap-2" onClick={() => setShowNewTrade(true)}>
          <Plus className="h-4 w-4" />
          New Trade
        </Button>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Value</div>
            <div className="text-2xl font-bold text-foreground">{formatCurrency(portfolio.totalValue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Cash</div>
            <div className="text-2xl font-bold text-foreground">{formatCurrency(portfolio.cash)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Positions Value</div>
            <div className="text-2xl font-bold text-foreground">{formatCurrency(portfolio.totalValue - portfolio.cash)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Day Change</div>
            <div className={`text-2xl font-bold flex items-center gap-2 ${portfolio.dayChange >= 0 ? 'text-accent' : 'text-destructive'}`}>
              {portfolio.dayChange >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
              {portfolio.dayChange >= 0 ? '+' : ''}{formatCurrency(portfolio.dayChange)}
              <span className="text-sm">({portfolio.dayChangePercent.toFixed(2)}%)</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Open Positions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">Open Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {portfolio.positions.map((position) => (
              <div
                key={position.id}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">{position.symbol}</span>
                      <Badge variant={position.side === 'buy' ? 'default' : 'destructive'}>
                        {position.side.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {position.quantity} shares @ {formatCurrency(position.entryPrice)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-medium text-foreground">{formatCurrency(position.currentPrice)}</div>
                    <div className="text-sm text-muted-foreground">Current</div>
                  </div>

                  <div className="text-right min-w-[100px]">
                    <div className={`font-bold ${position.unrealizedPnL >= 0 ? 'text-accent' : 'text-destructive'}`}>
                      {position.unrealizedPnL >= 0 ? '+' : ''}{formatCurrency(position.unrealizedPnL)}
                    </div>
                    <div className={`text-sm ${position.unrealizedPnL >= 0 ? 'text-accent' : 'text-destructive'}`}>
                      {position.unrealizedPnLPercent >= 0 ? '+' : ''}{position.unrealizedPnLPercent.toFixed(2)}%
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => closePosition(position.id)}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Close
                  </Button>
                </div>
              </div>
            ))}

            {portfolio.positions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No open positions. Place a trade to get started.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* New Trade Dialog */}
      <Dialog open={showNewTrade} onOpenChange={setShowNewTrade}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Paper Trade</DialogTitle>
            <DialogDescription>
              Place a simulated trade with virtual money
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="symbol">Symbol</Label>
              <Input
                id="symbol"
                placeholder="AAPL"
                value={newTrade.symbol}
                onChange={(e) => setNewTrade(prev => ({ ...prev, symbol: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="side">Side</Label>
              <Select
                value={newTrade.side}
                onValueChange={(v) => setNewTrade(prev => ({ ...prev, side: v }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="100"
                value={newTrade.quantity}
                onChange={(e) => setNewTrade(prev => ({ ...prev, quantity: e.target.value }))}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewTrade(false)}>
              Cancel
            </Button>
            <Button onClick={placeTrade} disabled={!newTrade.symbol || !newTrade.quantity}>
              Place Trade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
