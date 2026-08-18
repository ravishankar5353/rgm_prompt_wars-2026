import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  Trash2,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  FolderGit2,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';
import { useTechReel } from '../../context/TechReelContext';
import { ReelCard } from './ReelCard';
import { QuickAddBar } from './QuickAddBar';
import { ReelInputModal } from './ReelInputModal';
import { ReelInteraction, ReelFormData } from '../../types/reel';
import { PRESET_SCENARIOS } from '../../config/constants';

export const ReelList: React.FC = () => {
  const {
    reels,
    addReel,
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
  const [editingReel, setEditingReel] = useState<ReelInteraction | null>(null);

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

  const handleRun = async () => {
    await runAnalysis();
    setActiveTab('interests');
  };

  const isMinimumMet = reels.length >= 3;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
            To discover your technology trajectory, add 3 or more Reels or click <strong>[ USE SAMPLE REELS ]</strong> to load 4 fictional examples.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button className="btn btn-primary btn-sm" onClick={() => loadScenario('official-trap')}>
              Load Sample Reels
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
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '16px',
          }}
        >
          {reels.map((reel, index) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              index={index}
              totalCount={reels.length}
              onEdit={handleEdit}
              onDelete={deleteReel}
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
    </div>
  );
};
export default ReelList;
