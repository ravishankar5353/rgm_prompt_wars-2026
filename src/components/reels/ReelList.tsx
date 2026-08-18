import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Plus,
  Trash2,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  FolderGit2,
  UploadCloud,
  Layers,
  Brain,
  Play,
  Search,
  Filter,
  ArrowUpDown,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import { useTechReel } from '../../context/TechReelContext';
import { ReelCard } from './ReelCard';
import { QuickAddBar } from './QuickAddBar';
import { ReelInputModal } from './ReelInputModal';
import { ReelUploadModal } from './ReelUploadModal';
import { ReelDetailView } from './ReelDetailView';
import { ReelInteraction, ReelFormData, ReelCategory, InteractionType } from '../../types/reel';
import { REEL_CATEGORIES, INTERACTION_TYPES, PRESET_SCENARIOS } from '../../config/constants';

type SortOption = 'newest' | 'oldest' | 'watch-high' | 'watch-low' | 'title';

export const ReelList: React.FC = () => {
  const {
    reels,
    selectedReel,
    setSelectedReel,
    addReel,
    uploadReel,
    updateReel,
    deleteReel,
    reorderReels,
    loadScenario,
    clearReels,
    runAnalysis,
    isAnalyzing,
    setActiveTab,
  } = useTechReel();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingReel, setEditingReel] = useState<ReelInteraction | null>(null);

  // Advanced Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedInteraction, setSelectedInteraction] = useState<string>('ALL');
  const [watchFilter, setWatchFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [quickTagFilter, setQuickTagFilter] = useState<string>('ALL');

  const handleEdit = (reel: ReelInteraction) => {
    setEditingReel(reel);
    setIsModalOpen(true);
  };

  const handleSaveModal = (data: ReelFormData) => {
    if (editingReel) {
      updateReel(editingReel.id, data);
    } else {
      addReel(data);
    }
    setEditingReel(null);
  };

  const handleSaveUpload = (data: ReelFormData, autoOpenDetail?: boolean) => {
    const uploaded = uploadReel(data);
    if (autoOpenDetail) {
      setSelectedReel(uploaded);
    }
  };

  const handleRun = async () => {
    await runAnalysis();
    setActiveTab('interests');
  };

  // Filtered & Sorted Reels Computation
  const filteredReels = useMemo(() => {
    let result = [...reels];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.caption.toLowerCase().includes(q) ||
          (r.creatorName && r.creatorName.toLowerCase().includes(q)) ||
          (r.tags && r.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    // Category filter
    if (selectedCategory !== 'ALL') {
      result = result.filter((r) => r.category === selectedCategory);
    }

    // Interaction filter
    if (selectedInteraction !== 'ALL') {
      result = result.filter((r) => r.interactionType === selectedInteraction);
    }

    // Watch percentage filter
    if (watchFilter === 'high') {
      result = result.filter((r) => r.watchPercentage >= 80);
    } else if (watchFilter === 'medium') {
      result = result.filter((r) => r.watchPercentage >= 50 && r.watchPercentage < 80);
    } else if (watchFilter === 'low') {
      result = result.filter((r) => r.watchPercentage < 50);
    }

    // Quick tag pill filter
    if (quickTagFilter !== 'ALL') {
      if (quickTagFilter === 'saved-liked') {
        result = result.filter((r) => r.interactionType === 'Liked' || r.interactionType === 'Saved');
      } else if (quickTagFilter === 'high-retention') {
        result = result.filter((r) => r.watchPercentage >= 85);
      } else if (quickTagFilter === 'coding-swe') {
        result = result.filter(
          (r) => r.category === 'Coding' || r.category === 'Programming Meme' || r.category === 'Career'
        );
      } else if (quickTagFilter === 'ai-gadgets') {
        result = result.filter((r) => r.category === 'AI' || r.category === 'Gadgets');
      }
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'newest') return b.timestamp - a.timestamp;
      if (sortBy === 'oldest') return a.timestamp - b.timestamp;
      if (sortBy === 'watch-high') return b.watchPercentage - a.watchPercentage;
      if (sortBy === 'watch-low') return a.watchPercentage - b.watchPercentage;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

    return result;
  }, [reels, searchQuery, selectedCategory, selectedInteraction, watchFilter, quickTagFilter, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'ALL' ||
    selectedInteraction !== 'ALL' ||
    watchFilter !== 'ALL' ||
    quickTagFilter !== 'ALL' ||
    sortBy !== 'newest';

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedInteraction('ALL');
    setWatchFilter('ALL');
    setQuickTagFilter('ALL');
    setSortBy('newest');
  };

  // If a reel is selected for deep detail & feedback view
  if (selectedReel) {
    return (
      <ReelDetailView
        reel={selectedReel}
        onBack={() => setSelectedReel(null)}
        onAnalyze={() => {
          setSelectedReel(null);
          handleRun();
        }}
      />
    );
  }

  const isMinimumMet = reels.length >= 3;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Top Banner Status */}
      <div
        className="glass-card"
        style={{
          padding: '16px 20px',
          background: isMinimumMet
            ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(16, 185, 129, 0.08) 100%)'
            : 'rgba(245, 158, 11, 0.08)',
          border: `1px solid ${isMinimumMet ? 'rgba(99, 102, 241, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isMinimumMet ? (
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                color: 'var(--accent-emerald)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircle2 size={20} />
            </div>
          ) : (
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(245, 158, 11, 0.2)',
                color: '#fbbf24',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AlertTriangle size={20} />
            </div>
          )}

          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>
              {reels.length} Reel Interactions Added
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              {isMinimumMet
                ? 'Ready for Gemini cross-reel semantic inference.'
                : 'Add at least 3 Reels for a meaningful analysis.'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setIsUploadModalOpen(true)}
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.15))',
              border: '1px solid rgba(99,102,241,0.4)',
              color: '#c7d2fe',
              fontWeight: 700,
            }}
          >
            <UploadCloud size={14} />
            <span>Upload Reel Video</span>
          </button>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setEditingReel(null);
              setIsModalOpen(true);
            }}
          >
            <Plus size={14} />
            <span>Add Reel</span>
          </button>

          <button
            className="btn btn-primary"
            onClick={handleRun}
            disabled={!isMinimumMet || isAnalyzing}
            style={{
              padding: '10px 24px',
              fontWeight: 800,
              boxShadow: isMinimumMet ? '0 4px 20px rgba(99, 102, 241, 0.4)' : 'none',
              opacity: !isMinimumMet || isAnalyzing ? 0.6 : 1,
            }}
          >
            <Sparkles size={16} />
            <span>{isAnalyzing ? 'Analyzing Semantic Patterns...' : '🧠 ANALYZE MY SCROLLING'}</span>
          </button>
        </div>
      </div>

      {/* Quick Add Bar */}
      <QuickAddBar />

      {/* Interactive Filter, Search & Sorting Bar */}
      <div
        className="glass-card"
        style={{
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          background: 'rgba(15, 23, 42, 0.75)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Search Box */}
          <div
            style={{
              flex: 1,
              minWidth: '220px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 12px',
            }}
          >
            <Search size={14} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search reels by title, creator, caption, tags..."
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

          {/* Category Dropdown */}
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ padding: '6px 10px', fontSize: '0.78rem', minWidth: '130px' }}
          >
            <option value="ALL">All Categories</option>
            {REEL_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Sort By Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowUpDown size={13} color="var(--text-muted)" />
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              style={{ padding: '6px 10px', fontSize: '0.78rem', minWidth: '130px' }}
            >
              <option value="newest">Newest Added</option>
              <option value="oldest">Oldest Added</option>
              <option value="watch-high">Highest Watch %</option>
              <option value="watch-low">Lowest Watch %</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>

          {/* Toggle More Filters */}
          <button
            className={`btn btn-sm ${showFiltersPanel ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setShowFiltersPanel(!showFiltersPanel)}
            style={{ fontSize: '0.78rem', padding: '6px 10px' }}
            title="Toggle additional filters"
          >
            <SlidersHorizontal size={13} />
            <span>Filters</span>
          </button>

          {hasActiveFilters && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={clearAllFilters}
              style={{ fontSize: '0.75rem', color: 'var(--accent-rose)', padding: '4px 8px' }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Quick Filter Tag Pills */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>Quick:</span>
          {[
            { id: 'ALL', label: '⚡ All Reels' },
            { id: 'coding-swe', label: '💻 Coding & SWE' },
            { id: 'ai-gadgets', label: '🧠 AI & Hardware' },
            { id: 'high-retention', label: '🔥 85%+ Watched' },
            { id: 'saved-liked', label: '⭐ Liked / Saved' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setQuickTagFilter(pill.id)}
              style={{
                fontSize: '0.72rem',
                padding: '3px 10px',
                borderRadius: '999px',
                background:
                  quickTagFilter === pill.id
                    ? 'rgba(99,102,241,0.25)'
                    : 'rgba(255,255,255,0.04)',
                border: `1px solid ${
                  quickTagFilter === pill.id
                    ? 'rgba(99,102,241,0.5)'
                    : 'rgba(255,255,255,0.08)'
                }`,
                color: quickTagFilter === pill.id ? '#c7d2fe' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: quickTagFilter === pill.id ? 700 : 500,
                transition: 'all 0.2s ease',
              }}
            >
              {pill.label}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Showing {filteredReels.length} of {reels.length} reels
          </span>
        </div>

        {/* Expandable Advanced Filters Drawer */}
        {showFiltersPanel && (
          <div
            style={{
              paddingTop: '10px',
              borderTop: '1px solid var(--border-subtle)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
            }}
          >
            <div>
              <label className="form-label" style={{ fontSize: '0.72rem' }}>
                Interaction Type
              </label>
              <select
                className="form-select"
                value={selectedInteraction}
                onChange={(e) => setSelectedInteraction(e.target.value)}
                style={{ fontSize: '0.78rem', padding: '6px 8px' }}
              >
                <option value="ALL">All Interactions</option>
                {INTERACTION_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label" style={{ fontSize: '0.72rem' }}>
                Watch Completion
              </label>
              <select
                className="form-select"
                value={watchFilter}
                onChange={(e) => setWatchFilter(e.target.value)}
                style={{ fontSize: '0.78rem', padding: '6px 8px' }}
              >
                <option value="ALL">All Watch %</option>
                <option value="high">High (≥ 80%)</option>
                <option value="medium">Medium (50% - 79%)</option>
                <option value="low">Low (&lt; 50%)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Helper Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => loadScenario('official-trap')}
          style={{ fontSize: '0.78rem', borderRadius: 'var(--radius-pill)' }}
        >
          <FolderGit2 size={13} />
          <span>[ USE SAMPLE REELS ]</span>
        </button>

        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setIsUploadModalOpen(true)}
          style={{ fontSize: '0.78rem', color: '#a5b4fc' }}
        >
          <UploadCloud size={13} />
          <span>Upload Custom Video</span>
        </button>

        {reels.length > 0 && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={clearReels}
            style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--accent-rose)' }}
          >
            <Trash2 size={13} />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Reel Cards Grid */}
      {reels.length === 0 ? (
        <div
          className="glass-card"
          style={{ textAlign: 'center', padding: '60px 20px', borderStyle: 'dashed' }}
        >
          <Sparkles size={36} color="var(--accent-primary)" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px' }}>
            No Reel Interactions Yet
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 18px', lineHeight: 1.45 }}>
            To discover your technology trajectory, add 3 or more Reels, upload a video reel, or click <strong>[ USE SAMPLE REELS ]</strong> to load 4 pre-analyzed examples.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-sm" onClick={() => loadScenario('official-trap')}>
              Load Sample Reels
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <UploadCloud size={14} />
              <span>Upload Video Reel</span>
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setEditingReel(null);
                setIsModalOpen(true);
              }}
            >
              Add Custom Reel
            </button>
          </div>
        </div>
      ) : filteredReels.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '50px 20px' }}>
          <Filter size={32} color="var(--text-muted)" style={{ margin: '0 auto 10px' }} />
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px' }}>No Reels Match Filter Criteria</h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
            Try adjusting your search query, category, or watch percentage filter.
          </p>
          <button className="btn btn-secondary btn-sm" onClick={clearAllFilters}>
            Reset Filters
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '16px',
          }}
        >
          {filteredReels.map((reel, index) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              index={index}
              totalCount={filteredReels.length}
              onEdit={handleEdit}
              onDelete={deleteReel}
              onSelectReel={(r) => setSelectedReel(r)}
              onMoveUp={() => reorderReels(index, index - 1)}
              onMoveDown={() => reorderReels(index, index + 1)}
            />
          ))}
        </div>
      )}

      {/* Reel Input Modal */}
      {isModalOpen && (
        <ReelInputModal
          initialReel={editingReel}
          onSave={handleSaveModal}
          onClose={() => {
            setIsModalOpen(false);
            setEditingReel(null);
          }}
        />
      )}

      {/* Reel Upload Modal */}
      {isUploadModalOpen && (
        <ReelUploadModal
          onSave={handleSaveUpload}
          onClose={() => setIsUploadModalOpen(false)}
        />
      )}
    </div>
  );
};
export default ReelList;
