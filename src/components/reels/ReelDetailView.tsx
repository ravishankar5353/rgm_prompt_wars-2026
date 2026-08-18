import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Brain,
  ThumbsUp,
  MessageSquare,
  Share2,
  Send,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Clock,
  Layers,
  Film,
  Zap,
  Target,
} from 'lucide-react';
import { ReelInteraction, ReelComment } from '../../types/reel';
import { useTechReel } from '../../context/TechReelContext';

interface ReelDetailViewProps {
  reel: ReelInteraction;
  onBack: () => void;
  onAnalyze?: () => void;
}

export const ReelDetailView: React.FC<ReelDetailViewProps> = ({ reel, onBack, onAnalyze }) => {
  const { runAnalysis, setActiveTab } = useTechReel();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [comments, setComments] = useState<ReelComment[]>(reel.comments || []);
  const [newComment, setNewComment] = useState('');
  const [activeTabSection, setActiveTabSection] = useState<'feedback' | 'comments' | 'transcript'>('feedback');

  const videoUrl =
    reel.videoUrl ||
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

  const feedback = reel.aiFeedback || {
    hookScore: 92,
    hookEvaluation: 'Strong technical hook captures engineering interest within the first 2 seconds.',
    pacingScore: 88,
    pacingEvaluation: 'Concise visual storytelling maintains high viewer retention and engagement.',
    techClarityScore: 90,
    techClarityEvaluation: 'Clear explanation of core technical concept without unnecessary buzzwords.',
    viralityScore: 91,
    sentimentBreakdown: {
      positive: 89,
      neutral: 9,
      negative: 2,
      summary: 'High positive resonance among software engineers and technical learners.',
    },
    keyStrengths: [
      'Relatable real-world problem statement',
      'Demonstrates actionable engineering patterns',
      'Clear cross-domain technical relevance',
    ],
    improvements: [
      'Consider linking to relevant GitHub repositories or system design documentation',
      'Could highlight edge case handling in next iteration',
    ],
    inferredTopics: reel.tags && reel.tags.length > 0 ? reel.tags : [reel.category, 'Software Engineering', 'System Design'],
    actionableSummary: 'High-signal technical reel that contributes meaningful data to your technology interest profile.',
  };

  const transcript = reel.transcript || [
    { timestamp: '00:00', seconds: 0, text: `Starting breakdown: ${reel.title}` },
    { timestamp: '00:05', seconds: 5, text: reel.caption || 'Analyzing core technical concepts...' },
    { timestamp: '00:10', seconds: 10, text: 'Summary of key takeaway and practical application.' },
  ];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleJumpToTranscript = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      setCurrentTime(seconds);
      if (!isPlaying) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentItem: ReelComment = {
      id: `comment-${Date.now()}`,
      authorName: 'You (Student)',
      authorRole: 'Learner',
      content: newComment.trim(),
      timestamp: Date.now(),
      likes: 1,
      isLiked: true,
    };

    setComments((prev) => [commentItem, ...prev]);
    setNewComment('');
  };

  const handleLikeComment = (id: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, likes: c.isLiked ? c.likes - 1 : c.likes + 1, isLiked: !c.isLiked }
          : c
      )
    );
  };

  const handleRunCrossAnalysis = async () => {
    if (onAnalyze) {
      onAnalyze();
    } else {
      await runAnalysis();
      setActiveTab('interests');
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '10px 0 40px',
      }}
    >
      {/* Top Navigation Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <button
          onClick={onBack}
          className="btn btn-secondary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <ArrowLeft size={14} />
          <span>Back to Reels</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="badge badge-secondary" style={{ fontSize: '0.75rem' }}>
            {reel.category}
          </span>
          <button
            onClick={handleRunCrossAnalysis}
            className="btn btn-primary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}
          >
            <Brain size={14} />
            <span>Analyze in TechReel AI</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left = Video Player & Creator, Right = AI Feedback & Scorecard */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {/* LEFT COLUMN: Reel Player & Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Video Player Card */}
          <div
            className="glass-card"
            style={{
              padding: '0',
              overflow: 'hidden',
              background: '#000',
              borderRadius: 'var(--radius-md)',
              position: 'relative',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            <video
              ref={videoRef}
              src={videoUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              playsInline
              loop
              muted={isMuted}
              style={{
                width: '100%',
                maxHeight: '440px',
                objectFit: 'contain',
                display: 'block',
                background: '#090d16',
              }}
              onClick={togglePlay}
            />

            {/* Video Controls Overlay */}
            <div
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
                padding: '16px 14px 12px',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {/* Scrubber */}
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                style={{
                  width: '100%',
                  accentColor: 'var(--accent-primary)',
                  cursor: 'pointer',
                  height: '4px',
                }}
              />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={togglePlay}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </button>

                  <button
                    onClick={toggleMute}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>

                  <span style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      background: 'rgba(99,102,241,0.3)',
                      color: '#a5b4fc',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontWeight: 700,
                    }}
                  >
                    HD
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Reel Metadata & Creator Card */}
          <div className="glass-card" style={{ padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--accent-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'white',
                }}
              >
                {reel.creatorAvatar || '⚡'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {reel.creatorName || 'Tech Creator'}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Interaction: <strong style={{ color: 'var(--accent-primary)' }}>{reel.interactionType}</strong> • Watch: <strong>{reel.watchPercentage}%</strong>
                </div>
              </div>
            </div>

            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px', color: 'white' }}>
              {reel.title}
            </h2>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
              {reel.caption}
            </p>

            {reel.creatorNotes && (
              <div
                style={{
                  background: 'rgba(99,102,241,0.08)',
                  borderLeft: '3px solid var(--accent-primary)',
                  padding: '8px 12px',
                  borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                  fontSize: '0.78rem',
                  color: '#c7d2fe',
                  marginBottom: '14px',
                }}
              >
                <strong>Creator Notes:</strong> {reel.creatorNotes}
              </div>
            )}

            {/* Tags */}
            {reel.tags && reel.tags.length > 0 && (
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {reel.tags.map((t, idx) => (
                  <span key={idx} className="badge badge-secondary" style={{ fontSize: '0.7rem' }}>
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: AI Feedback, Scorecard & Comments */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Section Navigation Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '6px',
              background: 'rgba(0,0,0,0.3)',
              padding: '4px',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <button
              onClick={() => setActiveTabSection('feedback')}
              className={`btn btn-sm ${activeTabSection === 'feedback' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ flex: 1, fontSize: '0.78rem' }}
            >
              <Sparkles size={13} /> AI Feedback & Scores
            </button>
            <button
              onClick={() => setActiveTabSection('comments')}
              className={`btn btn-sm ${activeTabSection === 'comments' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ flex: 1, fontSize: '0.78rem' }}
            >
              <MessageSquare size={13} /> Comments ({comments.length})
            </button>
            <button
              onClick={() => setActiveTabSection('transcript')}
              className={`btn btn-sm ${activeTabSection === 'transcript' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ flex: 1, fontSize: '0.78rem' }}
            >
              <Clock size={13} /> Transcript
            </button>
          </div>

          {/* TAB 1: AI Feedback & Performance Scores */}
          {activeTabSection === 'feedback' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Scorecard Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '10px',
                }}
              >
                <div
                  className="glass-card"
                  style={{
                    padding: '14px',
                    border: '1px solid rgba(99,102,241,0.3)',
                    background: 'rgba(99,102,241,0.06)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                      HOOK STRENGTH
                    </span>
                    <Zap size={14} color="#818cf8" />
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#c7d2fe' }}>
                    {feedback.hookScore}
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/100</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {feedback.hookEvaluation}
                  </div>
                </div>

                <div
                  className="glass-card"
                  style={{
                    padding: '14px',
                    border: '1px solid rgba(16,185,129,0.3)',
                    background: 'rgba(16,185,129,0.06)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                      PACING & RETENTION
                    </span>
                    <TrendingUp size={14} color="#34d399" />
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#a7f3d0' }}>
                    {feedback.pacingScore}
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/100</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {feedback.pacingEvaluation}
                  </div>
                </div>

                <div
                  className="glass-card"
                  style={{
                    padding: '14px',
                    border: '1px solid rgba(6,182,212,0.3)',
                    background: 'rgba(6,182,212,0.06)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                      TECH CLARITY
                    </span>
                    <Brain size={14} color="#22d3ee" />
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#a5f3fc' }}>
                    {feedback.techClarityScore}
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/100</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {feedback.techClarityEvaluation}
                  </div>
                </div>

                <div
                  className="glass-card"
                  style={{
                    padding: '14px',
                    border: '1px solid rgba(245,158,11,0.3)',
                    background: 'rgba(245,158,11,0.06)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                      DISCOVERY POTENTIAL
                    </span>
                    <Target size={14} color="#fbbf24" />
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fde68a' }}>
                    {feedback.viralityScore}
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/100</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    High leverage for learning trajectory.
                  </div>
                </div>
              </div>

              {/* Key Strengths & Improvements */}
              <div className="glass-card" style={{ padding: '16px 18px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#34d399', marginBottom: '8px', letterSpacing: '0.04em' }}>
                  ✨ Key Strengths
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {feedback.keyStrengths.map((str, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>
                      {str}
                    </li>
                  ))}
                </ul>

                <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#fbbf24', marginTop: '14px', marginBottom: '8px', letterSpacing: '0.04em' }}>
                  ⚡ Areas for Improvement
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {feedback.improvements.map((imp, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>
                      {imp}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inferred Topics for Cross-Reel Reasoning */}
              <div className="glass-card" style={{ padding: '14px 18px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>
                  🧠 Inferred Topics Extracted for Discovery Engine:
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {feedback.inferredTopics.map((topic, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '999px',
                        background: 'rgba(99,102,241,0.15)',
                        border: '1px solid rgba(99,102,241,0.3)',
                        fontSize: '0.75rem',
                        color: '#c7d2fe',
                        fontWeight: 600,
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Comments & Community Insights */}
          {activeTabSection === 'comments' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Sentiment Summary Bar */}
              <div className="glass-card" style={{ padding: '12px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Community Sentiment:</span>
                  <span style={{ color: '#34d399', fontWeight: 700 }}>
                    {feedback.sentimentBreakdown.positive}% Positive
                  </span>
                </div>
                <div
                  style={{
                    height: '6px',
                    width: '100%',
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '999px',
                    overflow: 'hidden',
                    display: 'flex',
                  }}
                >
                  <div style={{ width: `${feedback.sentimentBreakdown.positive}%`, background: '#34d399' }} />
                  <div style={{ width: `${feedback.sentimentBreakdown.neutral}%`, background: '#fbbf24' }} />
                  <div style={{ width: `${feedback.sentimentBreakdown.negative}%`, background: '#f87171' }} />
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                  {feedback.sentimentBreakdown.summary}
                </div>
              </div>

              {/* Add Comment Input */}
              <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Add a comment or technical note..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  style={{ flex: 1, fontSize: '0.82rem' }}
                />
                <button type="submit" className="btn btn-primary btn-sm" disabled={!newComment.trim()}>
                  <Send size={13} />
                </button>
              </form>

              {/* Comments List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {comments.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                    No comments yet. Be the first to share your thoughts!
                  </div>
                ) : (
                  comments.map((cmt) => (
                    <div
                      key={cmt.id}
                      className="glass-card"
                      style={{
                        padding: '12px 14px',
                        background: cmt.isAiInsight ? 'rgba(99,102,241,0.08)' : 'rgba(0,0,0,0.2)',
                        borderColor: cmt.isAiInsight ? 'rgba(99,102,241,0.3)' : 'var(--border-subtle)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {cmt.authorName}
                          </span>
                          {cmt.authorRole && (
                            <span
                              style={{
                                fontSize: '0.65rem',
                                color: cmt.isAiInsight ? '#a5b4fc' : 'var(--text-muted)',
                                background: 'rgba(255,255,255,0.05)',
                                padding: '1px 6px',
                                borderRadius: '4px',
                              }}
                            >
                              {cmt.authorRole}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleLikeComment(cmt.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: cmt.isLiked ? '#34d399' : 'var(--text-muted)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.72rem',
                          }}
                        >
                          <ThumbsUp size={12} />
                          <span>{cmt.likes}</span>
                        </button>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                        {cmt.content}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: Transcript */}
          {activeTabSection === 'transcript' && (
            <div className="glass-card" style={{ padding: '16px 18px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '12px' }}>
                🎙️ Click any timestamp to seek video playback:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {transcript.map((seg, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleJumpToTranscript(seg.seconds)}
                    style={{
                      display: 'flex',
                      gap: '10px',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      background:
                        currentTime >= seg.seconds &&
                        currentTime < (transcript[idx + 1]?.seconds || 9999)
                          ? 'rgba(99,102,241,0.18)'
                          : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${
                        currentTime >= seg.seconds &&
                        currentTime < (transcript[idx + 1]?.seconds || 9999)
                          ? 'rgba(99,102,241,0.4)'
                          : 'rgba(255,255,255,0.04)'
                      }`,
                      cursor: 'pointer',
                      alignItems: 'baseline',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'var(--accent-primary)',
                        fontFamily: 'monospace',
                        flexShrink: 0,
                      }}
                    >
                      {seg.timestamp}
                    </span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                      {seg.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReelDetailView;
