import React from 'react';
import {
  MessageSquare,
  Sparkles,
  Layers,
  Share2,
  GitFork,
  BarChart3,
  History,
  Shield,
  FlaskConical,
  Zap,
  PlusCircle,
  FolderGit2,
  Scale,
  X,
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
    runAnalysis,
    profile,
    clearChatHistory,
  } = useTechReel();

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (onClose && window.innerWidth < 900) {
      onClose();
    }
  };

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'chat', label: 'TechReel Chat', icon: <MessageSquare size={16} /> },
    {
      id: 'analyze',
      label: 'Reel Interactions',
      icon: <Layers size={16} />,
      badge: `${reels.length}`,
    },
    { id: 'interests', label: 'Hidden Interests', icon: <Sparkles size={16} /> },
    { id: 'graph', label: 'Interest Graph', icon: <GitFork size={16} /> },
    { id: 'recommendations', label: 'Tech Recommendations', icon: <Zap size={16} /> },
    { id: 'benchmark', label: 'Semantic Benchmark', icon: <Scale size={16} /> },
    { id: 'analytics', label: 'Analytics Dashboard', icon: <BarChart3 size={16} /> },
    { id: 'history', label: 'Interaction History', icon: <History size={16} /> },
    { id: 'simulator', label: 'What-If Simulator', icon: <FlaskConical size={16} /> },
    { id: 'privacy', label: 'Privacy & Security', icon: <Shield size={16} /> },
  ];

  return (
    <aside className={`chat-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="brand-logo">
          <div className="logo-icon">
            <Zap size={18} />
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 800 }}>TECHREEL AI</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 400 }}>
              Smarter Tech Discovery
            </div>
          </div>
        </div>
        {onClose && (
          <button className="btn btn-ghost btn-sm" onClick={onClose} style={{ display: 'none' }}>
            <X size={16} />
          </button>
        )}
      </div>

      <div style={{ padding: '12px 14px 4px' }}>
        <button
          className="btn btn-primary"
          style={{ width: '100%', fontSize: '0.82rem', padding: '9px 12px' }}
          onClick={() => {
            handleNavClick('analyze');
          }}
        >
          <PlusCircle size={15} />
          <span>Add / Analyze Reels</span>
        </button>
      </div>

      <div className="sidebar-nav">
        <div className="nav-section-title">Navigation</div>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => handleNavClick(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
            {item.badge && <span className="nav-item-badge">{item.badge}</span>}
          </button>
        ))}

        <div className="nav-section-title" style={{ marginTop: '12px' }}>
          Test Scenarios & Traps
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
          >
            <FolderGit2 size={14} color="var(--accent-cyan)" />
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {sc.name}
            </span>
          </button>
        ))}
      </div>

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
          }}
        >
          {profile.name.charAt(0)}
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
            {profile.name}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            {profile.role} • {profile.preferences.focusMode}
          </div>
        </div>
      </div>
    </aside>
  );
};
