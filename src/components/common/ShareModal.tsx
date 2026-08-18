import React, { useState } from 'react';
import { Share2, Copy, Check, Sparkles, X } from 'lucide-react';
import { useTechReel } from '../../context/TechReelContext';

export const ShareModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { currentAnalysis } = useTechReel();
  const [copied, setCopied] = useState(false);

  const getShareText = () => {
    if (!currentAnalysis) {
      return `Check out TechReel AI — Turn your scrolling into smarter technology discovery!\nhttps://techreel.ai`;
    }
    return `🎯 TechReel AI Insight:
Detected Interest: ${currentAnalysis.hiddenInterest.inferredInterest} (${currentAnalysis.hiddenInterest.confidenceScore}% confidence)
Recommended Tech: [${currentAnalysis.primaryRecommendation.category}] ${currentAnalysis.primaryRecommendation.title}
Key Concepts: ${currentAnalysis.primaryRecommendation.keyConcepts.join(', ')}

Elevating short-form scrolling into real engineering skills: https://techreel.ai`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getShareText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}>
            <Share2 size={16} /> Share Sanitized Insight
          </h3>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
            Share your inferred tech interest and recommendations without exposing your personal scrolling history or private reel titles.
          </p>

          <div
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              fontFamily: 'monospace',
              fontSize: '0.82rem',
              whiteSpace: 'pre-wrap',
              color: 'var(--text-primary)',
              lineHeight: 1.5,
              marginBottom: '16px',
            }}
          >
            {getShareText()}
          </div>

          <div
            style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 12px',
              fontSize: '0.78rem',
              color: '#a7f3d0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Sparkles size={14} />
            <span>Privacy Guaranteed: Individual watch data remains 100% private to you.</span>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleCopy}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
