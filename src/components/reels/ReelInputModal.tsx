import React, { useState, useEffect } from 'react';
import { Film, X, PlusCircle, Check } from 'lucide-react';
import { ReelInteraction, ReelFormData, ReelCategory, InteractionType } from '../../types/reel';
import { REEL_CATEGORIES, INTERACTION_TYPES } from '../../config/constants';

interface ReelInputModalProps {
  initialReel?: ReelInteraction | null;
  onSave: (data: ReelFormData) => void;
  onClose: () => void;
}

export const ReelInputModal: React.FC<ReelInputModalProps> = ({
  initialReel,
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState<ReelCategory>('Coding');
  const [interactionType, setInteractionType] = useState<InteractionType>('Watched');
  const [watchPercentage, setWatchPercentage] = useState(85);
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (initialReel) {
      setTitle(initialReel.title);
      setCaption(initialReel.caption);
      setCategory(initialReel.category);
      setInteractionType(initialReel.interactionType);
      setWatchPercentage(initialReel.watchPercentage);
      setUrl(initialReel.url || '');
    }
  }, [initialReel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      caption: caption.trim(),
      category,
      interactionType,
      watchPercentage,
      url: url.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}>
            <Film size={16} color="var(--accent-primary)" />
            <span>{initialReel ? 'Edit Reel Interaction' : 'Add Reel Interaction'}</span>
          </h3>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Reel Title / Hook *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Java Runtime Exception Meme or Backend SWE Lifestyle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Caption / Description / Context</label>
              <textarea
                className="form-textarea"
                placeholder="e.g. Day in life of software engineer debugging Redis cache in production #SWE #Coding"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ReelCategory)}
                >
                  {REEL_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Interaction Type</label>
                <select
                  className="form-select"
                  value={interactionType}
                  onChange={(e) => setInteractionType(e.target.value as InteractionType)}
                >
                  {INTERACTION_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label className="form-label">Watch Percentage Completion</label>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                  {watchPercentage}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={watchPercentage}
                onChange={(e) => setWatchPercentage(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                <span>0% (Skipped)</span>
                <span>50% (Partial)</span>
                <span>100% (Completed / Rewatched)</span>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm" disabled={!title.trim()}>
              <Check size={14} />
              <span>{initialReel ? 'Save Changes' : 'Add Interaction'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
