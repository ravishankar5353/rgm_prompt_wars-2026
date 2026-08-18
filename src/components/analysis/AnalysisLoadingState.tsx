import React from 'react';
import { Sparkles, Loader2, Cpu, CheckCircle2 } from 'lucide-react';
import { useTechReel } from '../../context/TechReelContext';

const STEPS = [
  'Understanding your Reels & watch signals...',
  'Extracting cross-reel semantic patterns...',
  'Inferring broader hidden interests & context...',
  'Checking topic saturation & repetition fatigue...',
  'Filtering low-value hype & superficial listicles...',
  'Matching your next high-leverage technology breakthrough...',
];

export const AnalysisLoadingState: React.FC = () => {
  const { analysisStep } = useTechReel();

  return (
    <div
      className="glass-card"
      style={{
        maxWidth: '680px',
        margin: '60px auto',
        padding: '36px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.15) 100%), var(--bg-glass-card)',
        border: '1px solid rgba(99, 102, 241, 0.3)',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'var(--accent-gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          boxShadow: 'var(--shadow-glow)',
          color: 'white',
        }}
      >
        <Loader2 size={32} className="animate-spin" />
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
        Gemini AI Agentic Reasoning in Progress
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '28px' }}>
        Analyzing cross-reel context, semantic depth, and career alignment...
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left', maxWidth: '480px', margin: '0 auto' }}>
        {STEPS.map((stepText, idx) => {
          const isDone = idx < analysisStep;
          const isCurrent = idx === analysisStep;
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                background: isCurrent
                  ? 'rgba(99, 102, 241, 0.2)'
                  : isDone
                  ? 'rgba(16, 185, 129, 0.08)'
                  : 'transparent',
                border: '1px solid',
                borderColor: isCurrent
                  ? 'rgba(99, 102, 241, 0.4)'
                  : isDone
                  ? 'rgba(16, 185, 129, 0.2)'
                  : 'transparent',
                transition: 'all 0.3s ease',
              }}
            >
              {isDone ? (
                <CheckCircle2 size={16} color="var(--accent-emerald)" />
              ) : isCurrent ? (
                <Loader2 size={16} className="animate-spin" color="var(--accent-primary)" />
              ) : (
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    border: '1px solid var(--text-muted)',
                  }}
                />
              )}
              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: isCurrent ? 700 : 500,
                  color: isCurrent
                    ? 'var(--text-primary)'
                    : isDone
                    ? 'var(--text-secondary)'
                    : 'var(--text-muted)',
                }}
              >
                {stepText}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
