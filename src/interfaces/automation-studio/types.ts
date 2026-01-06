// Automation Studio Types

export interface Trigger {
  id: string;
  name: string;
  eventType: string;
  conditions: TriggerCondition[];
  playbookId: string;
  enabled: boolean;
  createdAt: Date;
  lastTriggered?: Date;
  triggerCount: number;
}

export interface TriggerCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'not_contains';
  value: string | number | boolean;
}

export interface PlaybookSummary {
  id: string;
  name: string;
  description: string;
  automationLevel: 0 | 1 | 2 | 3;
  riskTier: 'low' | 'medium' | 'high' | 'critical';
  stepsCount: number;
  enabled: boolean;
  lastRun?: Date;
  successRate: number;
}

export interface ApprovalRequest {
  id: string;
  playbookName: string;
  stepName: string;
  riskTier: 'low' | 'medium' | 'high' | 'critical';
  requestedAt: Date;
  expiresAt: Date;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  requestedBy: string;
  context: Record<string, unknown>;
}

export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  action: string;
  actor: string;
  entityType: string;
  entityId: string;
  details: Record<string, unknown>;
  status: 'success' | 'failure' | 'pending';
  riskTier: 'low' | 'medium' | 'high' | 'critical';
}
