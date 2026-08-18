import React from 'react';
import { Sparkles, CheckCircle, ShieldAlert, Cpu, Layers, ArrowRight } from 'lucide-react';
import { HiddenInterestDiscovery } from '../../types/analysis';

export const HiddenInterestCard: React.FC<{ hiddenInterest: HiddenInterestDiscovery }> = ({
  hiddenInterest,
}) => {
  const getConfidenceBadge = () => {
    switch (hiddenInterest.confidence) {
      case 'High':
        return <span className="badge badge-confidence-high">High Confidence ({hiddenInterest.confidenceScore}%)</span>;
      case 'Medium':
        return <span className="badge badge-confidence-medium">Medium Confidence ({hiddenInterest.confidenceScore}%)</span>;
      default:
        return <span className="badge badge-confidence-low">Low Confidence ({hiddenInterest.confidenceScore}%)</span>;
    }
  };

  return (
    <div className="hidden-interest-hero">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
        <div className="hidden-badge">
          <Sparkles size={13} />
          <span>HIDDEN INTEREST DISCOVERED</span>
        </div>
        <div>{getConfidenceBadge()}</div>
      </div>

      <h2 className="hidden-title">{hiddenInterest.inferredInterest}</h2>

      <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '18px', maxWidth: '850px' }}>
        {hiddenInterest.evidenceSummary}
      </p>

      {/* Contributing Topics Chain */}
      <div style={{ marginBottom: '18px' }}>
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '8px' }}>
          Synthesized Across {hiddenInterest.evidenceCount} Interaction Signals:
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {hiddenInterest.contributingTopics.map((topic, i) => (
            <React.Fragment key={i}>
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-pill)',
                  padding: '5px 12px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Layers size={12} color="var(--accent-primary)" />
                <span>{topic}</span>
              </div>
              {i < hiddenInterest.contributingTopics.length - 1 && (
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>+</span>
              )}
            </React.Fragment>
          ))}
          <ArrowRight size={14} color="var(--accent-cyan)" />
          <div
            style={{
              background: 'var(--accent-gradient)',
              borderRadius: 'var(--radius-pill)',
              padding: '5px 14px',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'white',
              boxShadow: 'var(--shadow-glow)',
            }}
          >
            {hiddenInterest.inferredInterest}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '12px',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <Sparkles size={12} />
        <span>{hiddenInterest.disclaimer}</span>
      </div>
    </div>
  );
};
