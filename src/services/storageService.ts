import { ReelInteraction } from '../types/reel';
import { AnalysisResult } from '../types/analysis';
import { UserFeedback } from '../types/feedback';
import { AppNotification } from '../types/notification';
import { UserProfile } from '../types/user';
import { getSupabaseClient, isSupabaseConfigured } from '../config/supabase';

const STORAGE_KEYS = {
  REELS: 'techreel_reels_v1',
  ANALYSIS_HISTORY: 'techreel_analysis_history_v1',
  CURRENT_ANALYSIS: 'techreel_current_analysis_v1',
  FEEDBACK: 'techreel_feedback_v1',
  NOTIFICATIONS: 'techreel_notifications_v1',
  PROFILE: 'techreel_profile_v1',
  FOCUS_MODE: 'techreel_focus_mode_v1',
};

export class StorageService {
  // REELS
  public static getReels(): ReelInteraction[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REELS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static saveReels(reels: ReelInteraction[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.REELS, JSON.stringify(reels));
      if (isSupabaseConfigured()) {
        const client = getSupabaseClient();
        // Fire and forget sync
        client?.from('reel_interactions').upsert(
          reels.map((r) => ({
            id: r.id,
            title: r.title,
            caption: r.caption,
            category: r.category,
            interaction_type: r.interactionType,
            watch_percentage: r.watchPercentage,
            url: r.url,
          }))
        ).then();
      }
    } catch (e) {
      console.warn('Failed to save reels to localStorage', e);
    }
  }

  // CURRENT ANALYSIS
  public static getCurrentAnalysis(): AnalysisResult | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_ANALYSIS);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  public static saveCurrentAnalysis(analysis: AnalysisResult) {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_ANALYSIS, JSON.stringify(analysis));
      const history = this.getAnalysisHistory();
      const updated = [analysis, ...history.filter((h) => h.id !== analysis.id)].slice(0, 50);
      localStorage.setItem(STORAGE_KEYS.ANALYSIS_HISTORY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save analysis', e);
    }
  }

  public static getAnalysisHistory(): AnalysisResult[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ANALYSIS_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  // FEEDBACK
  public static getFeedback(): UserFeedback[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FEEDBACK);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static saveFeedback(feedback: UserFeedback) {
    try {
      const all = this.getFeedback();
      const updated = [feedback, ...all];
      localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(updated));

      if (isSupabaseConfigured()) {
        const client = getSupabaseClient();
        client?.from('recommendation_feedback').insert([
          {
            recommendation_id: feedback.recommendationId,
            recommendation_title: feedback.recommendationTitle,
            category: feedback.category,
            feedback_type: feedback.feedbackType,
            not_relevant_reason: feedback.notRelevantReason,
            comment: feedback.comment,
          },
        ]).then();
      }
    } catch (e) {
      console.warn('Failed to save feedback', e);
    }
  }

  // NOTIFICATIONS
  public static getNotifications(): AppNotification[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static saveNotifications(notifications: AppNotification[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    } catch (e) {
      console.warn('Failed to save notifications', e);
    }
  }

  // PROFILE
  public static getProfile(): UserProfile {
    const defaultProfile: UserProfile = {
      id: 'demo-student-id',
      email: 'student@techreel.ai',
      name: 'Ravi (Student)',
      role: 'STUDENT',
      avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=techreel',
      createdAt: new Date().toISOString(),
      preferences: {
        focusMode: 'focus',
        inferredLevel: 'Intermediate',
        theme: 'dark',
        highContrast: false,
        reducedMotion: false,
      },
    };

    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  }

  public static saveProfile(profile: UserProfile) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile', e);
    }
  }

  // PRIVACY ACTIONS
  public static exportAllData(): string {
    const payload = {
      exportedAt: new Date().toISOString(),
      profile: this.getProfile(),
      reels: this.getReels(),
      currentAnalysis: this.getCurrentAnalysis(),
      analysisHistory: this.getAnalysisHistory(),
      feedback: this.getFeedback(),
      notifications: this.getNotifications(),
    };
    return JSON.stringify(payload, null, 2);
  }

  public static clearAllHistory() {
    localStorage.removeItem(STORAGE_KEYS.REELS);
    localStorage.removeItem(STORAGE_KEYS.ANALYSIS_HISTORY);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_ANALYSIS);
    localStorage.removeItem(STORAGE_KEYS.FEEDBACK);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
  }
}
