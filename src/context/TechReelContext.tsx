import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ReelInteraction, ReelFormData } from '../types/reel';
import { AnalysisResult } from '../types/analysis';
import { UserFeedback, FeedbackType, NotRelevantReason } from '../types/feedback';
import { AppNotification } from '../types/notification';
import { UserProfile, UserRole } from '../types/user';
import { ChatMessage } from '../types/chat';
import { PRESET_SCENARIOS } from '../config/constants';
import { StorageService } from '../services/storageService';
import { GeminiService } from '../services/geminiService';
import { RecommendationEngine } from '../services/recommendationEngine';
import { getGeminiKey, setCustomGeminiKey } from '../config/env';

export type ActiveTab =
  | 'chat'
  | 'analyze'
  | 'interests'
  | 'graph'
  | 'recommendations'
  | 'benchmark'
  | 'analytics'
  | 'history'
  | 'simulator'
  | 'privacy';

interface TechReelContextType {
  // Navigation & States
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isLandingPage: boolean;
  setIsLandingPage: (val: boolean) => void;
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;

  // Global States
  reels: ReelInteraction[];
  currentAnalysis: AnalysisResult | null;
  analysisHistory: AnalysisResult[];
  isAnalyzing: boolean;
  analysisStep: number;
  analysisStepMessage: string;
  focusMode: 'focus' | 'explore';
  setFocusMode: (mode: 'focus' | 'explore') => void;
  profile: UserProfile;
  feedbackList: UserFeedback[];
  notifications: AppNotification[];
  unreadNotificationCount: number;
  chatMessages: ChatMessage[];
  isJudgeDemoActive: boolean;
  geminiKey: string;
  setGeminiKey: (key: string) => void;

  // Demo Specifics
  demoReels: ReelInteraction[];
  demoAnalysisResult: AnalysisResult | null;
  runDemoAnalysis: () => Promise<void>;
  resetDemo: () => void;
  createProfileFromDemo: (email: string) => void;

  // Actions
  setUserRole: (role: UserRole) => void;
  toggleTheme: () => void;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;

  // Reel management
  addReel: (data: ReelFormData) => void;
  updateReel: (id: string, data: ReelFormData) => void;
  deleteReel: (id: string) => void;
  reorderReels: (startIndex: number, endIndex: number) => void;
  loadScenario: (scenarioId: string) => void;
  clearReels: () => void;

  // Analysis & Engine
  runAnalysis: (overrideFocusMode?: 'focus' | 'explore') => Promise<AnalysisResult>;
  triggerJudgeDemo: () => Promise<void>;
  applyWhatIfResult: (result: AnalysisResult) => void;

  // Feedback & Interactions
  submitFeedback: (
    recommendationId: string,
    recommendationTitle: string,
    category: string,
    type: FeedbackType,
    reason?: NotRelevantReason,
    comment?: string
  ) => void;

  // Notifications
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;

  // Chat
  sendChatMessage: (content: string) => Promise<void>;
  clearChatHistory: () => void;

  // Auth Flow
  loginWithEmail: (email: string) => Promise<void>;
  logout: () => Promise<void>;

  // Privacy
  exportData: () => void;
  clearAllData: () => void;
}

const TechReelContext = createContext<TechReelContextType | undefined>(undefined);

const ANALYSIS_STEPS = [
  'Understanding your Reels & watch signals...',
  'Extracting cross-reel semantic patterns...',
  'Inferring broader hidden interests & context...',
  'Checking topic saturation & repetition fatigue...',
  'Filtering low-value hype & superficial listicles...',
  'Matching your next high-impact technology match...',
];

