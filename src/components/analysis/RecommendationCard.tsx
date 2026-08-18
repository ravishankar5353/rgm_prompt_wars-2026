import React, { useState, useRef, useEffect } from 'react';
import {
  Zap,
  Play,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Tag,
  ExternalLink,
  Send,
  MessageSquare,
  Bot,
  User,
} from 'lucide-react';
import { RecommendationCandidate } from '../../types/analysis';
import { FeedbackType, NotRelevantReason } from '../../types/feedback';
import { useTechReel } from '../../context/TechReelContext';
import { RecommendationDNAPanel } from './RecommendationDNAPanel';
import { WhyThisWhyNotCard } from './WhyThisWhyNotCard';

interface RecommendationCardProps {
  primaryRec: RecommendationCandidate;
  alternativeRecs?: RecommendationCandidate[];
}

const REJECTION_REASONS: NotRelevantReason[] = [
  'Too basic',
  'Too advanced',
  'Not interested',
  'Already know this',
  'Not relevant',
];

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  primaryRec,
  alternativeRecs = [],
}) => {
  const { submitFeedback, focusMode, chatMessages, sendChatMessage } = useTechReel();
  const [activeFeedback, setActiveFeedback] = useState<FeedbackType | null>(null);
  const [showRejectReasons, setShowRejectReasons] = useState(false);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  // Collapsible Why Not sections
  const [whyNotJavaOpen, setWhyNotJavaOpen] = useState(false);
  const [whyNotHypeOpen, setWhyNotHypeOpen] = useState(false);

  // Inline Chat State
  const [chatInput, setChatInput] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const handleFeedback = (type: FeedbackType, reason?: NotRelevantReason) => {
    setActiveFeedback(type);
    if (type === 'not_relevant' && !reason) {
      setShowRejectReasons(true);
      return;
    }
    submitFeedback(primaryRec.id, primaryRec.title, primaryRec.category, type, reason);
    setShowRejectReasons(false);
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    sendChatMessage(chatInput.trim());
    setChatInput('');
  };

  const getCategoryBadgeClass = (cat: string) => {
    switch (cat) {
      case 'AI': return 'badge-ai';
      case 'DSA': return 'badge-dsa';
      case 'HLD': return 'badge-hld';
      case 'Cloud': return 'badge-cloud';
      case 'Hardware': return 'badge-hardware';
      case 'Cybersecurity': return 'badge-cyber';
      default: return 'badge-secondary';
    }
  };

  // Scroll to bottom of inline chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
      {/* Primary Recommendation Card */}
      <div
        className="glass-card"
        style={{
          border: '1px solid rgba(99, 102, 241, 0.4)',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.06) 0%, rgba(15, 23, 42, 0.95) 100%)',
          padding: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                background: 'var(--accent-gradient)',
                color: 'white',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
                letterSpacing: '0.04em',
              }}
            >
              RECOMMENDED TECH REEL
            </span>
            <span className={`badge ${getCategoryBadgeClass(primaryRec.category)}`}>
              {primaryRec.category}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <Clock size={13} />
            <span>{primaryRec.estimatedDuration}</span>
          </div>
        </div>

        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'white', marginBottom: '10px' }}>
          {primaryRec.title}
        </h3>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
          {primaryRec.description}
        </p>

        {/* DNA metrics */}
        <RecommendationDNAPanel dna={primaryRec.dna} />

        {/* Why This Explanation */}
        <WhyThisWhyNotCard whyThisWhyNot={primaryRec.whyThisWhyNot} />

        {/* Collapsible Why Not sections */}
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
            <button
              onClick={() => setWhyNotJavaOpen(!whyNotJavaOpen)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                padding: '10px 14px',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <span>Why not another Java Reel?</span>
              {whyNotJavaOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {whyNotJavaOpen && (
              <p style={{ padding: '0 14px 12px', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Java content is already strongly represented in the interaction history. A related software-engineering topic provides broader relevance and greater novelty.
              </p>
            )}
          </div>

          <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
            <button
              onClick={() => setWhyNotHypeOpen(!whyNotHypeOpen)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                padding: '10px 14px',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <span>Why not generic AI hype?</span>
              {whyNotHypeOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {whyNotHypeOpen && (
              <p style={{ padding: '0 14px 12px', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Recommendation selection prioritizes contextual usefulness rather than generic popularity/hype listicles (e.g. "10 AI tools that will get you a job").
              </p>
            )}
          </div>
        </div>

        {/* Feedback loop */}
        <div
          style={{
            marginTop: '20px',
            paddingTop: '14px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className={`btn btn-sm ${activeFeedback === 'useful' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleFeedback('useful')}
            >
              <ThumbsUp size={13} />
              <span>Useful</span>
            </button>
            <button
              className={`btn btn-sm ${activeFeedback === 'not_relevant' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleFeedback('not_relevant')}
            >
              <ThumbsDown size={13} />
              <span>Not Relevant</span>
            </button>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => handleFeedback('try_another')}
            >
              <RefreshCw size={13} />
              <span>Try Another</span>
            </button>
          </div>
        </div>

        {showRejectReasons && (
          <div style={{ marginTop: '10px', padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Select reason:</div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {REJECTION_REASONS.map((r) => (
                <button key={r} className="btn btn-secondary btn-sm" onClick={() => handleFeedback('not_relevant', r)}>
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive ChatGPT chat directly aligned with current recommendation */}
      <div
        className="glass-card"
        style={{
          border: '1px solid var(--border-glass)',
          background: 'var(--bg-glass-card)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          height: '400px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <MessageSquare size={16} color="var(--accent-primary)" />
          <h4 style={{ fontSize: '0.9rem', fontWeight: 800 }}>Ask TechReel AI Agent</h4>
        </div>

        {/* Message stream */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '10px' }}>
          {chatMessages.slice(-4).map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '90%',
              }}
            >
              <div
                style={{
                  background: msg.sender === 'user' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '8px 12px',
                  fontSize: '0.8rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.4,
                }}
              >
                <strong>{msg.sender === 'user' ? 'You: ' : 'AI: '}</strong>
                <span dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </div>
            </div>
          ))}
          <div ref={chatBottomRef} />
        </div>

        {/* Suggestions Quick Buttons */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
          {['Why did you recommend this?', 'Why not Java?', 'Give me something easier'].map((pill) => (
            <button
              key={pill}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.72rem', borderRadius: 'var(--radius-pill)', padding: '3px 8px' }}
              onClick={() => {
                sendChatMessage(pill);
              }}
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Chat input box */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Ask why, ask for adjacent topics, or adjust level..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            style={{ flex: 1, fontSize: '0.82rem' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendChat();
            }}
          />
          <button className="btn btn-primary btn-sm" onClick={handleSendChat}>
            <Send size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default RecommendationCard;
