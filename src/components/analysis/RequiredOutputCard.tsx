import React from 'react';
import { FileCheck, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import { RequiredOutputSpecification } from '../../types/analysis';

export const RequiredOutputCard: React.FC<{ output: RequiredOutputSpecification }> = ({ output }) => {
  const getCategoryClass = (cat: string) => {
    switch (cat) {
      case 'AI': return 'badge-ai';
      case 'DSA': return 'badge-dsa';
      case 'HLD': return 'badge-hld';
      case 'Cloud': return 'badge-cloud';
      case 'Hardware': return 'badge-hardware';
      case 'Cybersecurity': return 'badge-cyber';
      case 'Career': return 'badge-career';
      default: return 'badge-secondary';
    }
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
      className="glass-card"
      style={{
        border: '1px solid rgba(16, 185, 129, 0.4)',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.06) 100%), var(--bg-glass-card)',
        padding: '22px 24px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.92rem', color: '#6ee7b7' }}>
          <FileCheck size={18} />
          <span>OFFICIAL PROMPTWARS SPECIFICATION OUTPUT</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className={`badge ${getCategoryClass(output.category)}`}>CATEGORY: {output.category}</span>
          <span
            className="badge"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              color: getDifficultyColor(output.difficulty),
              border: `1px solid ${getDifficultyColor(output.difficulty)}40`,
            }}
          >
            DIFFICULTY: {output.difficulty}
          </span>
          <span
            className="badge"
            style={{
              background: output.confidence === 'High' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
              color: output.confidence === 'High' ? '#34d399' : '#fbbf24',
            }}
          >
            CONFIDENCE: {output.confidence}
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', fontSize: '0.86rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontWeight: 700 }}>
            CURRENT REEL REFERENCE:
          </span>
          <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
            {output.currentReelReference}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontWeight: 700 }}>
            INTEREST DETECTED:
          </span>
          <div style={{ color: '#a5b4fc', fontWeight: 700, fontSize: '0.95rem' }}>
            {output.interestDetected}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontWeight: 700 }}>
            WHY (EVIDENCE):
          </span>
          <div style={{ color: 'var(--text-secondary)', lineHeight: 1.45 }}>
            {output.whyEvidence}
          </div>
        </div>

        <div
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 16px',
            border: '1px solid var(--border-subtle)',
            marginTop: '4px',
          }}
        >
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#34d399', fontWeight: 800 }}>
            RECOMMENDED TECH REEL:
          </span>
          <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.05rem', margin: '4px 0 8px' }}>
            {output.recommendedTechReel}
          </div>

          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontWeight: 700 }}>
            WHY THIS RECOMMENDATION:
          </span>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.45, marginTop: '2px' }}>
            {output.whyThisRecommendation}
          </div>
        </div>
      </div>
    </div>
  );
};