export const TechReelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Auth State
  const [isLandingPage, setIsLandingPageState] = useState(true);
  const [isDemoMode, setIsDemoModeState] = useState(false);
  const [isAuthenticated, setIsAuthenticatedState] = useState(() => {
    return localStorage.getItem('techreel_authenticated') === 'true';
  });

  // Demo Reels (Separate from Authenticated Profile)
  const [demoReels, setDemoReels] = useState<ReelInteraction[]>(PRESET_SCENARIOS[0].reels);
  const [demoAnalysisResult, setDemoAnalysisResult] = useState<AnalysisResult | null>(null);

  // Authenticated Reels & Profiles
  const [reels, setReels] = useState<ReelInteraction[]>(() => {
    const saved = StorageService.getReels();
    return saved.length > 0 ? saved : [];
  });

  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(() =>
    StorageService.getCurrentAnalysis()
  );
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisResult[]>(() =>
    StorageService.getAnalysisHistory()
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [focusMode, setFocusModeState] = useState<'focus' | 'explore'>('focus');
  const [profile, setProfile] = useState<UserProfile>(() => StorageService.getProfile());
  const [feedbackList, setFeedbackList] = useState<UserFeedback[]>(() =>
    StorageService.getFeedback()
  );
  const [notifications, setNotifications] = useState<AppNotification[]>(() =>
    StorageService.getNotifications()
  );
  const [activeTab, setActiveTab] = useState<ActiveTab>('analyze');
  const [isJudgeDemoActive, setIsJudgeDemoActive] = useState(false);
  const [geminiKey, setGeminiKeyState] = useState<string>(() => getGeminiKey());

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-msg',
      sender: 'assistant',
      content: `👋 **Welcome to TechReel AI!**\n\nI turn your everyday short-form scrolling into smarter technology discovery.\n\n### ⚡ Quick Start:\n1. Use the main screen to add the Reels you've interacted with.\n2. Or click the **"⚡ TRY JUDGE DEMO"** above to run the official 4-Reel trap.\n3. Ask me anything about your recommendations, difficulty levels, or system design!`,
      timestamp: Date.now(),
      quickActions: [
        'Why did you recommend HLD?',
        'Why not another Java reel?',
        'Give me something easier',
        'Which interest is strongest?',
      ],
    },
  ]);

  // Sync authentication state
  useEffect(() => {
    localStorage.setItem('techreel_authenticated', String(isAuthenticated));
  }, [isAuthenticated]);

  // Persist reels
  useEffect(() => {
    if (isAuthenticated) {
      StorageService.saveReels(reels);
    }
  }, [reels, isAuthenticated]);

  // Handle theme classes on HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (profile.preferences.theme === 'light') {
      root.classList.add('light-theme');
    } else {
      root.classList.remove('light-theme');
    }

    if (profile.preferences.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (profile.preferences.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    StorageService.saveProfile(profile);
  }, [profile]);

  const setGeminiKey = (key: string) => {
    setCustomGeminiKey(key);
    setGeminiKeyState(key);
    addNotification({
      type: 'system_update',
      title: 'Gemini Key Updated',
      message: key ? 'Custom Google Gemini API key configured.' : 'Reset to default API configuration.',
    });
  };

  const setFocusMode = (mode: 'focus' | 'explore') => {
    setFocusModeState(mode);
    setProfile((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, focusMode: mode },
    }));
    addNotification({
      type: 'system_update',
      title: `Mode Changed: ${mode === 'focus' ? '🎯 Focus Mode' : '🧭 Explore Mode'}`,
      message: mode === 'focus' ? 'Prioritizing maximum contextual relevance.' : 'Prioritizing novel adjacent tech discoveries.',
    });
  };

  const setUserRole = (role: UserRole) => {
    setProfile((prev) => ({ ...prev, role }));
    addNotification({
      type: 'system_update',
      title: `Role Switched to ${role}`,
      message: role === 'ADMIN' ? 'Admin diagnostic and aggregate view enabled.' : 'Student view active.',
    });
  };

  const toggleTheme = () => {
    setProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        theme: prev.preferences.theme === 'dark' ? 'light' : 'dark',
      },
    }));
  };

  const toggleHighContrast = () => {
    setProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        highContrast: !prev.preferences.highContrast,
      },
    }));
  };

  const toggleReducedMotion = () => {
    setProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        reducedMotion: !prev.preferences.reducedMotion,
      },
    }));
  };

  const addNotification = (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      timestamp: Date.now(),
      read: false,
    };
    setNotifications((prev) => {
      const updated = [newNotif, ...prev].slice(0, 30);
      StorageService.saveNotifications(updated);
      return updated;
    });
  };

  // REEL MANAGEMENT
  const addReel = (data: ReelFormData) => {
    const newReel: ReelInteraction = {
      ...data,
      id: `reel-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      timestamp: Date.now(),
    };
    setReels((prev) => [newReel, ...prev]);
    addNotification({
      type: 'analysis_completed',
      title: 'Reel Added',
      message: `"${data.title}" added to your scrolling profile. (${reels.length + 1} total)`,
    });
  };

  const updateReel = (id: string, data: ReelFormData) => {
    setReels((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...data } : r))
    );
  };

  const deleteReel = (id: string) => {
    setReels((prev) => prev.filter((r) => r.id !== id));
  };

  const reorderReels = (startIndex: number, endIndex: number) => {
    setReels((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  const loadScenario = (scenarioId: string) => {
    const scenario = PRESET_SCENARIOS.find((s) => s.id === scenarioId) || PRESET_SCENARIOS[0];
    setReels(scenario.reels);
    addNotification({
      type: 'system_update',
      title: `Scenario Loaded: ${scenario.name}`,
      message: scenario.description,
    });
  };

  const clearReels = () => {
    setReels([]);
  };

  // DEMO-SPECIFIC ACTIONS (Completely separate from user storage/profile)
  const runDemoAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisStep(0);

    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => (prev < ANALYSIS_STEPS.length - 1 ? prev + 1 : prev));
    }, 450);

    try {
      const result = await GeminiService.analyzeReelsWithGemini(demoReels, 'focus', []);
      clearInterval(stepInterval);
      setAnalysisStep(ANALYSIS_STEPS.length - 1);
      setDemoAnalysisResult(result);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {}
    } catch (e) {
      clearInterval(stepInterval);
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetDemo = () => {
    setDemoReels(PRESET_SCENARIOS[0].reels);
    setDemoAnalysisResult(null);
  };

  const createProfileFromDemo = (email: string) => {
    // Port demo reels and analysis over to the newly authenticated profile
    setReels(demoReels);
    if (demoAnalysisResult) {
      setCurrentAnalysis(demoAnalysisResult);
      setAnalysisHistory([demoAnalysisResult]);
      StorageService.saveCurrentAnalysis(demoAnalysisResult);
    }
    setProfile((prev) => ({
      ...prev,
      email: email,
      name: email.split('@')[0],
    }));
    setIsAuthenticatedState(true);
    setIsLandingPageState(false);
    setIsDemoModeState(false);
    setActiveTab('analyze');
  };

  // ANALYSIS ENGINE RUNNER
  const runAnalysis = async (overrideFocusMode?: 'focus' | 'explore'): Promise<AnalysisResult> => {
    if (reels.length < 1) {
      throw new Error('Please add at least 1 reel before running analysis.');
    }

    setIsAnalyzing(true);
    setAnalysisStep(0);

    const modeToUse = overrideFocusMode || focusMode;

    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => (prev < ANALYSIS_STEPS.length - 1 ? prev + 1 : prev));
    }, 400);

    try {
      const pastTitles = analysisHistory.map((h) => h.primaryRecommendation.title);
      const result = await GeminiService.analyzeReelsWithGemini(reels, modeToUse, pastTitles);

      clearInterval(stepInterval);
      setAnalysisStep(ANALYSIS_STEPS.length - 1);

      setCurrentAnalysis(result);
      setAnalysisHistory((prev) => [result, ...prev.filter((p) => p.id !== result.id)].slice(0, 50));
      StorageService.saveCurrentAnalysis(result);

      // Auto-navigate to the unified results page
      setActiveTab('interests');

      if (result.hiddenInterest.confidenceScore >= 85) {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
          });
        } catch {}
      }

      addNotification({
        type: 'new_interest',
        title: 'Hidden Interest Discovered!',
        message: `Inferred: "${result.hiddenInterest.inferredInterest}" (${result.hiddenInterest.confidenceScore}% confidence)`,
      });

      if (result.saturationAlert.detected) {
        addNotification({
          type: 'topic_saturation',
          title: 'Topic Saturation Alert',
          message: result.saturationAlert.message || 'Topic saturation detected.',
        });
      }

      const chatCard: ChatMessage = {
        id: `chat-result-${Date.now()}`,
        sender: 'assistant',
        content: `### 🎯 Analysis Complete: ${result.hiddenInterest.inferredInterest}\n\n**Recommended Tech Reel:** [${result.primaryRecommendation.category}] ${result.primaryRecommendation.title}\n\n**Confidence:** ${result.hiddenInterest.confidence} (${result.hiddenInterest.confidenceScore}%)\n\n*Why:* ${result.requiredOutput.whyThisRecommendation}`,
        timestamp: Date.now(),
        type: 'analysis_card',
        analysisData: result,
        quickActions: [
          'Why did you recommend HLD?',
          'Why not another Java reel?',
          'Give me something easier',
          'Explore adjacent topics',
        ],
      };
      setChatMessages((prev) => [...prev, chatCard]);

      return result;
    } catch (err: any) {
      clearInterval(stepInterval);
      throw err;
    } finally {
      setIsAnalyzing(false);
    }
  };

  // TRIGGER JUDGE DEMO (Sandbox Mode setup)
  const triggerJudgeDemo = async () => {
    setIsLandingPageState(false);
    setIsDemoModeState(true);
    resetDemo();
  };

  const applyWhatIfResult = (result: AnalysisResult) => {
    setCurrentAnalysis(result);
    addNotification({
      type: 'new_interest',
      title: 'What-If Simulation Active',
      message: `Previewing projection: ${result.hiddenInterest.inferredInterest}`,
    });
  };

  // FEEDBACK
  const submitFeedback = (
    recommendationId: string,
    recommendationTitle: string,
    category: string,
    type: FeedbackType,
    reason?: NotRelevantReason,
    comment?: string
  ) => {
    const fb: UserFeedback = {
      id: `fb-${Date.now()}`,
      recommendationId,
      recommendationTitle,
      category,
      feedbackType: type,
      notRelevantReason: reason,
      comment,
      timestamp: Date.now(),
    };

    setFeedbackList((prev) => [fb, ...prev]);
    StorageService.saveFeedback(fb);

    addNotification({
      type: 'feedback_recorded',
      title: 'Feedback Recorded',
      message: type === 'useful' ? 'Marked as useful! Adapting recommendations.' : `Recorded feedback (${reason || 'Not relevant'}). Adjusting future context.`,
    });

    if (type === 'try_another') {
      runAnalysis(focusMode === 'focus' ? 'explore' : 'focus');
    }
  };

  // NOTIFICATIONS
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
      StorageService.saveNotifications(updated);
      return updated;
    });
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      StorageService.saveNotifications(updated);
      return updated;
    });
  };

  const clearNotifications = () => {
    setNotifications([]);
    StorageService.saveNotifications([]);
  };

  // CHAT
  const sendChatMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: content.trim(),
      timestamp: Date.now(),
    };

    setChatMessages((prev) => [...prev, userMsg]);

    const assistantPlaceholder: ChatMessage = {
      id: `asst-${Date.now()}`,
      sender: 'assistant',
      content: 'Thinking...',
      timestamp: Date.now() + 1,
    };
    setChatMessages((prev) => [...prev, assistantPlaceholder]);

    try {
      const response = await GeminiService.answerChatQuery(content, currentAnalysis, reels);
      setChatMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantPlaceholder.id
            ? { ...msg, content: response, timestamp: Date.now() }
            : msg
        )
      );
    } catch (err) {
      setChatMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantPlaceholder.id
            ? {
                ...msg,
                content: 'I encountered an issue processing that query. Please try again or rephrase!',
                timestamp: Date.now(),
              }
            : msg
        )
      );
    }
  };

  const clearChatHistory = () => {
    setChatMessages([
      {
        id: 'welcome-fresh',
        sender: 'assistant',
        content: 'Chat history cleared. How can I help you explore your tech interests?',
        timestamp: Date.now(),
        quickActions: ['Analyze my latest Reels', 'Show me something new'],
      },
    ]);
  };

  // AUTH LOGIC (Simple Email sign in callback fallbacks)
  const loginWithEmail = async (email: string) => {
    // If Supabase keys are configured, do real email auth, else do beautiful mock login for hackathon ease
    setProfile((prev) => ({
      ...prev,
      email: email,
      name: email.split('@')[0],
    }));
    setIsAuthenticatedState(true);
    setIsLandingPageState(false);
    setIsDemoModeState(false);
    setActiveTab('analyze');
    addNotification({
      type: 'system_update',
      title: 'Signed In Successfully',
      message: `Signed in as ${email}. Profile loaded.`,
    });
  };

  const logout = async () => {
    setIsAuthenticatedState(false);
    setIsLandingPageState(true);
    setIsDemoModeState(false);
    setCurrentAnalysis(null);
    setReels([]);
    addNotification({
      type: 'system_update',
      title: 'Signed Out',
      message: 'Signed out of profile. Active session cleared.',
    });
  };

  // PRIVACY ACTIONS
  const exportData = () => {
    const jsonStr = StorageService.exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `techreel-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAllData = () => {
    StorageService.clearAllHistory();
    setReels([]);
    setCurrentAnalysis(null);
    setAnalysisHistory([]);
    setFeedbackList([]);
    setNotifications([]);
    clearChatHistory();
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  return (
    <TechReelContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isLandingPage,
        setIsLandingPage: setIsLandingPageState,
        isDemoMode,
        setIsDemoMode: setIsDemoModeState,
        isAuthenticated,
        setIsAuthenticated: setIsAuthenticatedState,
        reels,
        currentAnalysis,
        analysisHistory,
        isAnalyzing,
        analysisStep,
        analysisStepMessage: ANALYSIS_STEPS[analysisStep] || ANALYSIS_STEPS[0],
        focusMode,
        setFocusMode,
        profile,
        feedbackList,
        notifications,
        unreadNotificationCount,
        chatMessages,
        isJudgeDemoActive,
        geminiKey,
        setGeminiKey,
        demoReels,
        demoAnalysisResult,
        runDemoAnalysis,
        resetDemo,
        createProfileFromDemo,
        setUserRole,
        toggleTheme,
        toggleHighContrast,
        toggleReducedMotion,
        addReel,
        updateReel,
        deleteReel,
        reorderReels,
        loadScenario,
        clearReels,
        runAnalysis,
        triggerJudgeDemo,
        applyWhatIfResult,
        submitFeedback,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotifications,
        sendChatMessage,
        clearChatHistory,
        loginWithEmail,
        logout,
        exportData,
        clearAllData,
      }}
    >
      {children}
    </TechReelContext.Provider>
  );
};

export const useTechReel = () => {
  const context = useContext(TechReelContext);
  if (!context) {
    throw new Error('useTechReel must be used within a TechReelProvider');
  }
  return context;
};
