import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Power, 
  AlertTriangle,
  Shield,
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  Target,
  Zap
} from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import type { LiveTradingStatus } from '../types';

const mockLiveStatus: LiveTradingStatus = {
  enabled: false,
  killSwitchActive: false,
  dailyLossLimit: 5000,
  currentDailyLoss: 1250,
  positionLimit: 10,
  currentPositions: 3,
  lastTradeAt: new Date(Date.now() - 1800000)
};

export function LiveTradingPanel() {
  const [status, setStatus] = useState<LiveTradingStatus>(mockLiveStatus);

  const toggleLiveTrading = () => {
    setStatus(prev => ({ ...prev, enabled: !prev.enabled }));
  };

  const activateKillSwitch = () => {
    setStatus(prev => ({ ...prev, killSwitchActive: true, enabled: false }));
  };

  const resetKillSwitch = () => {
    setStatus(prev => ({ ...prev, killSwitchActive: false }));
  };

  const dailyLossPercent = (status.currentDailyLoss / status.dailyLossLimit) * 100;
  const positionPercent = (status.currentPositions / status.positionLimit) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Live Trading</h3>
        <div className="flex items-center gap-4">
          {status.killSwitchActive ? (
            <Button variant="outline" onClick={resetKillSwitch}>
              Reset Kill Switch
            </Button>
          ) : (
            <Button
              variant="destructive"
              className="gap-2"
              onClick={activateKillSwitch}
            >
              <Power className="h-4 w-4" />
              Kill Switch
            </Button>
          )}
        </div>
      </div>

      {status.killSwitchActive && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Kill Switch Active</AlertTitle>
          <AlertDescription>
            All live trading has been halted. No new orders will be placed until the kill switch is reset.
          </AlertDescription>
        </Alert>
      )}

      {/* Main Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${status.enabled ? 'bg-accent/10' : 'bg-muted'}`}>
                <Activity className={`h-6 w-6 ${status.enabled ? 'text-accent' : 'text-muted-foreground'}`} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Live Trading Engine</h4>
                <p className="text-sm text-muted-foreground">
                  {status.enabled ? 'Actively monitoring and executing trades' : 'Trading engine is paused'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant={status.enabled ? 'default' : 'secondary'} className="text-sm">
                {status.enabled ? 'ACTIVE' : 'PAUSED'}
              </Badge>
              <Switch
                checked={status.enabled}
                onCheckedChange={toggleLiveTrading}
                disabled={status.killSwitchActive}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Daily Loss Limit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-foreground">
                  ${status.currentDailyLoss.toLocaleString()}
                </span>
                <span className="text-muted-foreground">
                  / ${status.dailyLossLimit.toLocaleString()}
                </span>
              </div>
              <Progress
                value={dailyLossPercent}
                className={dailyLossPercent > 80 ? 'bg-destructive/20' : dailyLossPercent > 50 ? 'bg-warning/20' : ''}
              />
              <p className="text-xs text-muted-foreground">
                {dailyLossPercent > 80 ? (
                  <span className="text-destructive">⚠️ Approaching daily loss limit</span>
                ) : (
                  `${(100 - dailyLossPercent).toFixed(0)}% of limit remaining`
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Target className="h-4 w-4" />
              Position Limit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-foreground">
                  {status.currentPositions}
                </span>
                <span className="text-muted-foreground">
                  / {status.positionLimit} positions
                </span>
              </div>
              <Progress value={positionPercent} />
              <p className="text-xs text-muted-foreground">
                {status.positionLimit - status.currentPositions} position slots available
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Safety Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Safety Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">Circuit Breakers</span>
              </div>
              <Badge variant="outline" className="bg-accent/10 text-accent">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">Stop Loss</span>
              </div>
              <Badge variant="outline" className="bg-accent/10 text-accent">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">Anomaly Detection</span>
              </div>
              <Badge variant="outline" className="bg-accent/10 text-accent">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Last Activity */}
      {status.lastTradeAt && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Last trade executed</span>
              <span className="text-foreground">
                {status.lastTradeAt.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
