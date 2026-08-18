export type FeedbackType = 'useful' | 'not_relevant' | 'try_another';

export type NotRelevantReason =
  | 'Too basic'
  | 'Too advanced'
  | 'Not interested'
  | 'Already know this'
  | 'Not relevant';

export interface UserFeedback {
  id: string;
  recommendationId: string;
  recommendationTitle: string;
  category: string;
  feedbackType: FeedbackType;
  notRelevantReason?: NotRelevantReason;
  comment?: string;
  timestamp: number;
}
