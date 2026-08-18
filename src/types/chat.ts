export type ChatSender = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  content: string;
  timestamp: number;
  type?: 'text' | 'analysis_card' | 'recommendation_card' | 'benchmark_card' | 'saturation_alert';
  analysisData?: any;
  recommendationData?: any;
  quickActions?: string[];
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}
