import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Sparkles, Zap, RotateCcw } from 'lucide-react';
import { useTechReel } from '../../context/TechReelContext';
import { AudioService } from '../../services/audioService';

export const ChatInput: React.FC = () => {
  const { sendChatMessage, isAnalyzing, clearChatHistory } = useTechReel();
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!input.trim() || isAnalyzing) return;
    sendChatMessage(input);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const adjustHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
  };

  return (
    <div style={{ padding: '16px 24px 20px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-glass)' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative' }}>
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-glass)',
            borderRadius: 'var(--radius-lg)',
            padding: '8px 12px 8px 16px',
            display: 'flex',
            alignItems: 'flex-end',
            gap: '8px',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={adjustHeight}
            onKeyDown={handleKeyDown}
            placeholder="Ask TechReel AI: 'Why did you recommend HLD?', 'Give me something easier', 'Analyze my latest reels'..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              fontFamily: 'inherit',
              resize: 'none',
              maxHeight: '140px',
              padding: '6px 0',
              lineHeight: 1.5,
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingBottom: '2px' }}>
            <button
              className="btn btn-ghost btn-sm"
              onClick={clearChatHistory}
              title="Clear chat stream"
              style={{ padding: '6px 8px', color: 'var(--text-muted)' }}
            >
              <RotateCcw size={15} />
            </button>

            <button
              className="btn btn-primary btn-sm"
              onClick={handleSend}
              disabled={!input.trim() || isAnalyzing}
              style={{
                borderRadius: 'var(--radius-md)',
                padding: '7px 14px',
                opacity: !input.trim() || isAnalyzing ? 0.5 : 1,
              }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', padding: '0 4px' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Shift + Enter for new line • Live Gemini Semantic Reasoning
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            TechReel AI v2.4 Competition Edition
          </span>
        </div>
      </div>
    </div>
  );
};
