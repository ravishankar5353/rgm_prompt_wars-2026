import React, { useState } from 'react';
import { Search, Filter, History, Zap, Calendar, Sparkles, Tag } from 'lucide-react';
import { useTechReel } from '../../context/TechReelContext';
import { AnalysisResult } from '../../types/analysis';

export const HistoryView: React.FC = () => {
  const { analysisHistory, setActiveTab } = useTechReel();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');

  const filteredHistory = analysisHistory.filter((item) => {
    const matchesSearch =
      searchQuery === '' ||
      item.hiddenInterest.inferredInterest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.primaryRecommendation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.inputReelTitles.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      categoryFilter === 'ALL' || item.primaryRecommendation.category === categoryFilter;

    const matchesDifficulty =
      difficultyFilter === 'ALL' || item.primaryRecommendation.difficulty === difficultyFilter;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Search & Filter Bar */}
      <div
        className="glass-card"
        style={{
          padding: '16px 20px',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: '220px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '6px 12px',
          }}
        >
          <Search size={15} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search past analyses, recommendations, or reel titles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              width: '100%',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <select
            className="form-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ padding: '6px 10px', fontSize: '0.8rem' }}
          >
            <option value="ALL">All Categories</option>
            <option value="AI">AI</option>
            <option value="HLD">HLD</option>
            <option value="DSA">DSA</option>
            <option value="Cloud">Cloud</option>
            <option value="Hardware">Hardware</option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>

          <select
            className="form-select"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            style={{ padding: '6px 10px', fontSize: '0.8rem' }}
          >
            <option value="ALL">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* History Items */}
      {filteredHistory.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <History size={36} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
            No Analysis History Found
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto 16px' }}>
            Run an analysis or try different search filters to review past technology discovery sessions.
          </p>
          <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('analyze')}>
            Run New Analysis
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="glass-card"
              style={{
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} color="var(--accent-primary)" />
                  <strong style={{ fontSize: '0.98rem', color: 'var(--text-primary)' }}>
                    {item.hiddenInterest.inferredInterest}
                  </strong>
                  <span className="badge badge-confidence-high" style={{ fontSize: '0.72rem' }}>
                    {item.hiddenInterest.confidenceScore}% Confidence
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <Calendar size={13} />
                  <span>{new Date(item.timestamp).toLocaleString()}</span>
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.25)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 14px',
                }}
              >
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '2px' }}>
                  Recommended Tech Breakthrough:
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#c7d2fe' }}>
                  [{item.primaryRecommendation.category}] {item.primaryRecommendation.title}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {item.requiredOutput.whyThisRecommendation}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>Synthesized from {item.inputReelCount} reels: {item.inputReelTitles.slice(0, 3).join(', ')}...</span>
                <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                  Model: {item.aiModelUsed}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
