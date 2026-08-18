export type NotificationType =
  | 'new_interest'
  | 'topic_saturation'
  | 'recommendation_ready'
  | 'feedback_recorded'
  | 'analysis_completed'
  | 'more_interactions_needed'
  | 'system_update';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  actionRoute?: string;
  metadata?: Record<string, any>;
}
