import React from 'react';
import { Bell, Check, Trash2, X, Sparkles, AlertTriangle, MessageSquare } from 'lucide-react';
import { useTechReel } from '../../context/TechReelContext';
import { AppNotification } from '../../types/notification';

export const NotificationCenter: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications,
  } = useTechReel();

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'new_interest':
        return <Sparkles size={14} color="var(--accent-primary)" />;
      case 'topic_saturation':
        return <AlertTriangle size={14} color="var(--accent-amber)" />;
      case 'feedback_recorded':
        return <MessageSquare size={14} color="var(--accent-emerald)" />;
      default:
        return <Bell size={14} color="var(--accent-cyan)" />;
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '64px',
        right: '24px',
        width: '360px',
        maxHeight: '480px',
        background: 'var(--bg-glass-elevated)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border-glass)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '14px 18px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.9rem' }}>
          <Bell size={16} /> Notifications
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {notifications.length > 0 && (
            <>
              <button
                className="btn btn-ghost btn-sm"
                onClick={markAllNotificationsAsRead}
                title="Mark all as read"
                style={{ padding: '4px 6px', fontSize: '0.75rem' }}
              >
                <Check size={13} />
              </button>
              <button
                className="btn btn-ghost btn-sm"
                onClick={clearNotifications}
                title="Clear all"
                style={{ padding: '4px 6px', fontSize: '0.75rem', color: 'var(--accent-rose)' }}
              >
                <Trash2 size={13} />
              </button>
            </>
          )}
          <button className="btn btn-ghost btn-sm" onClick={onClose} style={{ padding: '4px 6px' }}>
            <X size={14} />
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
        {notifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            No notifications right now.
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationAsRead(n.id)}
              style={{
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '6px',
                background: n.read ? 'transparent' : 'rgba(99, 102, 241, 0.08)',
                border: '1px solid',
                borderColor: n.read ? 'var(--border-subtle)' : 'rgba(99, 102, 241, 0.25)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                {getIcon(n.type)}
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {n.title}
                </span>
                {!n.read && (
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--accent-primary)',
                      marginLeft: 'auto',
                    }}
                  />
                )}
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {n.message}
              </p>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
