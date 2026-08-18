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

export interface ReelInteraction {
  id: string;
  title: string;
  caption: string;
  category: ReelCategory;
  interactionType: InteractionType;
  watchPercentage: number; // 0 - 100
  timestamp: number;
  url?: string;
  tags?: string[];
}

export interface ReelFormData {
  title: string;
  caption: string;
  category: ReelCategory;
  interactionType: InteractionType;
  watchPercentage: number;
  url?: string;
}
