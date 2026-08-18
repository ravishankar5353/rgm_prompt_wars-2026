import React, { useState } from 'react';
import {
  Brain,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  ArrowRight,
  Sparkles,
  Send,
  Target,
  Compass,
} from 'lucide-react';
import { useTechReel } from '../../context/TechReelContext';
import { HiddenInterestCard } from '../analysis/HiddenInterestCard';
import { EvidenceTrail } from '../analysis/EvidenceTrail';
import { RecommendationDNAPanel } from '../analysis/RecommendationDNAPanel';
import { SemanticVsKeywordBenchmark } from '../analysis/SemanticVsKeywordBenchmark';
import { TopicSaturationAlert } from '../analysis/TopicSaturationAlert';
import { FeedbackType, NotRelevantReason } from '../../types/feedback';

const REJECTION_REASONS: NotRelevantReason[] = [
  'Too basic',
  'Too advanced',
  'Not interested',
  'Already know this',
  'Not relevant',
];

/**
 * ResultsPage — the single-page unified result experience.
 * Shows: Hidden Interest → Why → Recommendation → Why This → Why Not → DNA Signals → Benchmark → Feedback → Chat
 * This is the critical judge-facing screen.
 */
export const ResultsPage: React.FC = () => {
  const {
    currentAnalysis,
    setActiveTab,
    submitFeedback,
    sendChatMessage,
    chatMessages,
    focusMode,
    setFocusMode,
  } = useTechReel();

  const [whyNotJavaOpen, setWhyNotJavaOpen] = useState(false);
  const [whyNotHypeOpen, setWhyNotHypeOpen] = useState(false);
  const [activeFeedback, setActiveFeedback] = useState<FeedbackType | null>(null);
  const [showRejectReasons, setShowRejectReasons] = useState(false);
  const [chatInput, setChatInput] = useState('');

  if (!currentAnalysis) {
    return (
      <div
        className="glass-card"
        style={{ textAlign: 'center', padding: '80px 24px', maxWidth: '560px', margin: '60px auto' }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 18px',
            border: '1px solid rgba(99, 102, 241, 0.3)',
          }}
        >
          <Brain size={28} color="var(--accent-primary)" />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '10px' }}>
          No Analysis Yet
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '22px', maxWidth: '380px', margin: '0 auto 22px' }}>
          Add 3–8 Reel interactions, then click <strong>🧠 Analyze My Scrolling</strong> to discover your hidden technology interest.
        </p>
        <button className="btn btn-primary" onClick={() => setActiveTab('analyze')}>
          <Sparkles size={15} />
          <span>Go to Reel Inputs</span>
        </button>
      </div>
    );
  }

  const rec = currentAnalysis.primaryRecommendation;

  const handleFeedback = (type: FeedbackType, reason?: NotRelevantReason) => {
    if (type === 'not_relevant' && !reason) {
      setShowRejectReasons(true);
      return;
    }
    setActiveFeedback(type);
    submitFeedback(rec.id, rec.title, rec.category, type, reason);
    setShowRejectReasons(false);
  };

  const handleChat = () => {
    if (!chatInput.trim()) return;
    sendChatMessage(chatInput.trim());
    setChatInput('');
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Advanced': return '#f87171';
      case 'Intermediate': return '#fbbf24';
      default: return '#34d399';
    }
  };

  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '4px 0 40px',
      }}
    >
      {/* Focus / Explore Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          AI Result — Semantic Cross-Reel Inference
        </div>
        <div className="mode-toggle">
          <button
            className={`mode-toggle-btn ${focusMode === 'focus' ? 'active' : ''}`}
            onClick={() => setFocusMode('focus')}
          >
            <Target size={13} />
            <span>Focus</span>
          </button>
          <button
            className={`mode-toggle-btn ${focusMode === 'explore' ? 'active' : ''}`}
            onClick={() => setFocusMode('explore')}
          >
            <Compass size={13} />
            <span>Explore</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: HIDDEN INTEREST (hero card) */}
      <HiddenInterestCard hiddenInterest={currentAnalysis.hiddenInterest} />

      {/* SECTION 2: Saturation Alert (if present) */}
      {currentAnalysis.saturationAlert.detected && (
        <TopicSaturationAlert alert={currentAnalysis.saturationAlert} />
      )}

      {/* SECTION 3: RECOMMENDED TECH REEL */}
      <div
        className="glass-card"
        style={{
          border: '1px solid rgba(99, 102, 241, 0.45)',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.07) 0%, rgba(15, 23, 42, 0.95) 100%)',
          padding: '24px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                background: 'var(--accent-gradient)',
                color: 'white',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
                letterSpacing: '0.04em',
              }}
            >
              🎯 RECOMMENDED TECH REEL
            </span>
            <span
              className="badge"
              style={{
                background: `rgba(99, 102, 241, 0.15)`,
                color: '#c7d2fe',
                border: '1px solid rgba(99, 102, 241, 0.3)',
              }}
            >
              {rec.category}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <span
              style={{
                color: getDifficultyColor(rec.difficulty),
                fontWeight: 700,
                fontSize: '0.8rem',
              }}
            >
              {rec.difficulty}
            </span>
            <span>•</span>
            <span>{rec.estimatedDuration}</span>
          </div>
        </div>

        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '10px', lineHeight: 1.25 }}>
          {rec.title}
        </h3>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '16px' }}>
          {rec.description}
        </p>

        {/* Key Concepts */}
        {rec.keyConcepts && rec.keyConcepts.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {rec.keyConcepts.map((c, i) => (
              <span key={i} className="badge badge-secondary" style={{ fontSize: '0.75rem' }}>{c}</span>
            ))}
          </div>
        )}

        {/* SECTION 4: WHY THIS RECOMMENDATION */}
        <div
          style={{
            background: 'rgba(0,0,0,0.25)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 16px',
            marginBottom: '12px',
          }}
        >
          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#34d399', fontWeight: 800, marginBottom: '5px', letterSpacing: '0.05em' }}>
            💡 WHY THIS RECOMMENDATION?
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {rec.whyThisWhyNot.whyThis}
          </p>
        </div>

        {/* SECTION 5: WHY NOT — Collapsible blocks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '18px' }}>
          {/* Why not another keyword-repeat Reel */}
          <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
            <button
              onClick={() => setWhyNotJavaOpen(!whyNotJavaOpen)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                padding: '10px 14px',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'left',
              }}
              aria-expanded={whyNotJavaOpen}
            >
              <span>⚔️ Why not just another Java / keyword-repeat Reel?</span>
              {whyNotJavaOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {whyNotJavaOpen && (
              <p style={{ padding: '0 14px 12px', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {rec.whyThisWhyNot.whyNotKeywordRepeat}
              </p>
            )}
          </div>

          {/* Why not generic hype */}
          <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
            <button
              onClick={() => setWhyNotHypeOpen(!whyNotHypeOpen)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                padding: '10px 14px',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'left',
              }}
              aria-expanded={whyNotHypeOpen}
            >
              <span>⚔️ Why not generic AI hype content?</span>
              {whyNotHypeOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {whyNotHypeOpen && (
              <p style={{ padding: '0 14px 12px', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {rec.whyThisWhyNot.whyNotGenericHype}
              </p>
            )}
          </div>
        </div>

        {/* SECTION 6: DNA Signals */}
        <RecommendationDNAPanel dna={rec.dna} />

        {/* SECTION 7: Feedback */}
        <div
          style={{
            marginTop: '18px',
            paddingTop: '14px',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '10px', textAlign: 'center' }}>
            Was this recommendation helpful?
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className={`btn btn-sm ${activeFeedback === 'useful' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleFeedback('useful')}
              aria-label="Mark as useful"
            >
              <ThumbsUp size={13} />
              <span>👍 Useful</span>
            </button>
            <button
              className={`btn btn-sm ${activeFeedback === 'not_relevant' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleFeedback('not_relevant')}
              aria-label="Mark as not relevant"
            >
              <ThumbsDown size={13} />
              <span>👎 Not Relevant</span>
            </button>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => handleFeedback('try_another')}
              aria-label="Try another recommendation"
            >
              <RefreshCw size={13} />
              <span>🔄 Try Another</span>
            </button>
          </div>

          {showRejectReasons && (
            <div style={{ marginTop: '10px', padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>What didn't fit?</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {REJECTION_REASONS.map((r) => (
                  <button
                    key={r}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem' }}
                    onClick={() => handleFeedback('not_relevant', r)}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 8: Evidence Trail */}
      <EvidenceTrail evidenceTrail={currentAnalysis.evidenceTrail} />

      {/* SECTION 9: Semantic vs Keyword Comparison */}
      <SemanticVsKeywordBenchmark benchmark={currentAnalysis.benchmarkComparison} />

      {/* SECTION 10: Quick AI Chat Assistant */}
      <div
        className="glass-card"
        style={{
          border: '1px solid var(--border-glass)',
          background: 'var(--bg-glass-card)',
          padding: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Brain size={16} color="var(--accent-primary)" />
          <h4 style={{ fontSize: '0.9rem', fontWeight: 800 }}>Ask TechReel AI</h4>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            (Context-aware — uses current analysis)
          </span>
        </div>

        {/* Quick action chips */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
          {[
            'Why did you recommend this?',
            'Why not Java?',
            'Give me something easier',
            'Explore something new',
          ].map((pill) => (
            <button
              key={pill}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.72rem', borderRadius: 'var(--radius-pill)', padding: '3px 10px' }}
              onClick={() => sendChatMessage(pill)}
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Last AI response */}
        {chatMessages.length > 0 && (
          <div
            style={{
              background: 'rgba(0,0,0,0.25)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 12px',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.4,
              marginBottom: '10px',
              maxHeight: '120px',
              overflowY: 'auto',
            }}
          >
            {chatMessages[chatMessages.length - 1].content.substring(0, 300)}
            {chatMessages[chatMessages.length - 1].content.length > 300 && '...'}
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            className="form-input"
            placeholder='Ask: "Why this?" / "Give me something related to AI"...'
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            style={{ flex: 1, fontSize: '0.82rem' }}
            onKeyDown={(e) => { if (e.key === 'Enter') handleChat(); }}
            aria-label="Chat with TechReel AI"
          />
          <button className="btn btn-primary btn-sm" onClick={handleChat} aria-label="Send message">
            <Send size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
