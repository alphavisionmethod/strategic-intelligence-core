import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Zap, 
  Clock, 
  Play,
  Search,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Trigger } from '../types';

const mockTriggers: Trigger[] = [
  {
    id: '1',
    name: 'High-Value Lead Detected',
    eventType: 'lead.scored',
    conditions: [{ field: 'score', operator: 'greater_than', value: 80 }],
    playbookId: 'pb-1',
    enabled: true,
    createdAt: new Date('2024-01-15'),
    lastTriggered: new Date(),
    triggerCount: 156
  },
  {
    id: '2',
    name: 'Churn Risk Alert',
    eventType: 'customer.churn_risk',
    conditions: [{ field: 'risk_score', operator: 'greater_than', value: 0.7 }],
    playbookId: 'pb-2',
    enabled: true,
    createdAt: new Date('2024-01-20'),
    lastTriggered: new Date(Date.now() - 3600000),
    triggerCount: 89
  },
  {
    id: '3',
    name: 'Deal Stalled',
    eventType: 'deal.stalled',
    conditions: [{ field: 'days_inactive', operator: 'greater_than', value: 14 }],
    playbookId: 'pb-3',
    enabled: false,
    createdAt: new Date('2024-02-01'),
    triggerCount: 45
  },
  {
    id: '4',
    name: 'Upsell Opportunity',
    eventType: 'customer.usage_spike',
    conditions: [{ field: 'usage_increase', operator: 'greater_than', value: 50 }],
    playbookId: 'pb-4',
    enabled: true,
    createdAt: new Date('2024-02-10'),
    lastTriggered: new Date(Date.now() - 7200000),
    triggerCount: 234
  }
];

export function TriggersList() {
  const [triggers, setTriggers] = useState<Trigger[]>(mockTriggers);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTriggers = triggers.filter(trigger =>
    trigger.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trigger.eventType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTrigger = (id: string) => {
    setTriggers(prev => prev.map(t => 
      t.id === id ? { ...t, enabled: !t.enabled } : t
    ));
  };

  const formatTimeAgo = (date?: Date) => {
    if (!date) return 'Never';
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Triggers</h2>
          <p className="text-muted-foreground">Manage event-based automation triggers</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Trigger
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search triggers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filteredTriggers.map((trigger) => (
          <Card key={trigger.id} className={!trigger.enabled ? 'opacity-60' : ''}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{trigger.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {trigger.eventType}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {trigger.conditions.length} condition{trigger.conditions.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Play className="h-3 w-3" />
                      <span>{trigger.triggerCount} runs</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimeAgo(trigger.lastTriggered)}</span>
                    </div>
                  </div>

                  <Switch
                    checked={trigger.enabled}
                    onCheckedChange={() => toggleTrigger(trigger.id)}
                  />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
