import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle,
  User,
  Calendar,
  FileText
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import type { ApprovalRequest } from '../types';

const mockApprovals: ApprovalRequest[] = [
  {
    id: 'apr-1',
    playbookName: 'Investor Alert',
    stepName: 'Send Portfolio Summary',
    riskTier: 'critical',
    requestedAt: new Date(Date.now() - 600000),
    expiresAt: new Date(Date.now() + 3000000),
    status: 'pending',
    requestedBy: 'System',
    context: { portfolio_value: 2500000, change_percent: -5.2 }
  },
  {
    id: 'apr-2',
    playbookName: 'Upsell Campaign',
    stepName: 'Offer Premium Tier',
    riskTier: 'high',
    requestedAt: new Date(Date.now() - 1800000),
    expiresAt: new Date(Date.now() + 7200000),
    status: 'pending',
    requestedBy: 'System',
    context: { customer: 'Acme Corp', current_tier: 'Pro', suggested_tier: 'Enterprise' }
  },
  {
    id: 'apr-3',
    playbookName: 'Churn Prevention',
    stepName: 'Schedule Executive Call',
    riskTier: 'medium',
    requestedAt: new Date(Date.now() - 3600000),
    expiresAt: new Date(Date.now() + 14400000),
    status: 'pending',
    requestedBy: 'System',
    context: { customer: 'TechStart Inc', risk_score: 0.85 }
  },
  {
    id: 'apr-4',
    playbookName: 'Deal Revival',
    stepName: 'Send Follow-up Email',
    riskTier: 'low',
    requestedAt: new Date(Date.now() - 86400000),
    expiresAt: new Date(Date.now() - 3600000),
    status: 'expired',
    requestedBy: 'System',
    context: { deal: 'Project Apollo', days_stalled: 21 }
  }
];

const riskTierColors: Record<string, string> = {
  low: 'bg-accent/10 text-accent border-accent/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-destructive/10 text-destructive border-destructive/20',
  critical: 'bg-destructive text-destructive-foreground'
};

export function ApprovalsQueue() {
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(mockApprovals);
  const [selectedApproval, setSelectedApproval] = useState<ApprovalRequest | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const pendingApprovals = approvals.filter(a => a.status === 'pending');
  const processedApprovals = approvals.filter(a => a.status !== 'pending');

  const handleApprove = (id: string) => {
    setApprovals(prev => prev.map(a => 
      a.id === id ? { ...a, status: 'approved' as const } : a
    ));
    setSelectedApproval(null);
  };

  const handleReject = (id: string) => {
    setApprovals(prev => prev.map(a => 
      a.id === id ? { ...a, status: 'rejected' as const } : a
    ));
    setSelectedApproval(null);
    setRejectionReason('');
  };

  const formatTimeRemaining = (expiresAt: Date) => {
    const diff = expiresAt.getTime() - Date.now();
    if (diff <= 0) return 'Expired';
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Approvals</h2>
        <p className="text-muted-foreground">Review and approve automation actions</p>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="h-4 w-4" />
            Pending ({pendingApprovals.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <FileText className="h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          {pendingApprovals.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <CheckCircle2 className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-foreground">All Caught Up!</h3>
                <p className="text-muted-foreground mt-1">No pending approvals at this time</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {pendingApprovals.map((approval) => (
                <Card key={approval.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                          <AlertTriangle className="h-5 w-5 text-warning" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{approval.stepName}</h3>
                          <p className="text-sm text-muted-foreground">
                            From playbook: {approval.playbookName}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <Badge className={riskTierColors[approval.riskTier]}>
                              {approval.riskTier.charAt(0).toUpperCase() + approval.riskTier.slice(1)} Risk
                            </Badge>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <User className="h-3 w-3" />
                              {approval.requestedBy}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {formatTimeRemaining(approval.expiresAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedApproval(approval)}
                        >
                          Review
                        </Button>
                        <Button
                          size="sm"
                          className="gap-1"
                          onClick={() => handleApprove(approval.id)}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <div className="grid gap-4">
            {processedApprovals.map((approval) => (
              <Card key={approval.id} className="opacity-75">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {approval.status === 'approved' ? (
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                      ) : approval.status === 'rejected' ? (
                        <XCircle className="h-5 w-5 text-destructive" />
                      ) : (
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      )}
                      <div>
                        <h3 className="font-medium text-foreground">{approval.stepName}</h3>
                        <p className="text-sm text-muted-foreground">{approval.playbookName}</p>
                      </div>
                    </div>
                    <Badge variant={approval.status === 'approved' ? 'default' : 'secondary'}>
                      {approval.status.charAt(0).toUpperCase() + approval.status.slice(1)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedApproval} onOpenChange={() => setSelectedApproval(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Approval Request</DialogTitle>
            <DialogDescription>
              {selectedApproval?.playbookName} - {selectedApproval?.stepName}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm text-foreground mb-2">Context</h4>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-auto">
                {JSON.stringify(selectedApproval?.context, null, 2)}
              </pre>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-foreground mb-2">Rejection Reason (optional)</h4>
              <Textarea
                placeholder="Provide a reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedApproval(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedApproval && handleReject(selectedApproval.id)}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button onClick={() => selectedApproval && handleApprove(selectedApproval.id)}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
