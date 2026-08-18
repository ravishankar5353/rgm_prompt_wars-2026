import React, { useState } from 'react';
import { Shield, Download, Trash2, CheckCircle2, Lock, EyeOff, Database, X } from 'lucide-react';
import { useTechReel } from '../../context/TechReelContext';

export const PrivacyCenterModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { exportData, clearAllData, reels, currentAnalysis } = useTechReel();
  const [confirmClear, setConfirmClear] = useState(false);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem' }}>
            <Shield size={18} color="var(--accent-primary)" /> Privacy & Data Transparency Center
          </h3>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.25)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontSize: '0.85rem', color: '#60a5fa', marginBottom: '6px' }}>
                <EyeOff size={14} /> What We Analyze
              </div>
              <ul style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', paddingLeft: '16px', lineHeight: 1.5 }}>
                <li>Reel titles & provided captions</li>
                <li>Category classifications</li>
                <li>Interaction type & watch duration %</li>
                <li>Synthesized multi-signal patterns</li>
              </ul>
            </div>

            <div
              style={{
                background: 'rgba(0, 0, 0, 0.25)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontSize: '0.85rem', color: '#34d399', marginBottom: '6px' }}>
                <Lock size={14} /> What We Protect
              </div>
              <ul style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', paddingLeft: '16px', lineHeight: 1.5 }}>
                <li>Zero access to private Instagram/TikTok credentials</li>
                <li>Local-first browser encryption</li>
                <li>Row-Level Security (RLS) policies</li>
                <li>Never sold or shared with advertisers</li>
              </ul>
            </div>
          </div>

          <div
            style={{
              background: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
              marginBottom: '20px',
            }}
          >
            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#c7d2fe', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Database size={14} /> Current Stored Workspace Data
            </div>
            <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <span><strong>{reels.length}</strong> Reel Interactions</span>
              <span><strong>{currentAnalysis ? '1' : '0'}</strong> Active Analysis</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary btn-sm" onClick={exportData} style={{ flex: 1 }}>
              <Download size={14} />
              <span>Export Personal Data (JSON)</span>
            </button>

            {!confirmClear ? (
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setConfirmClear(true)}
                style={{ color: 'var(--accent-rose)', border: '1px solid rgba(239, 68, 68, 0.3)' }}
              >
                <Trash2 size={14} />
                <span>Clear All Data</span>
              </button>
            ) : (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  clearAllData();
                  setConfirmClear(false);
                  onClose();
                }}
                style={{ background: 'var(--accent-rose)' }}
              >
                Confirm Delete All
              </button>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
