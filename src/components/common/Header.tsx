import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Compass,
  Target,
  Bell,
  Sun,
  Moon,
  Shield,
  User,
  Mic,
  Share2,
  Key,
  HelpCircle,
  Menu,
} from 'lucide-react';
import { useTechReel } from '../../context/TechReelContext';
import { NotificationCenter } from './NotificationCenter';
import { ShareModal } from './ShareModal';
import { PrivacyCenterModal } from './PrivacyCenterModal';
import { VoiceInputModal } from './VoiceInputModal';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const {
    focusMode,
    setFocusMode,
    triggerJudgeDemo,
    isJudgeDemoActive,
    profile,
    setUserRole,
    toggleTheme,
    unreadNotificationCount,
    geminiKey,
    setGeminiKey,
  } = useTechReel();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState(geminiKey);

  const isDark = profile.preferences.theme === 'dark';

  return (
    <>
      <header className="workspace-header">
        <div className="header-left">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="btn btn-ghost btn-sm"
              title="Toggle Sidebar"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Menu size={18} />
            </button>
          )}

          {/* Mode Switcher: Focus vs Explore */}
          <div className="mode-toggle" title="Switch Recommendation Strategy">
            <button
              className={`mode-toggle-btn ${focusMode === 'focus' ? 'active' : ''}`}
              onClick={() => setFocusMode('focus')}
            >
              <Target size={13} />
              <span>Focus Mode</span>
            </button>
            <button
              className={`mode-toggle-btn ${focusMode === 'explore' ? 'active' : ''}`}
              onClick={() => setFocusMode('explore')}
            >
              <Compass size={13} />
              <span>Explore Mode</span>
            </button>
          </div>

          {/* User Role Badge */}
          <button
            onClick={() => setUserRole(profile.role === 'STUDENT' ? 'ADMIN' : 'STUDENT')}
            className="badge"
            style={{
              background: profile.role === 'ADMIN' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(99, 102, 241, 0.15)',
              color: profile.role === 'ADMIN' ? '#f87171' : '#c7d2fe',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
            }}
            title="Click to toggle between Student & Admin roles"
          >
            <User size={11} />
            <span>{profile.role === 'ADMIN' ? 'Admin Mode' : 'Student Mode'}</span>
          </button>
        </div>

        <div className="header-right">
          {/* Official Judge Demo Button */}
          <button
            onClick={triggerJudgeDemo}
            disabled={isJudgeDemoActive}
            className="judge-demo-btn"
            title="Load Official Trap & Run 60-Second Competition Demo"
          >
            <Zap size={14} fill="currentColor" />
            <span>{isJudgeDemoActive ? 'Running Demo...' : '⚡ TRY JUDGE DEMO'}</span>
          </button>

          {/* Voice Input */}
          <button
            onClick={() => setShowVoice(true)}
            className="btn btn-ghost btn-sm"
            title="Voice Query / Dictation"
            style={{ padding: '6px 10px' }}
          >
            <Mic size={16} />
          </button>

          {/* Share Insight */}
          <button
            onClick={() => setShowShare(true)}
            className="btn btn-ghost btn-sm"
            title="Share Sanitized Recommendation Insight"
            style={{ padding: '6px 10px' }}
          >
            <Share2 size={16} />
          </button>

          {/* API Key Modal */}
          <button
            onClick={() => setShowKeyModal(true)}
            className="btn btn-ghost btn-sm"
            title="Custom Gemini API Key"
            style={{
              padding: '6px 10px',
              color: geminiKey ? '#34d399' : 'var(--text-muted)',
            }}
          >
            <Key size={16} />
          </button>

          {/* Notifications Bell */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="btn btn-ghost btn-sm"
            style={{ position: 'relative', padding: '6px 10px' }}
            title="In-App Notifications"
          >
            <Bell size={16} />
            {unreadNotificationCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '4px',
                  background: 'var(--accent-rose)',
                  color: 'white',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-sm"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{ padding: '6px 10px' }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Privacy Center */}
          <button
            onClick={() => setShowPrivacy(true)}
            className="btn btn-ghost btn-sm"
            title="Privacy & Data Center"
            style={{ padding: '6px 10px' }}
          >
            <Shield size={16} />
          </button>
        </div>
      </header>

      {/* Notifications Drawer */}
      {showNotifications && (
        <NotificationCenter onClose={() => setShowNotifications(false)} />
      )}

      {/* Share Modal */}
      {showShare && <ShareModal onClose={() => setShowShare(false)} />}

      {/* Privacy Center Modal */}
      {showPrivacy && <PrivacyCenterModal onClose={() => setShowPrivacy(false)} />}

      {/* Voice Input Modal */}
      {showVoice && <VoiceInputModal onClose={() => setShowVoice(false)} />}

      {/* Gemini Key Config Modal */}
      {showKeyModal && (
        <div className="modal-overlay" onClick={() => setShowKeyModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}>
                <Key size={16} /> Google Gemini AI API Configuration
              </h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowKeyModal(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                TechReel AI natively connects to Google Gemini 1.5/2.0 API. If you don't enter an API key, our resilient local semantic engine will automatically handle all cross-reel reasoning and official test traps!
              </p>
              <div className="form-group">
                <label className="form-label">Gemini API Key</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="AIzaSy..."
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                />
              </div>
              <div
                style={{
                  background: 'rgba(99, 102, 241, 0.1)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 12px',
                  fontSize: '0.78rem',
                  color: '#c7d2fe',
                }}
              >
                🔒 Your key is securely stored in your browser's local memory only. Never transmitted elsewhere.
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  setTempKey('');
                  setGeminiKey('');
                  setShowKeyModal(false);
                }}
              >
                Clear Key
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setGeminiKey(tempKey);
                  setShowKeyModal(false);
                }}
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
