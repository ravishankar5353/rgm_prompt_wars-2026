import React, { useState } from 'react';
import { useTechReel, ActiveTab } from './context/TechReelContext';
import { Header } from './components/common/Header';
import { ChatSidebar } from './components/chat/ChatSidebar';
import { ChatMessageList } from './components/chat/ChatMessageList';
import { ChatInput } from './components/chat/ChatInput';
import { ReelList } from './components/reels/ReelList';
import { ResultsPage } from './components/analysis/ResultsPage';
import { InteractiveInterestGraph } from './components/graph/InteractiveInterestGraph';
import { AnalyticsDashboard } from './components/dashboard/AnalyticsDashboard';
import { HistoryView } from './components/dashboard/HistoryView';
import { WhatIfSimulator } from './components/simulator/WhatIfSimulator';
import { JudgeDemoWalkthrough } from './components/judge/JudgeDemoWalkthrough';
import { LandingPage } from './components/common/LandingPage';
import { AnalysisLoadingState } from './components/analysis/AnalysisLoadingState';
import { Sparkles, Shield, Brain } from 'lucide-react';

export const App: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentAnalysis,
    isAnalyzing,
    isLandingPage,
    isDemoMode,
  } = useTechReel();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Route 1: Landing Page (unauthenticated fresh visitor)
  if (isLandingPage) {
    return <LandingPage />;
  }

  // Route 2: One-time Judge Demo Sandbox (no auth needed)
  if (isDemoMode) {
    return <JudgeDemoWalkthrough />;
  }

  const renderWorkspaceContent = () => {
    // Full-screen loading state
    if (isAnalyzing) {
      return <AnalysisLoadingState />;
    }

    switch (activeTab) {
      case 'chat':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            <ChatMessageList />
            <ChatInput />
          </div>
        );

      case 'analyze':
        return (
          <div className="workspace-content">
            <ReelList />
          </div>
        );

      // Primary result screen — shows EVERYTHING in one clean vertical flow
      case 'interests':
        return (
          <div className="workspace-content">
            <ResultsPage />
          </div>
        );

      case 'graph':
        return (
          <div className="workspace-content">
            {currentAnalysis ? (
              <InteractiveInterestGraph graphData={currentAnalysis.interestGraph} />
            ) : (
              <EmptyState
                title="No Interest Graph Available"
                body="Run an analysis to generate an interactive hierarchical interest tree."
                cta="Analyze Reels"
                onCta={() => setActiveTab('analyze')}
              />
            )}
          </div>
        );

      case 'analytics':
        return (
          <div className="workspace-content">
            <AnalyticsDashboard />
          </div>
        );

      case 'history':
        return (
          <div className="workspace-content">
            <HistoryView />
          </div>
        );

      case 'simulator':
        return (
          <div className="workspace-content">
            <WhatIfSimulator />
          </div>
        );

      case 'privacy':
        return (
          <div className="workspace-content">
            <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <Shield size={24} color="var(--accent-primary)" />
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Privacy & Data Architecture</h2>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '12px' }}>
                TechReel AI operates with strict privacy-by-design principles. We do not connect to or scrape private social media accounts.
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                All reel interactions analyzed are provided explicitly by the student. Processing is done transiently per session. Persistent storage requires explicit user authentication and is protected with Supabase Row-Level Security (RLS) — each user accesses only their own data.
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('analyze')}>
                  Return to Analysis
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('chat')}>
                  Open Chat
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      {/* ChatGPT-style Navigation Sidebar */}
      <ChatSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Workspace Area */}
      <main className="main-workspace">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {renderWorkspaceContent()}
        </div>
      </main>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 99,
            backdropFilter: 'blur(2px)',
          }}
        />
      )}
    </div>
  );
};

// Reusable empty state component
const EmptyState: React.FC<{
  title: string;
  body: string;
  cta: string;
  onCta: () => void;
}> = ({ title, body, cta, onCta }) => (
  <div className="glass-card" style={{ textAlign: 'center', padding: '70px 24px', maxWidth: '560px', margin: '40px auto' }}>
    <Brain size={36} color="var(--accent-primary)" style={{ margin: '0 auto 14px' }} />
    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>{title}</h3>
    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '18px', maxWidth: '380px', margin: '0 auto 18px' }}>
      {body}
    </p>
    <button className="btn btn-primary btn-sm" onClick={onCta}>
      <Sparkles size={14} />
      <span>{cta}</span>
    </button>
  </div>
);

export default App;
