import React from 'react';
import {
  Edit2,
  Trash2,
  ChevronUp,
  ChevronDown,
  Eye,
  Heart,
  Bookmark,
  Share2,
  Play,
  Film,
} from 'lucide-react';
import { ReelInteraction } from '../../types/reel';

interface ReelCardProps {
  reel: ReelInteraction;
  index: number;
  totalCount: number;
  onEdit: (reel: ReelInteraction) => void;
  onDelete: (id: string) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export const ReelCard: React.FC<ReelCardProps> = ({
  reel,
  index,
  totalCount,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}) => {
  const getInteractionIcon = () => {
    switch (reel.interactionType) {
      case 'Liked':
        return <Heart size={13} color="var(--accent-rose)" fill="var(--accent-rose)" />;
      case 'Saved':
        return <Bookmark size={13} color="var(--accent-amber)" fill="var(--accent-amber)" />;
      case 'Shared':
        return <Share2 size={13} color="var(--accent-cyan)" />;
      default:
        return <Eye size={13} color="var(--text-secondary)" />;
    }
  };

  const getCategoryColor = () => {
    switch (reel.category) {
      case 'Coding':
      case 'Programming Meme':
        return 'badge-dsa';
      case 'AI':
        return 'badge-ai';
      case 'Career':
        return 'badge-career';
      case 'Gadgets':
      case 'Gaming':
        return 'badge-hardware';
      case 'Tech News':
        return 'badge-cloud';
      default:
        return 'badge-secondary';
    }
  };

  return (
    <div
      className="glass-card"
      style={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(99, 102, 241, 0.15)',
              color: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.75rem',
            }}
          >
            #{index + 1}
          </div>
          <span className={`badge ${getCategoryColor()}`}>{reel.category}</span>
          <span
            className="badge"
            style={{ background: 'rgba(255, 255, 255, 0.06)', color: 'var(--text-secondary)' }}
          >
            {getInteractionIcon()}
            <span>{reel.interactionType}</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {onMoveUp && index > 0 && (
            <button className="btn btn-ghost btn-sm" onClick={onMoveUp} title="Move Up" style={{ padding: '4px' }}>
              <ChevronUp size={14} />
            </button>
          )}
          {onMoveDown && index < totalCount - 1 && (
            <button className="btn btn-ghost btn-sm" onClick={onMoveDown} title="Move Down" style={{ padding: '4px' }}>
              <ChevronDown size={14} />
            </button>
          )}
          <button className="btn btn-ghost btn-sm" onClick={() => onEdit(reel)} title="Edit Reel" style={{ padding: '4px' }}>
            <Edit2 size={14} />
          </button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => onDelete(reel.id)}
            title="Delete Reel"
            style={{ padding: '4px', color: 'var(--accent-rose)' }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
          {reel.title}
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
          {reel.caption || 'No caption provided.'}
        </p>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
          <span>Watch Completion</span>
          <span style={{ fontWeight: 600, color: reel.watchPercentage >= 80 ? '#34d399' : 'var(--text-primary)' }}>
            {reel.watchPercentage}%
          </span>
        </div>
        <div style={{ width: '100%', height: '4px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '99px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${reel.watchPercentage}%`,
              height: '100%',
              background: reel.watchPercentage >= 80 ? 'var(--accent-emerald)' : 'var(--accent-primary)',
              borderRadius: '99px',
            }}
          />
        </div>
      </div>
    </div>
  );
};
