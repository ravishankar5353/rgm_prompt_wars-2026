import React, { useRef, useEffect } from 'react';
import { Bot, User, Sparkles, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { useTechReel } from '../../context/TechReelContext';
import { ChatMessage } from '../../types/chat';

export const ChatMessageList: React.FC = () => {
  const { chatMessages, sendChatMessage, setActiveTab, triggerJudgeDemo } = useTechReel();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleActionClick = (action: string) => {
    if (action.includes('Judge Demo')) {
      triggerJudgeDemo();
    } else {
      sendChatMessage(action);
    }
  };

  const renderContent = (content: string) => {
    // Simple markdown formatting for bold, headings, lists, bullet points
    return content.split('\n\n').map((block, idx) => {
      if (block.startsWith('### ')) {
        return (
          <h3 key={idx} style={{ fontSize: '1rem', fontWeight: 700, margin: '10px 0 6px', color: 'var(--text-primary)' }}>
            {block.replace('### ', '')}
          </h3>
        );
      }
      if (block.startsWith('1. ') || block.startsWith('- ')) {
        const lines = block.split('\n');
        return (
          <ul key={idx} style={{ paddingLeft: '18px', margin: '6px 0', fontSize: '0.88rem' }}>
            {lines.map((line, liIdx) => (
              <li key={liIdx} style={{ marginBottom: '4px' }}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: line.replace(/^[0-9]\.\s*|-\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                  }}
                />
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p
          key={idx}
          style={{ fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '8px' }}
          dangerouslySetInnerHTML={{
            __html: block.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>'),
          }}
        />
      );
    });
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {chatMessages.map((msg) => (
        <div
          key={msg.id}
          style={{
            display: 'flex',
            gap: '14px',
            alignItems: 'flex-start',
            maxWidth: '850px',
            width: '100%',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: 'var(--radius-sm)',
              background: msg.sender === 'user' ? 'var(--bg-tertiary)' : 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: msg.sender === 'assistant' ? 'var(--shadow-glow)' : 'none',
              color: 'white',
            }}
          >
            {msg.sender === 'user' ? <User size={16} /> : <Bot size={18} />}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {msg.sender === 'user' ? 'You' : 'TechReel AI Agent'}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <div
              style={{
                background: msg.sender === 'user' ? 'rgba(255, 255, 255, 0.04)' : 'var(--bg-glass-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 18px',
                color: 'var(--text-primary)',
              }}
            >
              {renderContent(msg.content)}

              {msg.type === 'analysis_card' && msg.analysisData && (
                <div style={{ marginTop: '14px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setActiveTab('recommendations')}
                  >
                    <Zap size={14} />
                    <span>View Full Recommendation & DNA</span>
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setActiveTab('interests')}
                  >
                    <Sparkles size={14} />
                    <span>Explore Hidden Interest</span>
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setActiveTab('benchmark')}
                  >
                    <ArrowRight size={14} />
                    <span>Semantic vs Keyword Comparison</span>
                  </button>
                </div>
              )}
            </div>

            {msg.quickActions && msg.quickActions.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
                {msg.quickActions.map((action, i) => (
                  <button
                    key={i}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.78rem', borderRadius: 'var(--radius-pill)', padding: '5px 12px' }}
                    onClick={() => handleActionClick(action)}
                  >
                    <span>{action}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};
