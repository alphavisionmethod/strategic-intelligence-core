import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search,
  Filter,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  Play,
  User,
  Calendar
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { AuditLogEntry } from '../types';

const mockAuditLog: AuditLogEntry[] = [
  {
    id: 'log-1',
    timestamp: new Date(),
    action: 'playbook.executed',
    actor: 'System',
    entityType: 'playbook',
    entityId: 'pb-1',
    details: { playbook: 'High-Value Lead Nurture', trigger: 'lead.scored', lead_id: 'lead-123' },
    status: 'success',
    riskTier: 'low'
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 300000),
    action: 'approval.requested',
    actor: 'System',
    entityType: 'approval',
    entityId: 'apr-1',
    details: { playbook: 'Investor Alert', step: 'Send Portfolio Summary' },
    status: 'pending',
    riskTier: 'critical'
  },
  {
    id: 'log-3',
    timestamp: new Date(Date.now() - 600000),
    action: 'trigger.fired',
    actor: 'System',
    entityType: 'trigger',
    entityId: 'trg-2',
    details: { trigger: 'Churn Risk Alert', customer: 'Acme Corp' },
    status: 'success',
    riskTier: 'medium'
  },
  {
    id: 'log-4',
    timestamp: new Date(Date.now() - 1200000),
    action: 'playbook.step.failed',
    actor: 'System',
    entityType: 'playbook',
    entityId: 'pb-3',
    details: { playbook: 'Deal Revival', step: 'Send Email', error: 'Email delivery failed' },
    status: 'failure',
    riskTier: 'medium'
  },
  {
    id: 'log-5',
    timestamp: new Date(Date.now() - 1800000),
    action: 'approval.approved',
    actor: 'john@company.com',
    entityType: 'approval',
    entityId: 'apr-5',
    details: { playbook: 'Upsell Campaign', step: 'Offer Premium Tier' },
    status: 'success',
    riskTier: 'high'
  },
  {
    id: 'log-6',
    timestamp: new Date(Date.now() - 3600000),
    action: 'trigger.created',
    actor: 'admin@company.com',
    entityType: 'trigger',
    entityId: 'trg-5',
    details: { name: 'New Lead Alert', event_type: 'lead.created' },
    status: 'success',
    riskTier: 'low'
  },
  {
    id: 'log-7',
    timestamp: new Date(Date.now() - 7200000),
    action: 'playbook.executed',
    actor: 'System',
    entityType: 'playbook',
    entityId: 'pb-2',
    details: { playbook: 'Churn Prevention', customer: 'TechStart Inc' },
    status: 'success',
    riskTier: 'medium'
  }
];

const statusIcons = {
  success: <CheckCircle2 className="h-4 w-4 text-accent" />,
  failure: <XCircle className="h-4 w-4 text-destructive" />,
  pending: <Clock className="h-4 w-4 text-warning" />
};

const riskTierColors: Record<string, string> = {
  low: 'bg-accent/10 text-accent border-accent/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-destructive/10 text-destructive border-destructive/20',
  critical: 'bg-destructive text-destructive-foreground'
};

export function AuditLog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');

  const filteredLogs = mockAuditLog.filter(log => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      JSON.stringify(log.details).toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    const matchesRisk = riskFilter === 'all' || log.riskTier === riskFilter;
    
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAction = (action: string) => {
    return action.split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' → ');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Audit Log</h2>
          <p className="text-muted-foreground">Complete history of automation actions</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="failure">Failure</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        <Select value={riskFilter} onValueChange={setRiskFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Risk" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Risk</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {statusIcons[log.status]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">
                        {formatAction(log.action)}
                      </span>
                      <Badge variant="outline" className={riskTierColors[log.riskTier]}>
                        {log.riskTier}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {Object.entries(log.details).map(([k, v]) => `${k}: ${v}`).join(' • ')}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {log.actor}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatTime(log.timestamp)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Play className="h-3 w-3" />
                        {log.entityType}/{log.entityId}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
