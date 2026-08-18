import React, { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { useTechReel } from '../../context/TechReelContext';
import { ReelCategory, InteractionType } from '../../types/reel';

export const QuickAddBar: React.FC = () => {
  const { addReel } = useTechReel();
  const [text, setText] = useState('');

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    // Smart category inference from text
    const lower = text.toLowerCase();
    let category: ReelCategory = 'Other';
    if (lower.includes('java') || lower.includes('python') || lower.includes('code') || lower.includes('bug') || lower.includes('algo')) {
      category = lower.includes('meme') || lower.includes('joke') || lower.includes('funny') ? 'Programming Meme' : 'Coding';
    } else if (lower.includes('ai') || lower.includes('gpt') || lower.includes('llm') || lower.includes('pytorch') || lower.includes('model')) {
      category = 'AI';
    } else if (lower.includes('salary') || lower.includes('career') || lower.includes('swe') || lower.includes('interview') || lower.includes('day in')) {
      category = 'Career';
    } else if (lower.includes('laptop') || lower.includes('gpu') || lower.includes('macbook') || lower.includes('pc') || lower.includes('gadget')) {
      category = 'Gadgets';
    } else if (lower.includes('game') || lower.includes('gaming') || lower.includes('steam')) {
      category = 'Gaming';
    } else if (lower.includes('news') || lower.includes('tech')) {
      category = 'Tech News';
    }

    addReel({
      title: text.length > 50 ? `${text.substring(0, 48)}...` : text,
      caption: text,
      category,
      interactionType: 'Liked',
      watchPercentage: 90,
    });

    setText('');
  };

  return (
    <form
      onSubmit={handleQuickAdd}
      style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '6px 8px 6px 14px',
      }}
    >
      <Sparkles size={15} color="var(--accent-primary)" />
      <input
        type="text"
        placeholder="Quick Add Reel: Paste title, caption, or video description..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: 'var(--text-primary)',
          fontSize: '0.85rem',
        }}
      />
      <button
        type="submit"
        className="btn btn-secondary btn-sm"
        disabled={!text.trim()}
        style={{ borderRadius: 'var(--radius-sm)', padding: '5px 12px' }}
      >
        <Plus size={14} />
        <span>Add</span>
      </button>
    </form>
  );
};
