import React, { useState, useEffect } from 'react';
import { Zap, Mail, Brain, ArrowRight, Sparkles } from 'lucide-react';
import { useTechReel } from '../../context/TechReelContext';

// Animated step-through the signal chain
const SIGNALS = ['JAVA MEME ☕', 'CODING INTERVIEW 💻', 'SWE CAREER 🚀', 'LAPTOP GADGET 🔌'];

export const LandingPage: React.FC = () => {
  const { triggerJudgeDemo, loginWithEmail } = useTechReel();
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const [activeSignal, setActiveSignal] = useState(0);

  // Cycle through signal pills for visual effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSignal((prev) => (prev + 1) % SIGNALS.length);
    }, 900);
    return () => clearInterval(timer);
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setLinkSent(true);
    // Auto sign-in after brief delay (magic link simulation for hackathon demo)
    setTimeout(() => {
      loginWithEmail(email.trim());
    }, 1400);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: `
          radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 70%),
          radial-gradient(ellipse 50% 40% at 80% 90%, rgba(139,92,246,0.1) 0%, transparent 60%),
          #0a0d14
        `,
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 'clamp(32px, 6vw, 60px) 24px 60px',
        overflowY: 'auto',
        fontFamily: "'Outfit', 'Inter', sans-serif",
      }}
    >
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'clamp(36px, 6vw, 56px)' }}>
        <div
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 0 20px rgba(99,102,241,0.4)',
          }}
        >
          <Zap size={18} fill="white" />
        </div>
        <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>TECHREEL AI</span>
      </div>

      {/* Hero */}
      <div style={{ maxWidth: '760px', textAlign: 'center', marginBottom: 'clamp(28px, 5vw, 44px)' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(99,102,241,0.12)',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: '999px',
            padding: '5px 14px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#a5b4fc',
            marginBottom: '20px',
            letterSpacing: '0.04em',
          }}
        >
          <Sparkles size={12} />
          <span>Powered by Google Gemini · Semantic AI Reasoning</span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(2rem, 5.5vw, 3.8rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.035em',
            background: 'linear-gradient(135deg, #ffffff 0%, #c7d2fe 50%, #a5b4fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '18px',
          }}
        >
          Turn your scrolling into smarter technology discovery.
        </h1>

        <p
          style={{
            fontSize: 'clamp(0.95rem, 2.2vw, 1.15rem)',
            color: '#94a3b8',
            lineHeight: 1.6,
            maxWidth: '580px',
            margin: '0 auto',
          }}
        >
          Your Reel interactions reveal more than individual topics.
          Our AI connects the signals to discover what you're{' '}
          <span style={{ color: '#c7d2fe', fontWeight: 700 }}>really</span> interested in.
        </p>
      </div>

      {/* CTAs */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          marginBottom: 'clamp(36px, 6vw, 54px)',
          width: '100%',
          maxWidth: '360px',
        }}
      >
        {!showEmailInput ? (
          <>
            <button
              onClick={triggerJudgeDemo}
              className="judge-demo-btn"
              style={{
                width: '100%',
                padding: '15px 28px',
                fontSize: '1rem',
                fontWeight: 800,
                borderRadius: '999px',
                letterSpacing: '0.01em',
              }}
              aria-label="Try Judge Demo — no login required"
            >
              <Zap size={16} fill="currentColor" />
              <span>⚡ TRY JUDGE DEMO</span>
            </button>
            <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: '-4px' }}>
              No login required · 60-second demo
            </div>

            <button
              onClick={() => setShowEmailInput(true)}
              className="btn btn-secondary"
              style={{ width: '100%', padding: '12px 24px', borderRadius: '999px', marginTop: '4px' }}
              aria-label="Continue with email"
            >
              <Mail size={15} />
              <span>CONTINUE WITH EMAIL</span>
            </button>
          </>
        ) : (
          <form
            onSubmit={handleEmailSubmit}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}
            aria-label="Email sign-in form"
          >
            {linkSent ? (
              <div
                style={{
                  background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.35)',
                  padding: '16px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  fontSize: '0.88rem',
                  color: '#a7f3d0',
                  lineHeight: 1.5,
                }}
                role="status"
              >
                ✅ Signing you in — redirecting in a moment...
              </div>
            ) : (
              <>
                <label className="form-label" style={{ textAlign: 'center', fontSize: '0.82rem', color: '#94a3b8' }}>
                  Enter your email — no password needed
                </label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  style={{ textAlign: 'center', padding: '12px 16px', borderRadius: '999px' }}
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px 24px', borderRadius: '999px' }}
                >
                  <ArrowRight size={15} />
                  <span>SEND SIGN-IN LINK</span>
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setShowEmailInput(false)}
                  style={{ fontSize: '0.8rem' }}
                >
                  ← Back
                </button>
              </>
            )}
          </form>
        )}
      </div>

      {/* Visual Signal Diagram — How It Works */}
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          background: 'rgba(26,35,58,0.55)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: 'clamp(20px, 4vw, 30px)',
        }}
        role="img"
        aria-label="How TechReel AI works diagram"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            justifyContent: 'center',
            marginBottom: '22px',
          }}
        >
          <Brain size={15} color="#a5b4fc" />
          <span
            style={{
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#64748b',
              fontWeight: 700,
            }}
          >
            Semantic Cross-Reel Reasoning
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          {/* Input Signals */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {SIGNALS.map((label, idx) => (
              <span
                key={idx}
                style={{
                  padding: '6px 12px',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  transition: 'all 0.4s ease',
                  background: idx === activeSignal
                    ? 'rgba(99,102,241,0.25)'
                    : 'rgba(255,255,255,0.04)',
                  border: idx === activeSignal
                    ? '1px solid rgba(99,102,241,0.5)'
                    : '1px solid rgba(255,255,255,0.08)',
                  color: idx === activeSignal ? '#c7d2fe' : '#64748b',
                  transform: idx === activeSignal ? 'scale(1.04)' : 'scale(1)',
                }}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Arrow */}
          <div style={{ color: '#6366f1', fontSize: '1.3rem', fontWeight: 900, lineHeight: 1 }}>↓</div>

          {/* Hidden Interest */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.15))',
              border: '1px solid rgba(99,102,241,0.4)',
              borderRadius: '999px',
              padding: '10px 22px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Sparkles size={14} color="#a5b4fc" />
            <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#c7d2fe' }}>
              🧠 HIDDEN INTEREST: SOFTWARE ENGINEERING
            </span>
          </div>

          {/* Arrow */}
          <div style={{ color: '#06b6d4', fontSize: '1.3rem', fontWeight: 900, lineHeight: 1 }}>↓</div>

          {/* Recommendation */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(6,182,212,0.1))',
              border: '1px solid rgba(16,185,129,0.4)',
              borderRadius: '14px',
              padding: '14px 20px',
              textAlign: 'center',
              maxWidth: '380px',
            }}
          >
            <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: '#6ee7b7', fontWeight: 700, marginBottom: '4px', letterSpacing: '0.06em' }}>
              🎯 SMART RECOMMENDATION
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'white' }}>
              System Design & High-Level Architecture
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
              Not another Java reel — your interest is deeper.
            </div>
          </div>
        </div>
      </div>

      {/* Footer tagline */}
      <p style={{ marginTop: '28px', fontSize: '0.78rem', color: '#334155', textAlign: 'center' }}>
        TechReel AI · Semantic AI Reasoning · Built for PromptWars 2026
      </p>
    </div>
  );
};

export default LandingPage;
