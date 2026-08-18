export type ReelCategory =
  | 'Entertainment'
  | 'Gaming'
  | 'Coding'
  | 'AI'
  | 'Gadgets'
  | 'Career'
  | 'Programming Meme'
  | 'Tech News'
  | 'Other';

export type InteractionType = 'Watched' | 'Liked' | 'Saved' | 'Shared';

export interface ReelComment {
  id: string;
  authorName: string;
  authorAvatar?: string;
  authorRole?: string;
  content: string;
  timestamp: number;
  likes: number;
  isLiked?: boolean;
  isAiInsight?: boolean;
}

export interface ReelAIFeedback {
  hookScore: number; // 0 - 100
  hookEvaluation: string;
  pacingScore: number; // 0 - 100
  pacingEvaluation: string;
  techClarityScore: number; // 0 - 100
  techClarityEvaluation: string;
  viralityScore: number; // 0 - 100
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
    summary: string;
  };
  keyStrengths: string[];
  improvements: string[];
  inferredTopics: string[];
  actionableSummary: string;
}

export interface ReelTranscriptSegment {
  timestamp: string;
  seconds: number;
  text: string;
}

export interface ReelInteraction {
  id: string;
  title: string;
  caption: string;
  category: ReelCategory;
  interactionType: InteractionType;
  watchPercentage: number; // 0 - 100
  timestamp: number;
  url?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  creatorName?: string;
  creatorAvatar?: string;
  creatorNotes?: string;
  tags?: string[];
  comments?: ReelComment[];
  aiFeedback?: ReelAIFeedback;
  transcript?: ReelTranscriptSegment[];
}

export interface ReelFormData {
  title: string;
  caption: string;
  category: ReelCategory;
  interactionType: InteractionType;
  watchPercentage: number;
  url?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  creatorName?: string;
  creatorNotes?: string;
  tags?: string[];
}

