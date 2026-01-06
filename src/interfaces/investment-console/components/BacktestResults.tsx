import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  Target,
  AlertTriangle,
  CheckCircle2,
  Clock,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import type { BacktestResult } from '../types';

const mockBacktests: BacktestResult[] = [
  {
    id: 'bt-1',
    strategyName: 'Momentum Alpha',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2024-01-01'),
    totalReturn: 34.5,
    annualizedReturn: 34.5,
    sharpeRatio: 1.82,
    maxDrawdown: -12.3,
    winRate: 62,
    totalTrades: 156,
    status: 'completed',
    equityCurve: [
      { date: 'Jan', value: 100000 },
      { date: 'Feb', value: 103500 },
      { date: 'Mar', value: 108200 },
      { date: 'Apr', value: 105800 },
      { date: 'May', value: 112400 },
      { date: 'Jun', value: 118900 },
      { date: 'Jul', value: 115200 },
      { date: 'Aug', value: 122800 },
      { date: 'Sep', value: 126500 },
      { date: 'Oct', value: 129300 },
      { date: 'Nov', value: 131800 },
      { date: 'Dec', value: 134500 }
    ]
  },
  {
    id: 'bt-2',
    strategyName: 'Mean Reversion Plus',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2024-01-01'),
    totalReturn: 21.2,
    annualizedReturn: 21.2,
    sharpeRatio: 1.45,
    maxDrawdown: -8.7,
    winRate: 58,
    totalTrades: 234,
    status: 'completed',
    equityCurve: [
      { date: 'Jan', value: 100000 },
      { date: 'Feb', value: 101200 },
      { date: 'Mar', value: 104500 },
      { date: 'Apr', value: 106800 },
      { date: 'May', value: 108200 },
      { date: 'Jun', value: 111500 },
      { date: 'Jul', value: 113800 },
      { date: 'Aug', value: 115200 },
      { date: 'Sep', value: 117500 },
      { date: 'Oct', value: 118900 },
      { date: 'Nov', value: 120200 },
      { date: 'Dec', value: 121200 }
    ]
  },
  {
    id: 'bt-3',
    strategyName: 'Trend Following',
    startDate: new Date('2023-06-01'),
    endDate: new Date('2024-01-01'),
    totalReturn: 0,
    annualizedReturn: 0,
    sharpeRatio: 0,
    maxDrawdown: 0,
    winRate: 0,
    totalTrades: 0,
    status: 'running',
    equityCurve: []
  }
];

export function BacktestResults() {
  const [backtests] = useState<BacktestResult[]>(mockBacktests);
  const [selectedBacktest, setSelectedBacktest] = useState<BacktestResult>(mockBacktests[0]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Backtest Results</h3>
        <Button className="gap-2">
          <Play className="h-4 w-4" />
          New Backtest
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Strategy List */}
        <div className="space-y-2">
          {backtests.map((bt) => (
            <Card
              key={bt.id}
              className={`cursor-pointer transition-colors ${selectedBacktest.id === bt.id ? 'border-primary' : 'hover:bg-muted/50'}`}
              onClick={() => setSelectedBacktest(bt)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">{bt.strategyName}</h4>
                    <p className="text-xs text-muted-foreground">
                      {bt.startDate.toLocaleDateString()} - {bt.endDate.toLocaleDateString()}
                    </p>
                  </div>
                  {bt.status === 'running' ? (
                    <Badge variant="secondary" className="gap-1">
                      <RefreshCw className="h-3 w-3 animate-spin" />
                      Running
                    </Badge>
                  ) : bt.status === 'completed' ? (
                    <span className={`font-bold ${bt.totalReturn >= 0 ? 'text-accent' : 'text-destructive'}`}>
                      {bt.totalReturn >= 0 ? '+' : ''}{bt.totalReturn.toFixed(1)}%
                    </span>
                  ) : (
                    <Badge variant="destructive">Failed</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Results Detail */}
        <div className="lg:col-span-2 space-y-4">
          {selectedBacktest.status === 'completed' ? (
            <>
              {/* Equity Curve */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Equity Curve</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={selectedBacktest.equityCurve}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                        <Tooltip
                          contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                          formatter={(value: number) => [formatCurrency(value), 'Portfolio Value']}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorValue)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-xs">Total Return</span>
                    </div>
                    <p className={`text-2xl font-bold ${selectedBacktest.totalReturn >= 0 ? 'text-accent' : 'text-destructive'}`}>
                      {selectedBacktest.totalReturn >= 0 ? '+' : ''}{selectedBacktest.totalReturn.toFixed(1)}%
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <BarChart3 className="h-4 w-4" />
                      <span className="text-xs">Sharpe Ratio</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">
                      {selectedBacktest.sharpeRatio.toFixed(2)}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-xs">Max Drawdown</span>
                    </div>
                    <p className="text-2xl font-bold text-destructive">
                      {selectedBacktest.maxDrawdown.toFixed(1)}%
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Target className="h-4 w-4" />
                      <span className="text-xs">Win Rate</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">
                      {selectedBacktest.winRate}%
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-xs">Total Trades</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">
                      {selectedBacktest.totalTrades}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-xs">Annualized</span>
                    </div>
                    <p className={`text-2xl font-bold ${selectedBacktest.annualizedReturn >= 0 ? 'text-accent' : 'text-destructive'}`}>
                      {selectedBacktest.annualizedReturn >= 0 ? '+' : ''}{selectedBacktest.annualizedReturn.toFixed(1)}%
                    </p>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : selectedBacktest.status === 'running' ? (
            <Card>
              <CardContent className="p-12 text-center">
                <RefreshCw className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
                <h3 className="font-semibold text-foreground">Backtest Running</h3>
                <p className="text-muted-foreground mt-1">Processing historical data...</p>
                <Progress value={45} className="mt-4 max-w-xs mx-auto" />
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}
