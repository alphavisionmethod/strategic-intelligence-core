import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  BookOpen, 
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Play,
  Copy,
  Layers
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { PlaybookSummary } from '../types';

const mockPlaybooks: PlaybookSummary[] = [
  {
    id: 'pb-1',
    name: 'High-Value Lead Nurture',
    description: 'Automated sequence for leads scoring above 80 points',
    automationLevel: 3,
    riskTier: 'low',
    stepsCount: 5,
    enabled: true,
    lastRun: new Date(),
    successRate: 94
  },
  {
    id: 'pb-2',
    name: 'Churn Prevention',
    description: 'Proactive outreach to at-risk customers',
    automationLevel: 2,
    riskTier: 'medium',
    stepsCount: 7,
    enabled: true,
    lastRun: new Date(Date.now() - 1800000),
    successRate: 78
  },
  {
    id: 'pb-3',
    name: 'Deal Revival',
    description: 'Re-engagement for stalled opportunities',
    automationLevel: 1,
    riskTier: 'medium',
    stepsCount: 4,
    enabled: true,
    lastRun: new Date(Date.now() - 3600000),
    successRate: 65
  },
  {
    id: 'pb-4',
    name: 'Upsell Campaign',
    description: 'Identify and execute upsell opportunities',
    automationLevel: 2,
    riskTier: 'high',
    stepsCount: 6,
    enabled: false,
    successRate: 82
  },
  {
    id: 'pb-5',
    name: 'Investor Alert',
    description: 'Real-time notifications for portfolio triggers',
    automationLevel: 3,
    riskTier: 'critical',
    stepsCount: 3,
    enabled: true,
    lastRun: new Date(Date.now() - 7200000),
    successRate: 99
  }
];

const automationLevelLabels = ['Manual', 'Suggested', 'Auto + Review', 'Full Auto'];
const riskTierColors: Record<string, string> = {
  low: 'bg-accent/10 text-accent border-accent/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-destructive/10 text-destructive border-destructive/20',
  critical: 'bg-destructive text-destructive-foreground'
};

export function PlaybooksList() {
  const [playbooks] = useState<PlaybookSummary[]>(mockPlaybooks);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlaybooks = playbooks.filter(pb =>
    pb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pb.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Playbooks</h2>
          <p className="text-muted-foreground">Build and manage automation workflows</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Playbook
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search playbooks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredPlaybooks.map((playbook) => (
          <Card key={playbook.id} className={!playbook.enabled ? 'opacity-60' : ''}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{playbook.name}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{playbook.description}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Play className="h-4 w-4 mr-2" />
                      Run Now
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className={riskTierColors[playbook.riskTier]}>
                  {playbook.riskTier.charAt(0).toUpperCase() + playbook.riskTier.slice(1)} Risk
                </Badge>
                <Badge variant="secondary">
                  {automationLevelLabels[playbook.automationLevel]}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                  <Layers className="h-3 w-3" />
                  {playbook.stepsCount} steps
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Success Rate</span>
                  <span className="font-medium text-foreground">{playbook.successRate}%</span>
                </div>
                <Progress value={playbook.successRate} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
