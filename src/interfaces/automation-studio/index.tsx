import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Zap, 
  BookOpen, 
  Shield, 
  FileText,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { TriggersList } from './components/TriggersList';
import { PlaybooksList } from './components/PlaybooksList';
import { ApprovalsQueue } from './components/ApprovalsQueue';
import { AuditLog } from './components/AuditLog';

const stats = [
  { label: 'Active Triggers', value: '12', icon: Zap, trend: '+3 this week' },
  { label: 'Playbooks Running', value: '8', icon: BookOpen, trend: '94% success' },
  { label: 'Pending Approvals', value: '3', icon: Clock, trend: '2 critical' },
  { label: 'Actions Today', value: '156', icon: CheckCircle2, trend: '+24% vs avg' }
];

export default function AutomationStudio() {
  const [activeTab, setActiveTab] = useState('triggers');

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Automation Studio</h1>
          </div>
          <p className="text-muted-foreground">
            Create triggers, build playbooks, and manage automated workflows
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
                    <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
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
            <TabsTrigger value="triggers" className="gap-2">
              <Zap className="h-4 w-4" />
              Triggers
            </TabsTrigger>
            <TabsTrigger value="playbooks" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Playbooks
            </TabsTrigger>
            <TabsTrigger value="approvals" className="gap-2">
              <Shield className="h-4 w-4" />
              Approvals
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-warning text-warning-foreground rounded">3</span>
            </TabsTrigger>
            <TabsTrigger value="audit" className="gap-2">
              <FileText className="h-4 w-4" />
              Audit Log
            </TabsTrigger>
          </TabsList>

          <TabsContent value="triggers">
            <TriggersList />
          </TabsContent>

          <TabsContent value="playbooks">
            <PlaybooksList />
          </TabsContent>

          <TabsContent value="approvals">
            <ApprovalsQueue />
          </TabsContent>

          <TabsContent value="audit">
            <AuditLog />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
