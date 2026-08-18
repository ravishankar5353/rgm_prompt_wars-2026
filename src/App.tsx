import React, { useState } from 'react';
import { useTechReel, ActiveTab } from './context/TechReelContext';
import { Header } from './components/common/Header';
import { ChatSidebar } from './components/chat/ChatSidebar';
import { ChatMessageList } from './components/chat/ChatMessageList';
import { ChatInput } from './components/chat/ChatInput';
import { ReelList } from './components/reels/ReelList';
import { HiddenInterestCard } from './components/analysis/HiddenInterestCard';
import { RequiredOutputCard } from './components/analysis/RequiredOutputCard';
import { RecommendationCard } from './components/analysis/RecommendationCard';
import { EvidenceTrail } from './components/analysis/EvidenceTrail';
import { TopicSaturationAlert } from './components/analysis/TopicSaturationAlert';
import { SemanticVsKeywordBenchmark } from './components/analysis/SemanticVsKeywordBenchmark';
import { InteractiveInterestGraph } from './components/graph/InteractiveInterestGraph';
import { AnalyticsDashboard } from './components/dashboard/AnalyticsDashboard';
import { HistoryView } from './components/dashboard/HistoryView';
import { WhatIfSimulator } from './components/simulator/WhatIfSimulator';
import { JudgeDemoWalkthrough } from './components/judge/JudgeDemoWalkthrough';
import { AnalysisLoadingState } from './components/analysis/AnalysisLoadingState';
import { Sparkles, MessageSquare, Layers, Shield } from 'lucide-react';

export const App: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentAnalysis,
    isAnalyzing,
    isJudgeDemoActive,
  } = useTechReel();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderWorkspaceContent = () => {
    if (isAnalyzing) {
      return <AnalysisLoadingState />;
    }

    if (isJudgeDemoActive) {
      return <JudgeDemoWalkthrough />;
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

      case 'interests':
        return (
          <div className="workspace-content" style={{ gap: '20px' }}>
            {currentAnalysis ? (
              <>
                <HiddenInterestCard hiddenInterest={currentAnalysis.hiddenInterest} />
                {currentAnalysis.saturationAlert.detected && (
                  <TopicSaturationAlert alert={currentAnalysis.saturationAlert} />
                )}
                <EvidenceTrail evidenceTrail={currentAnalysis.evidenceTrail} />
              </>
            ) : (
              <div className="glass-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
                <Sparkles size={36} color="var(--accent-primary)" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>
                  No Active Analysis
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto 18px' }}>
                  Add reel interactions or run the Judge Demo to discover your underlying technology interests.
                </p>
                <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('analyze')}>
                  Go to Reel Inputs
                </button>
              </div>
            )}
          </div>
        );

      case 'graph':
        return (
          <div className="workspace-content">
            {currentAnalysis ? (
              <InteractiveInterestGraph graphData={currentAnalysis.interestGraph} />
            ) : (
              <div className="glass-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>
                  No Interest Graph Available
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Run an analysis to generate an interactive hierarchical interest tree.
                </p>
                <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('analyze')}>
                  Analyze Reels
                </button>
              </div>
            )}
          </div>
        );

      case 'recommendations':
        return (
          <div className="workspace-content" style={{ gap: '20px' }}>
            {currentAnalysis ? (
              <>
                <RequiredOutputCard output={currentAnalysis.requiredOutput} />
                <RecommendationCard
                  primaryRec={currentAnalysis.primaryRecommendation}
                  alternativeRecs={currentAnalysis.alternativeRecommendations}
                />
              </>
            ) : (
              <div className="glass-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>
                  No Recommendations Ready
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Add your recent scrolling reels to generate tailored technology recommendations.
                </p>
                <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('analyze')}>
                  Add Reels
                </button>
              </div>
            )}
          </div>
        );

      case 'benchmark':
        return (
          <div className="workspace-content">
            {currentAnalysis ? (
              <SemanticVsKeywordBenchmark benchmark={currentAnalysis.benchmarkComparison} />
            ) : (
              <div className="glass-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>
                  Benchmark Ready
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Load the Official Judge Trap to see how TechReel AI compares with traditional keyword matching.
                </p>
                <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('analyze')}>
                  Load Scenario
                </button>
              </div>
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
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                TechReel AI operates with strict privacy-by-design principles. We do not connect to or scrape private social media accounts. All reel interactions analyzed are provided explicitly by the student, processed in temporary session memory, and protected with Row-Level Security (RLS).
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('chat')}>
                  Return to Chat
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
    </div>
  );
};
export default App;
