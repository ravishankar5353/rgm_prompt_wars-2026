import React from 'react';
import { Scale, CheckCircle2, XCircle, ArrowRight, Sparkles, AlertOctagon, TrendingUp } from 'lucide-react';
import { SemanticVsKeywordBenchmark as BenchmarkType } from '../../types/analysis';

export const SemanticVsKeywordBenchmark: React.FC<{ benchmark: BenchmarkType }> = ({ benchmark }) => {
  const { keywordApproach, agenticApproach } = benchmark;

  return (
    <div
      className="glass-card"
      style={{
        padding: '24px',
        border: '1px solid rgba(99, 102, 241, 0.35)',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(26, 35, 58, 0.8) 100%)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '1.05rem', color: '#ffffff' }}>
          <Scale size={20} color="var(--accent-cyan)" />
          <span>SEMANTIC CROSS-REEL AGENT VS TRADITIONAL KEYWORD SYSTEM</span>
        </div>
        <span className="badge badge-ai" style={{ fontSize: '0.75rem' }}>
          Official Competition Benchmark
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Shallow Keyword Matching System Card */}
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.04)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.9rem', color: '#f87171' }}>
              <XCircle size={16} />
              <span>TRADITIONAL KEYWORD MATCHING</span>
            </div>
            <span className="badge badge-confidence-low">Shallow / Flawed</span>
          </div>

          <div>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>
              Input Signals Detected:
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              {keywordApproach.inputSignals.join(' + ')}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>
              Naive Keyword Extraction:
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fca5a5' }}>
              {keywordApproach.shallowInference}
            </div>
          </div>

          <div
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '12px',
              border: '1px solid rgba(239, 68, 68, 0.2)',
            }}
          >
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#f87171', fontWeight: 700, marginBottom: '2px' }}>
              Predictable Output:
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>
              {keywordApproach.genericRecommendation}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>
              Critical Flaw:
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {keywordApproach.flaw}
            </p>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Novelty: <strong>{keywordApproach.noveltyScore}%</strong></span>
            <span style={{ color: '#f87171' }}>Hype Risk: <strong>{keywordApproach.hypeRisk}</strong></span>
          </div>
        </div>

        {/* TechReel AI Agent Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(16, 185, 129, 0.06) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: 'var(--shadow-glow)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.9rem', color: '#34d399' }}>
              <CheckCircle2 size={16} />
              <span>TECHREEL AI AGENT (OUR INNOVATION)</span>
            </div>
            <span className="badge badge-confidence-high">Semantic Breakthrough</span>
          </div>

          <div>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>
              Cross-Reel Signal Synthesis:
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              {agenticApproach.inputSignals.join(' + ')}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>
              Inferred Hidden Domain:
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#a7f3d0' }}>
              {agenticApproach.semanticInference}
            </div>
          </div>

          <div
            style={{
              background: 'rgba(0, 0, 0, 0.35)',
              borderRadius: 'var(--radius-md)',
              padding: '12px',
              border: '1px solid rgba(16, 185, 129, 0.3)',
            }}
          >
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#34d399', fontWeight: 700, marginBottom: '2px' }}>
              Intelligent Technology Discovery:
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff' }}>
              {agenticApproach.intelligentRecommendation}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>
              Innovation Breakthrough:
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {agenticApproach.breakthrough}
            </p>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Novelty: <strong style={{ color: '#34d399' }}>{agenticApproach.noveltyScore}%</strong></span>
            <span style={{ color: '#34d399' }}>Hype Risk: <strong>{agenticApproach.hypeRisk}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
