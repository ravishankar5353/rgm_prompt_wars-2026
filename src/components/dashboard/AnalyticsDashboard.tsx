import React from 'react';
import {
  BarChart3,
  PieChart,
  Activity,
  Layers,
  ThumbsUp,
  ThumbsDown,
  Target,
  Compass,
  Zap,
  TrendingUp,
} from 'lucide-react';
import { useTechReel } from '../../context/TechReelContext';
import { InterestEvolutionTimeline } from './InterestEvolutionTimeline';

export const AnalyticsDashboard: React.FC = () => {
  const {
    reels,
    currentAnalysis,
    analysisHistory,
    feedbackList,
    focusMode,
  } = useTechReel();

  // Category distribution
  const categoryCounts: Record<string, number> = {};
  reels.forEach((r) => {
    categoryCounts[r.category] = (categoryCounts[r.category] || 0) + 1;
  });

  const usefulCount = feedbackList.filter((f) => f.feedbackType === 'useful').length;
  const notRelevantCount = feedbackList.filter((f) => f.feedbackType === 'not_relevant').length;
  const tryAnotherCount = feedbackList.filter((f) => f.feedbackType === 'try_another').length;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              TOTAL REELS ANALYZED
            </span>
            <Layers size={18} color="var(--accent-primary)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {reels.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Across {Object.keys(categoryCounts).length} unique categories
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              DETECTED CONFIDENCE
            </span>
            <Activity size={18} color="var(--accent-cyan)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399' }}>
            {currentAnalysis ? `${currentAnalysis.hiddenInterest.confidenceScore}%` : 'N/A'}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {currentAnalysis ? `${currentAnalysis.hiddenInterest.confidence} Confidence Level` : 'No analysis run'}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              RECOMMENDATION ACCEPTANCE
            </span>
            <ThumbsUp size={18} color="var(--accent-emerald)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {feedbackList.length > 0
              ? `${Math.round((usefulCount / feedbackList.length) * 100)}%`
              : '100%'}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {feedbackList.length} feedback submissions recorded
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              ACTIVE STRATEGY
            </span>
            <Compass size={18} color="var(--accent-amber)" />
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'capitalize' }}>
            {focusMode} Mode
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {focusMode === 'focus' ? 'Deep Context Alignment' : 'Novelty & Horizon Discovery'}
          </div>
        </div>
      </div>

      {/* Category Breakdown & Feedback Distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Category breakdown */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <BarChart3 size={18} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              REEL CATEGORY DISTRIBUTION
            </h3>
          </div>

          {Object.keys(categoryCounts).length === 0 ? (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '30px 0' }}>
              Not enough data yet. Add reels to view category distribution.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {Object.entries(categoryCounts).map(([cat, count]) => {
                const pct = Math.round((count / reels.length) * 100);
                return (
                  <div key={cat}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{cat}</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{count} reels ({pct}%)</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '99px' }}>
                      <div
                        style={{
                          width: `${pct}%`,
                          height: '100%',
                          background: 'var(--accent-gradient)',
                          borderRadius: '99px',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Feedback Breakdown */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <PieChart size={18} color="var(--accent-emerald)" />
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              FEEDBACK DISTRIBUTION
            </h3>
          </div>

          {feedbackList.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '30px 0' }}>
              Not enough data yet. Provide feedback on recommendations to populate metrics.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <span style={{ color: '#34d399', fontWeight: 600 }}>Useful</span>
                  <span>{usefulCount}</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '99px' }}>
                  <div style={{ width: `${(usefulCount / feedbackList.length) * 100}%`, height: '100%', background: 'var(--accent-emerald)', borderRadius: '99px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <span style={{ color: '#f87171', fontWeight: 600 }}>Not Relevant</span>
                  <span>{notRelevantCount}</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '99px' }}>
                  <div style={{ width: `${(notRelevantCount / feedbackList.length) * 100}%`, height: '100%', background: 'var(--accent-rose)', borderRadius: '99px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <span style={{ color: '#fbbf24', fontWeight: 600 }}>Try Another</span>
                  <span>{tryAnotherCount}</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '99px' }}>
                  <div style={{ width: `${(tryAnotherCount / feedbackList.length) * 100}%`, height: '100%', background: 'var(--accent-amber)', borderRadius: '99px' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interest Evolution Progression */}
      <InterestEvolutionTimeline history={analysisHistory} />
    </div>
  );
};
