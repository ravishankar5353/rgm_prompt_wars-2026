import React from 'react';
import { History, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { AnalysisResult } from '../../types/analysis';

export const InterestEvolutionTimeline: React.FC<{ history: AnalysisResult[] }> = ({ history }) => {
  if (history.length < 2) {
    return (
      <div
        className="glass-card"
        style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}
      >
        <TrendingUp size={24} style={{ margin: '0 auto 8px', color: 'var(--accent-primary)' }} />
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Interest Evolution Progression
        </h4>
        <p style={{ fontSize: '0.8rem' }}>
          Not enough data yet. Complete at least 2 analyses to observe how your tech interests evolve over time.
        </p>
      </div>
    );
  }

  const chronological = [...history].reverse();
  const earlier = chronological[0];
  const current = chronological[chronological.length - 1];
  const emerging = current.alternativeRecommendations[0]?.title || 'Distributed Systems & Cloud';

  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
        <TrendingUp size={18} color="var(--accent-cyan)" />
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          INTEREST EVOLUTION PROGRESSION
        </h3>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          position: 'relative',
        }}
      >
        {/* Earlier Interest */}
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
          }}
        >
          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '6px' }}>
            Earlier Inferred Baseline:
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#94a3b8' }}>
            {earlier.hiddenInterest.inferredInterest}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {new Date(earlier.timestamp).toLocaleDateString()}
          </div>
        </div>

        {/* Current Interest */}
        <div
          style={{
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            boxShadow: 'var(--shadow-glow)',
          }}
        >
          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#c7d2fe', fontWeight: 800, marginBottom: '6px' }}>
            Current Dominant Focus:
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
            {current.hiddenInterest.inferredInterest}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#a5b4fc', marginTop: '4px' }}>
            Confidence: {current.hiddenInterest.confidenceScore}%
          </div>
        </div>

        {/* Emerging Interest */}
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
          }}
        >
          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#6ee7b7', fontWeight: 700, marginBottom: '6px' }}>
            Emerging Future Horizon:
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#a7f3d0' }}>
            {emerging}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#6ee7b7', marginTop: '4px' }}>
            Explore Mode Projection
          </div>
        </div>
      </div>
    </div>
  );
};
