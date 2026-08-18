import React from 'react';
import {
  MessageSquare,
  Sparkles,
  Layers,
  BarChart3,
  History,
  Shield,
  Zap,
  PlusCircle,
  FolderGit2,
  X,
  GitFork,
  LogOut,
  Brain,
} from 'lucide-react';
import { useTechReel, ActiveTab } from '../../context/TechReelContext';
import { PRESET_SCENARIOS } from '../../config/constants';

interface ChatSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ isOpen, onClose }) => {
  const {
    activeTab,
    setActiveTab,
    reels,
    loadScenario,
    profile,
    isAuthenticated,
    logout,
    currentAnalysis,
  } = useTechReel();

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (onClose && window.innerWidth < 900) {
      onClose();
    }
  };

  // Simplified navigation — only the essential views
  const primaryNav: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string; highlight?: boolean }[] = [
    {
      id: 'analyze',
      label: 'My Reels',
      icon: <Layers size={16} />,
      badge: reels.length > 0 ? `${reels.length}` : undefined,
    },
    {
      id: 'interests',
      label: 'AI Results',
      icon: <Brain size={16} />,
      highlight: !!currentAnalysis,
    },
    {
      id: 'graph',
      label: 'Interest Graph',
      icon: <GitFork size={16} />,
    },
    {
      id: 'chat',
      label: 'AI Assistant',
      icon: <MessageSquare size={16} />,
    },
    {
      id: 'history',
      label: 'History',
      icon: <History size={16} />,
    },
    {
      id: 'analytics',
      label: 'Insights',
      icon: <BarChart3 size={16} />,
    },
    {
      id: 'privacy',
      label: 'Privacy',
      icon: <Shield size={16} />,
    },
  ];

  return (
    <aside className={`chat-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="brand-logo">
          <div className="logo-icon">
            <Zap size={18} />
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>TECHREEL AI</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 400 }}>
              Smarter Tech Discovery
            </div>
          </div>
        </div>
        {onClose && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={onClose}
            aria-label="Close sidebar"
            style={{ display: window.innerWidth < 900 ? 'flex' : 'none' }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Quick action CTA */}
      <div style={{ padding: '12px 14px 4px' }}>
        <button
          className="btn btn-primary"
          style={{ width: '100%', fontSize: '0.82rem', padding: '9px 12px' }}
          onClick={() => handleNavClick('analyze')}
          aria-label="Add or analyze Reels"
        >
          <PlusCircle size={15} />
          <span>Add / Analyze Reels</span>
        </button>
      </div>

      {/* Primary Navigation */}
      <div className="sidebar-nav">
        <div className="nav-section-title">Navigation</div>
        {primaryNav.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => handleNavClick(item.id)}
            aria-current={activeTab === item.id ? 'page' : undefined}
            style={item.highlight && activeTab !== item.id ? {
              border: '1px solid rgba(99, 102, 241, 0.25)',
              background: 'rgba(99, 102, 241, 0.07)',
            } : undefined}
          >
            {item.icon}
            <span>{item.label}</span>
            {item.badge && <span className="nav-item-badge">{item.badge}</span>}
            {item.highlight && activeTab !== item.id && (
              <span
                style={{
                  marginLeft: 'auto',
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: 'var(--accent-emerald)',
                  flexShrink: 0,
                }}
              />
            )}
          </button>
        ))}

        {/* Demo Scenarios Section */}
        <div className="nav-section-title" style={{ marginTop: '14px' }}>
          Test Scenarios
        </div>
        {PRESET_SCENARIOS.map((sc) => (
          <button
            key={sc.id}
            className="nav-item"
            style={{ fontSize: '0.8rem', padding: '7px 10px' }}
            onClick={() => {
              loadScenario(sc.id);
              handleNavClick('analyze');
            }}
            title={sc.description}
            aria-label={`Load scenario: ${sc.name}`}
          >
            <FolderGit2 size={14} color="var(--accent-cyan)" />
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {sc.name}
            </span>
          </button>
        ))}
      </div>

      {/* Footer: User profile + Logout */}
      <div className="sidebar-footer">
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '0.8rem',
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          {profile.name.charAt(0).toUpperCase()}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {isAuthenticated ? profile.name || profile.email || 'Student' : 'Demo Mode'}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            {isAuthenticated ? profile.role : 'Exploring without account'}
          </div>
        </div>
        {isAuthenticated && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={logout}
            title="Sign Out"
            aria-label="Sign out"
            style={{ padding: '4px', color: 'var(--accent-rose)', flexShrink: 0 }}
          >
            <LogOut size={15} />
          </button>
        )}
      </div>
    </aside>
  );
};
