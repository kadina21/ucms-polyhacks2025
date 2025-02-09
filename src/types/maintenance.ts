
export type MaintenanceStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type MaintenancePriority = 'low' | 'medium' | 'high';
export type MaintenanceType = 'routine' | 'repair' | 'upgrade';

export interface MaintenanceTask {
  id: string;
  zoneId: string;
  title: string;
  description?: string;
  type: MaintenanceType;
  status: MaintenanceStatus;
  priority: MaintenancePriority;
  scheduledDate?: string;
  completionDate?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDuration?: string;
  actualDuration?: string;
  notes: string[];
}
