import React, { useState } from 'react';
import { FlaskConical, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useTechReel } from '../../context/TechReelContext';
import { WHAT_IF_OPTIONS, WhatIfSimulator as SimulatorService, WhatIfScenarioOption } from '../../services/whatIfSimulator';

export const WhatIfSimulator: React.FC = () => {
  const { currentAnalysis, applyWhatIfResult, setActiveTab } = useTechReel();
  const [selectedOption, setSelectedOption] = useState<WhatIfScenarioOption>(WHAT_IF_OPTIONS[0]);
  const [isSimulated, setIsSimulated] = useState(false);

  const handleRunSimulation = (option: WhatIfScenarioOption) => {
    setSelectedOption(option);
    const result = SimulatorService.simulateScenario(currentAnalysis, option.id);
    applyWhatIfResult(result);
    setIsSimulated(true);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Header Banner */}
      <div
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%), var(--bg-glass-card)',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          padding: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <FlaskConical size={22} color="var(--accent-secondary)" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            WHAT-IF PREDICTIVE SIMULATOR
          </h2>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '800px', lineHeight: 1.5 }}>
          Test how your interest graph, inferred domain, and recommendations would transform if your scrolling behavior pivoted toward a new technical horizon.
        </p>
        <div style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', marginTop: '8px', fontWeight: 600 }}>
          ⚠️ Simulation Mode: Allows you to preview predictive models without modifying your live active profile.
        </div>
      </div>

      {/* Scenario Options Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {WHAT_IF_OPTIONS.map((opt) => (
          <div
            key={opt.id}
            className="glass-card"
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              border: selectedOption.id === opt.id && isSimulated
                ? '1px solid var(--accent-cyan)'
                : '1px solid var(--border-glass)',
              background: selectedOption.id === opt.id && isSimulated
                ? 'rgba(6, 182, 212, 0.08)'
                : 'var(--bg-glass-card)',
              cursor: 'pointer',
            }}
            onClick={() => handleRunSimulation(opt)}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem' }}>
                <span>{opt.icon}</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {opt.name}
                </span>
              </div>
              <span className="badge badge-ai" style={{ fontSize: '0.7rem' }}>
                {opt.category}
              </span>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {opt.description}
            </p>

            <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '8px 10px', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', color: '#67e8f9' }}>
              ⚡ Shift: {opt.confidenceShift}
            </div>

            <button
              className="btn btn-secondary btn-sm"
              style={{ marginTop: 'auto', width: '100%' }}
              onClick={(e) => {
                e.stopPropagation();
                handleRunSimulation(opt);
              }}
            >
              <Zap size={14} />
              <span>Simulate Shift</span>
            </button>
          </div>
        ))}
      </div>

      {/* Simulation Result Preview */}
      {isSimulated && (
        <div
          className="glass-card"
          style={{
            padding: '24px',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
            <span
              style={{
                background: 'var(--accent-gradient-cyan)',
                color: 'black',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
              }}
            >
              SIMULATED PROJECTION ACTIVE
            </span>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setActiveTab('graph')}
            >
              <span>View In Interactive Graph</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Projected Interest: {selectedOption.simulatedInterest}
          </h3>

          <div
            style={{
              background: 'rgba(0, 0, 0, 0.35)',
              padding: '14px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '16px',
            }}
          >
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#34d399', fontWeight: 700, marginBottom: '2px' }}>
              Projected Breakthrough Recommendation:
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
              {selectedOption.simulatedRecommendation}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Acquired Concepts:
            </span>
            {selectedOption.keyConcepts.map((k, i) => (
              <span key={i} className="badge" style={{ background: 'rgba(255, 255, 255, 0.06)', fontSize: '0.72rem' }}>
                {k}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
