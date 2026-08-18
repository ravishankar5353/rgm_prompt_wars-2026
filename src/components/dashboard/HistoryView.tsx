import React, { useState, useMemo } from 'react';
import { Search, Filter, History, Zap, Calendar, Sparkles, Tag, ArrowUpDown, X, SlidersHorizontal } from 'lucide-react';
import { useTechReel } from '../../context/TechReelContext';
import { AnalysisResult } from '../../types/analysis';

export const HistoryView: React.FC = () => {
  const { analysisHistory, setActiveTab } = useTechReel();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');
  const [confidenceFilter, setConfidenceFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'confidence'>('newest');

  const filteredHistory = useMemo(() => {
    let result = [...analysisHistory];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.hiddenInterest.inferredInterest.toLowerCase().includes(q) ||
          item.primaryRecommendation.title.toLowerCase().includes(q) ||
          item.primaryRecommendation.category.toLowerCase().includes(q) ||
          item.inputReelTitles.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (categoryFilter !== 'ALL') {
      result = result.filter((item) => item.primaryRecommendation.category === categoryFilter);
    }

    if (difficultyFilter !== 'ALL') {
      result = result.filter((item) => item.primaryRecommendation.difficulty === difficultyFilter);
    }

    if (confidenceFilter !== 'ALL') {
      result = result.filter((item) => item.hiddenInterest.confidence === confidenceFilter);
    }

    result.sort((a, b) => {
      if (sortBy === 'newest') return b.timestamp - a.timestamp;
      if (sortBy === 'oldest') return a.timestamp - b.timestamp;
      if (sortBy === 'confidence') return b.hiddenInterest.confidenceScore - a.hiddenInterest.confidenceScore;
      return 0;
    });

    return result;
  }, [analysisHistory, searchQuery, categoryFilter, difficultyFilter, confidenceFilter, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    categoryFilter !== 'ALL' ||
    difficultyFilter !== 'ALL' ||
    confidenceFilter !== 'ALL' ||
    sortBy !== 'newest';

  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('ALL');
    setDifficultyFilter('ALL');
    setConfidenceFilter('ALL');
    setSortBy('newest');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Search & Filter Bar */}
      <div
        className="glass-card"
        style={{
          padding: '14px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
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
            <Search size={14} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search past analyses, inferred interests, recommendations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.82rem',
                width: '100%',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}
              >
                <X size={13} />
              </button>
            )}
          </div>

          <select
            className="form-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ padding: '6px 10px', fontSize: '0.78rem' }}
          >
            <option value="ALL">All Categories</option>
            <option value="AI">AI</option>
            <option value="HLD">HLD</option>
            <option value="DSA">DSA</option>
            <option value="Cloud">Cloud</option>
            <option value="Hardware">Hardware</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Career">Career</option>
          </select>

          <select
            className="form-select"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            style={{ padding: '6px 10px', fontSize: '0.78rem' }}
          >
            <option value="ALL">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <select
            className="form-select"
            value={confidenceFilter}
            onChange={(e) => setConfidenceFilter(e.target.value)}
            style={{ padding: '6px 10px', fontSize: '0.78rem' }}
          >
            <option value="ALL">All Confidences</option>
            <option value="High">High Confidence</option>
            <option value="Medium">Medium Confidence</option>
            <option value="Low">Low Confidence</option>
          </select>

          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{ padding: '6px 10px', fontSize: '0.78rem' }}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="confidence">Highest Confidence</option>
          </select>

          {hasActiveFilters && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={resetFilters}
              style={{ fontSize: '0.75rem', color: 'var(--accent-rose)', padding: '4px 8px' }}
            >
              Reset
            </button>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          <span>Showing {filteredHistory.length} of {analysisHistory.length} saved sessions</span>
          <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>🔒 Protected with Supabase RLS</span>
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
                    {item.hiddenInterest.confidenceScore}% Confidence ({item.hiddenInterest.confidence})
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
                  [{item.primaryRecommendation.category}] {item.primaryRecommendation.title} ({item.primaryRecommendation.difficulty})
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
export default HistoryView;
