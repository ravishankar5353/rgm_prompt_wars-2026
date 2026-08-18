export type UserRole = 'STUDENT' | 'ADMIN';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
  preferences: {
    focusMode: 'focus' | 'explore';
    inferredLevel: 'Beginner' | 'Intermediate' | 'Advanced';
    theme: 'dark' | 'light';
    highContrast: boolean;
    reducedMotion: boolean;
  };
}

export interface AuthSession {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isDemoUser: boolean;
}
