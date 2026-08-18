import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { WhyThisWhyNot } from '../../types/analysis';

export const WhyThisWhyNotCard: React.FC<{ whyThisWhyNot: WhyThisWhyNot }> = ({ whyThisWhyNot }) => {
  return (
    <div style={{ marginTop: '16px' }}>
      <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '8px' }}>
        DECISION EXPLAINABILITY & HYPE FILTERING:
      </div>

      <div className="why-grid">
        <div className="why-card positive">
          <div className="why-card-title">
            <CheckCircle2 size={15} />
            <span>Why this recommendation?</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
            {whyThisWhyNot.whyThis}
          </p>
        </div>

        <div className="why-card negative">
          <div className="why-card-title">
            <XCircle size={15} />
            <span>Why not repeat keywords?</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
            {whyThisWhyNot.whyNotKeywordRepeat}
          </p>
        </div>

        <div className="why-card hype">
          <div className="why-card-title">
            <AlertTriangle size={15} />
            <span>Why not generic hype?</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
            {whyThisWhyNot.whyNotGenericHype}
          </p>
        </div>
      </div>
    </div>
  );
};
