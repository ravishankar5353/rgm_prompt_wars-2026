import React from 'react';
import { AlertTriangle, Compass, ArrowRight } from 'lucide-react';
import { SaturationAlert } from '../../types/analysis';
import { useTechReel } from '../../context/TechReelContext';

export const TopicSaturationAlert: React.FC<{ alert: SaturationAlert }> = ({ alert }) => {
  const { setFocusMode, runAnalysis } = useTechReel();

  if (!alert.detected) return null;

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(239, 68, 68, 0.08) 100%)',
        border: '1px solid rgba(245, 158, 11, 0.4)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 20px',
        margin: '12px 0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <AlertTriangle size={18} color="var(--accent-amber)" />
        <strong style={{ fontSize: '0.92rem', color: '#fde68a' }}>
          Topic Saturation Detected ({alert.saturatedTopic})
        </strong>
      </div>

      <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '12px' }}>
        {alert.message}
      </p>

      {alert.adjacentExplorationTopics && alert.adjacentExplorationTopics.length > 0 && (
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>
            Recommended Adjacent Technology Horizons:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {alert.adjacentExplorationTopics.map((topic, i) => (
              <button
                key={i}
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setFocusMode('explore');
                  runAnalysis('explore');
                }}
                style={{
                  fontSize: '0.75rem',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                }}
              >
                <Compass size={12} />
                <span>{topic}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
