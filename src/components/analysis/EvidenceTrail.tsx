import React from 'react';
import { Eye, Network, GitMerge, Check, Layers } from 'lucide-react';
import { EvidenceItem } from '../../types/analysis';

export const EvidenceTrail: React.FC<{ evidenceTrail: EvidenceItem[] }> = ({ evidenceTrail }) => {
  return (
    <div
      className="glass-card"
      style={{
        padding: '20px',
        border: '1px solid var(--border-glass)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <Network size={16} color="var(--accent-primary)" />
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          WHY AI THINKS THIS (EVIDENCE TRAIL)
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {evidenceTrail.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(0, 0, 0, 0.25)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'rgba(99, 102, 241, 0.15)',
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.75rem',
                flexShrink: 0,
              }}
            >
              {idx + 1}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                  {item.reelTitle}
                </strong>
                <span className="badge badge-secondary" style={{ fontSize: '0.68rem' }}>
                  {item.category}
                </span>
                <span
                  style={{
                    marginLeft: 'auto',
                    fontSize: '0.72rem',
                    color: 'var(--accent-cyan)',
                    fontWeight: 600,
                  }}
                >
                  Signal Weight: {item.weight}/10
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                <span style={{ color: '#c7d2fe', fontWeight: 600 }}>{item.signalType}: </span>
                {item.contribution}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
