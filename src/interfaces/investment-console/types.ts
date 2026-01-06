// Investment Console Types

export interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  opportunityScore: number;
  riskScore: number;
  thesis?: string;
  signals: string[];
  addedAt: Date;
}

export interface Watchlist {
  id: string;
  name: string;
  items: WatchlistItem[];
  createdAt: Date;
}

export interface OpportunityFeed {
  id: string;
  symbol: string;
  name: string;
  opportunityScore: number;
  riskScore: number;
  thesis: string;
  signals: string[];
  detectedAt: Date;
  status: 'new' | 'reviewed' | 'acted' | 'dismissed';
}

export interface BacktestResult {
  id: string;
  strategyName: string;
  startDate: Date;
  endDate: Date;
  totalReturn: number;
  annualizedReturn: number;
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
  totalTrades: number;
  status: 'running' | 'completed' | 'failed';
  equityCurve: { date: string; value: number }[];
}

export interface PaperTrade {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
  enteredAt: Date;
  status: 'open' | 'closed';
}

export interface PaperPortfolio {
  cash: number;
  totalValue: number;
  dayChange: number;
  dayChangePercent: number;
  positions: PaperTrade[];
}

export interface LiveTradingStatus {
  enabled: boolean;
  killSwitchActive: boolean;
  dailyLossLimit: number;
  currentDailyLoss: number;
  positionLimit: number;
  currentPositions: number;
  lastTradeAt?: Date;
}
