import React, { useState } from 'react';
import {
  Zap,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Brain,
  Scale,
  Film,
  FolderSync,
} from 'lucide-react';
import { useTechReel } from '../../context/TechReelContext';
import { HiddenInterestCard } from '../analysis/HiddenInterestCard';
import { RequiredOutputCard } from '../analysis/RequiredOutputCard';
import { RecommendationCard } from '../analysis/RecommendationCard';
import { SemanticVsKeywordBenchmark } from '../analysis/SemanticVsKeywordBenchmark';
import { EvidenceTrail } from '../analysis/EvidenceTrail';
import { AnalysisLoadingState } from '../analysis/AnalysisLoadingState';

export const JudgeDemoWalkthrough: React.FC = () => {
  const {
    demoReels,
    demoAnalysisResult,
    runDemoAnalysis,
    resetDemo,
    isAnalyzing,
    createProfileFromDemo,
    setIsLandingPage,
    setIsDemoMode,
  } = useTechReel();

  const [email, setEmail] = useState('');
  const [showProfilePrompt, setShowProfilePrompt] = useState(false);

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    createProfileFromDemo(email.trim());
  };

  const handleExitDemo = () => {
    setIsDemoMode(false);
    setIsLandingPage(true);
  };

  if (isAnalyzing) {
    return <AnalysisLoadingState />;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        padding: '30px 24px',
        overflowY: 'auto',
      }}
    >
      {/* Sandbox Header */}
      <div
        className="glass-card"
        style={{
          maxWidth: '1000px',
          margin: '0 auto 24px',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%), var(--bg-glass-card)',
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: 'white',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: 'var(--radius-pill)',
              }}
            >
              🏆 ONE-TIME JUDGE SANDBOX
            </span>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800 }}>TECHREEL AI</h2>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Verify semantic cross-reel reasoning on the official trap. No login required.
          </p>
        </div>

        <button className="btn btn-secondary btn-sm" onClick={handleExitDemo}>
          ✕ Exit Demo
        </button>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Step 1: Input Reels Showcase */}
        {!demoAnalysisResult ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Film size={16} color="var(--accent-primary)" />
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>
                  Official Trap Scenario: Loaded 4 Anonymized Reels
                </h3>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '14px',
                  marginBottom: '20px',
                }}
              >
                {demoReels.map((reel, index) => (
                  <div
                    key={reel.id}
                    className="glass-card"
                    style={{
                      padding: '14px',
                      background: 'rgba(0, 0, 0, 0.25)',
                      borderColor: 'var(--border-subtle)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      <span>Reel #{index + 1}</span>
                      <span className="badge badge-secondary" style={{ fontSize: '0.65rem' }}>{reel.category}</span>
                    </div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {reel.title}
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                      {reel.caption}
                    </p>
                    <div style={{ marginTop: '10px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      Interaction: <strong>{reel.interactionType}</strong> • Watch: <strong>{reel.watchPercentage}%</strong>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  className="btn btn-primary"
                  style={{
                    padding: '12px 32px',
                    fontSize: '1rem',
                    boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
                  }}
                  onClick={runDemoAnalysis}
                >
                  <Brain size={18} />
                  <span>ANALYZE MY SCROLLING</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Step 2: Display Detailed AI Results */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {/* Visual Callout */}
            <HiddenInterestCard hiddenInterest={demoAnalysisResult.hiddenInterest} />

            {/* PromptWars Official Specification Output */}
            <RequiredOutputCard output={demoAnalysisResult.requiredOutput} />

            {/* Semantic vs Keyword comparison */}
            <SemanticVsKeywordBenchmark benchmark={demoAnalysisResult.benchmarkComparison} />

            {/* Recommendation detail with DNA and Explainability */}
            <RecommendationCard
              primaryRec={demoAnalysisResult.primaryRecommendation}
              alternativeRecs={demoAnalysisResult.alternativeRecommendations}
            />

            {/* Evidence Breakdown */}
            <EvidenceTrail evidenceTrail={demoAnalysisResult.evidenceTrail} />

            {/* Post Demo Actions */}
            <div
              className="glass-card"
              style={{
                padding: '24px',
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(99, 102, 241, 0.08) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
              }}
            >
              {!showProfilePrompt ? (
                <>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px' }}>
                    Demo Walkthrough Complete!
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '18px', maxWidth: '600px', margin: '0 auto 18px' }}>
                    Save these results to your personalized student interest profile to start logging and tracking your technology discovery path.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                    <button className="btn btn-primary btn-sm" onClick={() => setShowProfilePrompt(true)}>
                      <FolderSync size={14} />
                      <span>CREATE MY PROFILE</span>
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={resetDemo}>
                      <RotateCcw size={14} />
                      <span>TRY AGAIN</span>
                    </button>
                  </div>
                </>
              ) : (
                <form onSubmit={handleCreateProfile} style={{ maxWidth: '380px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Enter your Email to create profile</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="name@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{ textAlign: 'center' }}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Confirm & Create Profile
                  </button>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShowProfilePrompt(false)}>
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default JudgeDemoWalkthrough;
