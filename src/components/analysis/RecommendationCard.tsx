import React, { useState } from 'react';
import {
  Zap,
  Play,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Clock,
  Sparkles,
  ChevronRight,
  Check,
  Tag,
  ExternalLink,
} from 'lucide-react';
import { RecommendationCandidate, RecommendationCategory } from '../../types/analysis';
import { FeedbackType, NotRelevantReason } from '../../types/feedback';
import { useTechReel } from '../../context/TechReelContext';
import { RecommendationDNAPanel } from './RecommendationDNAPanel';
import { WhyThisWhyNotCard } from './WhyThisWhyNotCard';

interface RecommendationCardProps {
  primaryRec: RecommendationCandidate;
  alternativeRecs?: RecommendationCandidate[];
}

const REJECTION_REASONS: NotRelevantReason[] = [
  'Too basic',
  'Too advanced',
  'Not interested',
  'Already know this',
  'Not relevant',
];

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  primaryRec,
  alternativeRecs = [],
}) => {
  const { submitFeedback, focusMode } = useTechReel();
  const [activeFeedback, setActiveFeedback] = useState<FeedbackType | null>(null);
  const [showRejectReasons, setShowRejectReasons] = useState(false);
  const [selectedReason, setSelectedReason] = useState<NotRelevantReason | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  const handleFeedback = (type: FeedbackType, reason?: NotRelevantReason) => {
    setActiveFeedback(type);
    if (type === 'not_relevant' && !reason) {
      setShowRejectReasons(true);
      return;
    }
    submitFeedback(primaryRec.id, primaryRec.title, primaryRec.category, type, reason);
    setShowRejectReasons(false);
  };

  const getCategoryBadgeClass = (cat: string) => {
    switch (cat) {
      case 'AI': return 'badge-ai';
      case 'DSA': return 'badge-dsa';
      case 'HLD': return 'badge-hld';
      case 'Cloud': return 'badge-cloud';
      case 'Hardware': return 'badge-hardware';
      case 'Cybersecurity': return 'badge-cyber';
      default: return 'badge-secondary';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Primary Recommendation Card */}
      <div
        className="glass-card"
        style={{
          border: '1px solid rgba(99, 102, 241, 0.4)',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(15, 23, 42, 0.9) 100%)',
          padding: '24px',
          boxShadow: 'var(--shadow-glow)',
        }}
      >
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
                boxShadow: 'var(--shadow-glow)',
              }}
            >
              PRIMARY TECH RECOMMENDATION
            </span>
            <span className={`badge ${getCategoryBadgeClass(primaryRec.category)}`}>
              {primaryRec.category}
            </span>
            <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.06)' }}>
              Inferred Content Level: {primaryRec.difficulty}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <Clock size={13} />
            <span>{primaryRec.estimatedDuration}</span>
          </div>
        </div>

        <h3
          style={{
            fontSize: '1.4rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            lineHeight: 1.35,
            marginBottom: '10px',
          }}
        >
          {primaryRec.title}
        </h3>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '18px' }}>
          {primaryRec.description}
        </p>

        {/* Key Concepts Tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Key Engineering Concepts:
          </span>
          {primaryRec.keyConcepts.map((concept, i) => (
            <span
              key={i}
              className="badge"
              style={{
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--border-subtle)',
                color: '#e2e8f0',
                fontSize: '0.75rem',
              }}
            >
              <Tag size={11} style={{ marginRight: '4px' }} />
              {concept}
            </span>
          ))}
        </div>

        {/* Simulated Reel Preview Player */}
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setIsPlayingPreview(!isPlayingPreview)}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: isPlayingPreview ? 'var(--accent-emerald)' : 'var(--accent-gradient)',
                border: 'none',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-glow)',
                transition: 'transform 0.2s ease',
              }}
            >
              {isPlayingPreview ? <Check size={20} /> : <Play size={20} fill="white" />}
            </button>
            <div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {isPlayingPreview ? 'Simulated Reel Playing in Interactive Sandbox' : 'Watch 60-Second Tech Reel Preview'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {isPlayingPreview ? 'Simulating high-retention technical micro-learning...' : 'Curated for educational depth & high-leverage skill growth'}
              </div>
            </div>
          </div>

          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(primaryRec.title)}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary btn-sm"
            style={{ textDecoration: 'none' }}
          >
            <ExternalLink size={13} />
            <span>Search on YouTube</span>
          </a>
        </div>

        {/* Recommendation DNA Panel */}
        <RecommendationDNAPanel dna={primaryRec.dna} />

        {/* Explainability Cards (Why This / Why Not) */}
        <WhyThisWhyNotCard whyThisWhyNot={primaryRec.whyThisWhyNot} />

        {/* Feedback Section */}
        <div
          style={{
            marginTop: '22px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            Was this recommendation useful? (Adapts future context)
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <button
              className={`btn btn-sm ${activeFeedback === 'useful' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleFeedback('useful')}
            >
              <ThumbsUp size={13} />
              <span>Useful</span>
            </button>

            <button
              className={`btn btn-sm ${activeFeedback === 'not_relevant' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleFeedback('not_relevant')}
            >
              <ThumbsDown size={13} />
              <span>Not Relevant</span>
            </button>

            <button
              className="btn btn-ghost btn-sm"
              onClick={() => handleFeedback('try_another')}
            >
              <RefreshCw size={13} />
              <span>Try Another</span>
            </button>
          </div>
        </div>

        {/* Not Relevant Reason Selector */}
        {showRejectReasons && (
          <div
            style={{
              marginTop: '12px',
              padding: '12px 14px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Why wasn't this relevant? (Informs contextual preference):
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {REJECTION_REASONS.map((reason) => (
                <button
                  key={reason}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                  onClick={() => handleFeedback('not_relevant', reason)}
                >
                  <span>{reason}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Alternative Recommendations */}
      {alternativeRecs.length > 0 && (
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Alternative Tech Discovery Horizons ({alternativeRecs.length})
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {alternativeRecs.map((alt) => (
              <div key={alt.id} className="glass-card" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className={`badge ${getCategoryBadgeClass(alt.category)}`}>
                    {alt.category}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Match: {alt.dna.interestMatch}%
                  </span>
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {alt.title}
                </h4>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {alt.description}
                </p>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: 'auto' }}>
                  {alt.keyConcepts.map((k, i) => (
                    <span key={i} className="badge" style={{ background: 'rgba(255, 255, 255, 0.04)', fontSize: '0.7rem' }}>
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
