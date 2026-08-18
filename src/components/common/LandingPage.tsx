import React, { useState } from 'react';
import { Sparkles, Zap, ArrowRight, Mail, Film, Brain, Scale } from 'lucide-react';
import { useTechReel } from '../../context/TechReelContext';

export const LandingPage: React.FC = () => {
  const { triggerJudgeDemo, loginWithEmail } = useTechReel();
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    // Simulate Supabase secure passwordless sign-in flow
    setLinkSent(true);
    setTimeout(() => {
      // Graceful auto-sign-in fallback for ease of hackathon demo usage
      loginWithEmail(email.trim());
    }, 1500);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 50% 15%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(139, 92, 246, 0.08) 0%, transparent 40%), var(--bg-primary)',
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 24px',
        overflowY: 'auto',
      }}
    >
      {/* Brand Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
        <div className="logo-icon">
          <Zap size={18} />
        </div>
        <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>TECHREEL AI</span>
      </div>

      {/* Hero Content */}
      <div style={{ maxWidth: '800px', textAlign: 'center', marginBottom: '36px' }}>
        <h1
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            background: 'linear-gradient(to right, #ffffff, #c7d2fe, #a5b4fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px',
          }}
        >
          Turn your scrolling into smarter technology discovery.
        </h1>
        <p
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            maxWidth: '680px',
            margin: '0 auto',
          }}
        >
          Your Reel interactions reveal more than individual topics. Our AI connects the signals to discover what you're really interested in.
        </p>
      </div>

      {/* CTA Control Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', marginBottom: '50px', width: '100%', maxWidth: '380px' }}>
        {!showEmailInput ? (
          <>
            <button
              onClick={triggerJudgeDemo}
              className="judge-demo-btn"
              style={{
                width: '100%',
                padding: '14px 28px',
                fontSize: '1.05rem',
                borderRadius: 'var(--radius-pill)',
                animation: 'pulse-glow 2s infinite',
              }}
            >
              <Zap size={16} fill="currentColor" />
              <span>⚡ TRY JUDGE DEMO</span>
            </button>

            <button
              onClick={() => setShowEmailInput(true)}
              className="btn btn-secondary"
              style={{ width: '100%', padding: '12px 24px', borderRadius: 'var(--radius-pill)' }}
            >
              <Mail size={16} />
              <span>CONTINUE WITH EMAIL</span>
            </button>
          </>
        ) : (
          <form onSubmit={handleEmailSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {linkSent ? (
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                  fontSize: '0.88rem',
                  color: '#a7f3d0',
                }}
              >
                🎉 Secure magic sign-in link dispatched to your inbox!
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label className="form-label" style={{ textAlign: 'center', marginBottom: '8px' }}>
                    Enter your email to sign in or create profile
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ textAlign: 'center', padding: '12px', borderRadius: 'var(--radius-pill)' }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px 24px', borderRadius: 'var(--radius-pill)' }}
                >
                  <span>SEND SIGN-IN LINK</span>
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setShowEmailInput(false)}
                >
                  Back
                </button>
              </>
            )}
          </form>
        )}
      </div>

      {/* Visual Signal Synthesizer Diagram */}
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '680px',
          padding: '24px 30px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%), var(--bg-glass-card)',
          border: '1px solid var(--border-glass)',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', justifyContent: 'center' }}>
          <Brain size={16} color="var(--accent-primary)" />
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: 700 }}>
            How Semantic Cross-Reel Reasoning Works
          </span>
        </div>

        {/* Pipeline Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          {/* Inputs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Java Meme ☕', 'Coding Interview 💻', 'SWE Career 🚀', 'Laptop Gadget 🔌'].map((label, idx) => (
              <span
                key={idx}
                className="badge"
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid var(--border-subtle)',
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  color: 'var(--text-primary)',
                }}
              >
                {label}
              </span>
            ))}
          </div>

          <div style={{ color: 'var(--accent-primary)', fontSize: '1rem', fontWeight: 800 }}>↓</div>

          {/* Inference */}
          <div
            style={{
              background: 'rgba(99, 102, 241, 0.12)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: 'var(--radius-pill)',
              padding: '8px 20px',
              fontSize: '0.88rem',
              fontWeight: 700,
              color: '#c7d2fe',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Sparkles size={14} />
            <span>AI INFERRED INTEREST: SOFTWARE ENGINEERING</span>
          </div>

          <div style={{ color: 'var(--accent-cyan)', fontSize: '1rem', fontWeight: 800 }}>↓</div>

          {/* Recommendation */}
          <div
            style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 18px',
              textAlign: 'center',
              maxWidth: '380px',
            }}
          >
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#6ee7b7', fontWeight: 700, marginBottom: '2px' }}>
              HIGH-LEVERAGE RECOMMENDATION
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'white' }}>
              System Design & High-Level Architecture (HLD)
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Bypasses keyword repetition (beginner Java) to elevate learning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
