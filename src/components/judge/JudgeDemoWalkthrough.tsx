import React, { useState } from 'react';
import {
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Scale,
  GitFork,
  Dna,
  FileCheck,
  RotateCcw,
} from 'lucide-react';
import { useTechReel } from '../../context/TechReelContext';
import { HiddenInterestCard } from '../analysis/HiddenInterestCard';
import { RequiredOutputCard } from '../analysis/RequiredOutputCard';
import { RecommendationCard } from '../analysis/RecommendationCard';
import { EvidenceTrail } from '../analysis/EvidenceTrail';
import { SemanticVsKeywordBenchmark } from '../analysis/SemanticVsKeywordBenchmark';
import { InteractiveInterestGraph } from '../graph/InteractiveInterestGraph';
import { TopicSaturationAlert } from '../analysis/TopicSaturationAlert';

export const JudgeDemoWalkthrough: React.FC = () => {
  const {
    currentAnalysis,
    loadScenario,
    runAnalysis,
    isAnalyzing,
    triggerJudgeDemo,
    setActiveTab,
  } = useTechReel();

  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    { title: '1. Official Trap Inputs', desc: '4 Cross-Discipline Reels Loaded' },
    { title: '2. Hidden Interest', desc: 'Synthesized Domain Discovery' },
    { title: '3. Recommendation & DNA', desc: 'HLD System Design Output' },
    { title: '4. Semantic Benchmark', desc: 'AI vs Keyword Comparison' },
    { title: '5. Interest Graph', desc: 'Hierarchical Structure' },
  ];

  const handleResetDemo = () => {
    triggerJudgeDemo();
    setActiveStep(0);
  };

  if (!currentAnalysis) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '50px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <Zap size={36} color="var(--accent-amber)" style={{ margin: '0 auto 12px' }} />
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>
          Official Judge Demonstration Ready
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Run the official 60-second competition demonstration to verify semantic cross-reel reasoning on the Java/SWE/Interview/Laptop trap.
        </p>
        <button className="judge-demo-btn" style={{ margin: '0 auto' }} onClick={triggerJudgeDemo}>
          <Zap size={16} fill="currentColor" />
          <span>Launch 60s Judge Demo</span>
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1050px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Demo Header Bar */}
      <div
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(99, 102, 241, 0.12) 100%), var(--bg-glass-card)',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: 'white',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: 'var(--radius-pill)',
              }}
            >
              🏆 COMPETITION EVALUATION
            </span>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Official Judge Demonstration Mode
            </h2>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Demonstrating semantic cross-reel reasoning on the official trap scenario.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary btn-sm" onClick={handleResetDemo}>
            <RotateCcw size={14} />
            <span>Re-run Trap Demo</span>
          </button>
        </div>
      </div>

      {/* Step Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {steps.map((s, idx) => (
          <button
            key={idx}
            className={`btn btn-sm ${activeStep === idx ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-pill)', fontSize: '0.78rem', whiteSpace: 'nowrap' }}
            onClick={() => setActiveStep(idx)}
          >
            <span>{s.title}</span>
          </button>
        ))}
      </div>

      {/* Step 0: All in One Overview */}
      {activeStep === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <HiddenInterestCard hiddenInterest={currentAnalysis.hiddenInterest} />
          <RequiredOutputCard output={currentAnalysis.requiredOutput} />
          <SemanticVsKeywordBenchmark benchmark={currentAnalysis.benchmarkComparison} />
          <RecommendationCard
            primaryRec={currentAnalysis.primaryRecommendation}
            alternativeRecs={currentAnalysis.alternativeRecommendations}
          />
          <EvidenceTrail evidenceTrail={currentAnalysis.evidenceTrail} />
          <InteractiveInterestGraph graphData={currentAnalysis.interestGraph} />
        </div>
      )}

      {activeStep === 1 && (
        <HiddenInterestCard hiddenInterest={currentAnalysis.hiddenInterest} />
      )}

      {activeStep === 2 && (
        <RecommendationCard
          primaryRec={currentAnalysis.primaryRecommendation}
          alternativeRecs={currentAnalysis.alternativeRecommendations}
        />
      )}

      {activeStep === 3 && (
        <SemanticVsKeywordBenchmark benchmark={currentAnalysis.benchmarkComparison} />
      )}

      {activeStep === 4 && (
        <InteractiveInterestGraph graphData={currentAnalysis.interestGraph} />
      )}
    </div>
  );
};
