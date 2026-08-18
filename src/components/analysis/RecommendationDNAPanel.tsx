import React from 'react';
import { Dna, ShieldCheck, AlertCircle, Info } from 'lucide-react';
import { RecommendationDNA } from '../../types/analysis';

export const RecommendationDNAPanel: React.FC<{ dna: RecommendationDNA }> = ({ dna }) => {
  const getHypeColor = (risk: string) => {
    switch (risk) {
      case 'High': return '#f87171';
      case 'Medium': return '#fbbf24';
      default: return '#34d399';
    }
  };

  return (
    <div
      className="glass-card"
      style={{
        padding: '20px',
        background: 'rgba(15, 23, 42, 0.65)',
        border: '1px solid var(--border-glass)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
          <Dna size={16} color="var(--accent-cyan)" />
          <span>RECOMMENDATION DNA</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          <Info size={12} />
          <span>Explainable AI-estimated signals</span>
        </div>
      </div>

      <div className="dna-grid">
        <div className="dna-item">
          <div className="dna-label">
            <span>Interest Match</span>
            <strong style={{ color: '#67e8f9' }}>{dna.interestMatch}%</strong>
          </div>
          <div className="dna-bar-bg">
            <div className="dna-bar-fill" style={{ width: `${dna.interestMatch}%`, background: 'var(--accent-gradient-cyan)' }} />
          </div>
        </div>

        <div className="dna-item">
          <div className="dna-label">
            <span>Context Match</span>
            <strong style={{ color: '#818cf8' }}>{dna.contextMatch}%</strong>
          </div>
          <div className="dna-bar-bg">
            <div className="dna-bar-fill" style={{ width: `${dna.contextMatch}%`, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }} />
          </div>
        </div>

        <div className="dna-item">
          <div className="dna-label">
            <span>Novelty</span>
            <strong style={{ color: '#c084fc' }}>{dna.novelty}%</strong>
          </div>
          <div className="dna-bar-bg">
            <div className="dna-bar-fill" style={{ width: `${dna.novelty}%`, background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }} />
          </div>
        </div>

        <div className="dna-item">
          <div className="dna-label">
            <span>Learning Value</span>
            <strong style={{ color: '#34d399' }}>{dna.learningValue}%</strong>
          </div>
          <div className="dna-bar-bg">
            <div className="dna-bar-fill" style={{ width: `${dna.learningValue}%`, background: 'linear-gradient(135deg, #10b981, #06b6d4)' }} />
          </div>
        </div>

        <div className="dna-item">
          <div className="dna-label">
            <span>Difficulty Fit</span>
            <strong style={{ color: '#fbbf24' }}>{dna.difficultyFit}%</strong>
          </div>
          <div className="dna-bar-bg">
            <div className="dna-bar-fill" style={{ width: `${dna.difficultyFit}%`, background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }} />
          </div>
        </div>

        <div className="dna-item">
          <div className="dna-label">
            <span>Hype Risk</span>
            <strong style={{ color: getHypeColor(dna.hypeRisk) }}>{dna.hypeRisk}</strong>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            {dna.hypeRisk === 'Low' ? '✅ Deep architectural engineering' : '⚠️ Potential generic hype'}
          </div>
        </div>
      </div>
    </div>
  );
};
