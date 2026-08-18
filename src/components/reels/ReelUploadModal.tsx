import React, { useState } from 'react';
import {
  UploadCloud,
  Film,
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileVideo,
  Link as LinkIcon,
  Cpu,
  Layers,
  Brain,
  MessageSquare,
} from 'lucide-react';
import { ReelFormData, ReelCategory, InteractionType, ReelInteraction } from '../../types/reel';
import { REEL_CATEGORIES, INTERACTION_TYPES } from '../../config/constants';

interface ReelUploadModalProps {
  onSave: (reel: ReelFormData, autoOpenDetail?: boolean) => void;
  onClose: () => void;
}

const SAMPLE_DEMO_CLIPS = [
  {
    title: 'Distributed Redis Cache & Caching Strategies',
    caption: 'Preventing cache stampedes with mutex locks and probabilistic early expiration in production #Backend #SystemDesign #Redis',
    category: 'Career' as ReelCategory,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    tags: ['Redis', 'DistributedSystems', 'Backend', 'SystemDesign'],
    notes: 'Focuses on production microservice latency and caching resilience.',
  },
  {
    title: 'Modern Neural Network Inference with vLLM',
    caption: 'PagedAttention algorithm explained: How vLLM maximizes GPU memory utilization for continuous batching #AI #LLM #GPU',
    category: 'AI' as ReelCategory,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    tags: ['AI', 'vLLM', 'Inference', 'PagedAttention', 'PyTorch'],
    notes: 'Deep technical explanation of GPU memory management for LLM serving.',
  },
  {
    title: 'Morris Traversal: Inorder Tree Traversal in O(1) Space',
    caption: 'Eliminating the call stack using threaded binary trees for memory-constrained algorithmic systems #DSA #LeetCode #Trees',
    category: 'Coding' as ReelCategory,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    tags: ['DSA', 'BinaryTrees', 'Algorithms', 'MorrisTraversal'],
    notes: 'Detailed algorithmic optimization for whiteboard interview prep.',
  },
];

const PROCESSING_STAGES = [
  { step: 1, name: 'Video & Audio Stream Ingestion', desc: 'Analyzing keyframes, visual resolution, and audio fidelity...' },
  { step: 2, name: 'Speech-to-Text & Subtitle Sync', desc: 'Transcribing speech and extracting technical vocabulary...' },
  { step: 3, name: 'Hook, Pacing & Retention Scoring', desc: 'Evaluating first 3-second hook and cognitive pacing...' },
  { step: 4, name: 'Tech Concept & Sentiment Modeling', desc: 'Classifying engineering domain depth and audience sentiment...' },
  { step: 5, name: 'Synthesizing AI Actionable Feedback', desc: 'Generating improvement recommendations and discovery signals...' },
];

export const ReelUploadModal: React.FC<ReelUploadModalProps> = ({ onSave, onClose }) => {
  const [uploadMode, setUploadMode] = useState<'file' | 'url' | 'sample'>('sample');
  const [title, setTitle] = useState(SAMPLE_DEMO_CLIPS[0].title);
  const [caption, setCaption] = useState(SAMPLE_DEMO_CLIPS[0].caption);
  const [category, setCategory] = useState<ReelCategory>(SAMPLE_DEMO_CLIPS[0].category);
  const [interactionType, setInteractionType] = useState<InteractionType>('Watched');
  const [watchPercentage, setWatchPercentage] = useState(90);
  const [videoUrl, setVideoUrl] = useState(SAMPLE_DEMO_CLIPS[0].videoUrl);
  const [creatorNotes, setCreatorNotes] = useState(SAMPLE_DEMO_CLIPS[0].notes);
  const [tagInput, setTagInput] = useState('Redis, Backend, SystemDesign');
  const [fileName, setFileName] = useState<string | null>(null);

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [processingProgress, setProcessingProgress] = useState(0);

  const handleSelectSample = (sample: typeof SAMPLE_DEMO_CLIPS[0]) => {
    setTitle(sample.title);
    setCaption(sample.caption);
    setCategory(sample.category);
    setVideoUrl(sample.videoUrl);
    setCreatorNotes(sample.notes);
    setTagInput(sample.tags.join(', '));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      if (!title || title === SAMPLE_DEMO_CLIPS[0].title) {
        setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      }
      // Create local object URL for preview
      const localUrl = URL.createObjectURL(file);
      setVideoUrl(localUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsProcessing(true);
    setCurrentStep(1);
    setProcessingProgress(15);

    // Simulate multi-stage AI pipeline
    const timer1 = setTimeout(() => {
      setCurrentStep(2);
      setProcessingProgress(35);
    }, 400);

    const timer2 = setTimeout(() => {
      setCurrentStep(3);
      setProcessingProgress(60);
    }, 850);

    const timer3 = setTimeout(() => {
      setCurrentStep(4);
      setProcessingProgress(82);
    }, 1300);

    const timer4 = setTimeout(() => {
      setCurrentStep(5);
      setProcessingProgress(100);
    }, 1750);

    const timer5 = setTimeout(() => {
      const tags = tagInput
        .split(',')
        .map((t) => t.trim().replace(/^#/, ''))
        .filter(Boolean);

      onSave(
        {
          title: title.trim(),
          caption: caption.trim(),
          category,
          interactionType,
          watchPercentage,
          videoUrl: videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          creatorName: 'You (Creator)',
          creatorNotes: creatorNotes.trim() || undefined,
          tags: tags.length > 0 ? tags : ['Technology', 'Engineering'],
        },
        true
      );
      setIsProcessing(false);
      onClose();
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  };

  return (
    <div className="modal-overlay" onClick={isProcessing ? undefined : onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '680px', width: '95%' }}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              <UploadCloud size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Upload & Process Reel</h3>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Ingest video, generate AI feedback & hook score, and extract interest signals
              </p>
            </div>
          </div>
          {!isProcessing && (
            <button className="btn btn-ghost btn-sm" onClick={onClose}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* Processing Pipeline Animation Overlay */}
        {isProcessing ? (
          <div style={{ padding: '40px 24px', textAlign: 'center' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.2))',
                border: '2px solid rgba(99,102,241,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                animation: 'pulse 1.5s infinite ease-in-out',
              }}
            >
              <Brain size={30} color="#818cf8" />
            </div>

            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
              {PROCESSING_STAGES[currentStep - 1]?.name}
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              {PROCESSING_STAGES[currentStep - 1]?.desc}
            </p>

            {/* Progress Bar */}
            <div
              style={{
                width: '100%',
                height: '8px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '999px',
                overflow: 'hidden',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  width: `${processingProgress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #6366f1, #06b6d4, #10b981)',
                  borderRadius: '999px',
                  transition: 'width 0.4s ease',
                }}
              />
            </div>

            {/* Step badges */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {PROCESSING_STAGES.map((st) => (
                <span
                  key={st.step}
                  style={{
                    fontSize: '0.72rem',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    background:
                      st.step <= currentStep
                        ? 'rgba(16,185,129,0.15)'
                        : 'rgba(255,255,255,0.04)',
                    color: st.step <= currentStep ? '#6ee7b7' : '#64748b',
                    border: `1px solid ${
                      st.step <= currentStep ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.06)'
                    }`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {st.step <= currentStep && <CheckCircle2 size={11} />}
                  <span>Step {st.step}</span>
                </span>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              {/* Method Selector Tabs */}
              <div
                style={{
                  display: 'flex',
                  gap: '6px',
                  background: 'rgba(0,0,0,0.3)',
                  padding: '4px',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '16px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setUploadMode('sample')}
                  className={`btn btn-sm ${uploadMode === 'sample' ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ flex: 1, fontSize: '0.78rem' }}
                >
                  ⚡ Preset Tech Clips
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode('file')}
                  className={`btn btn-sm ${uploadMode === 'file' ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ flex: 1, fontSize: '0.78rem' }}
                >
                  <FileVideo size={13} /> Video File (.mp4)
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode('url')}
                  className={`btn btn-sm ${uploadMode === 'url' ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ flex: 1, fontSize: '0.78rem' }}
                >
                  <LinkIcon size={13} /> Video URL
                </button>
              </div>

              {/* Upload Mode: Preset Samples */}
              {uploadMode === 'sample' && (
                <div style={{ marginBottom: '16px' }}>
                  <label className="form-label">Select Verified Sample Reel:</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                    {SAMPLE_DEMO_CLIPS.map((sample, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectSample(sample)}
                        style={{
                          padding: '10px 12px',
                          borderRadius: 'var(--radius-sm)',
                          background:
                            title === sample.title
                              ? 'rgba(99,102,241,0.18)'
                              : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${
                            title === sample.title ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.08)'
                          }`,
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {sample.title}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            Category: {sample.category} • {sample.tags.slice(0, 3).join(', ')}
                          </div>
                        </div>
                        <span
                          className="badge"
                          style={{
                            background:
                              title === sample.title ? 'var(--accent-primary)' : 'rgba(255,255,255,0.08)',
                            color: 'white',
                            fontSize: '0.65rem',
                          }}
                        >
                          {title === sample.title ? 'Selected' : 'Use'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Mode: File Drag and Drop */}
              {uploadMode === 'file' && (
                <div
                  style={{
                    border: '2px dashed rgba(99,102,241,0.4)',
                    borderRadius: 'var(--radius-md)',
                    padding: '24px 16px',
                    textAlign: 'center',
                    background: 'rgba(99,102,241,0.04)',
                    marginBottom: '16px',
                  }}
                >
                  <FileVideo size={32} color="#818cf8" style={{ margin: '0 auto 8px' }} />
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '4px' }}>
                    {fileName ? `Loaded: ${fileName}` : 'Choose an MP4 / WebM video file'}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    Supports 9:16 vertical shorts and standard tech demo screen recordings
                  </div>
                  <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
                    <span>Browse Video File</span>
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              )}

              {/* Upload Mode: Video URL */}
              {uploadMode === 'url' && (
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label">Direct Video Stream URL</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://example.com/demo.mp4"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                </div>
              )}

              {/* Form details */}
              <div className="form-group">
                <label className="form-label">Reel Title / Hook Statement *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Distributed Redis Cache Optimization"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Caption / Description & Hashtags</label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  placeholder="e.g. How we dropped cache stampedes by 98% with mutex locking #SWE #SystemDesign"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Technology Category</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ReelCategory)}
                  >
                    {REEL_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Interaction Status</label>
                  <select
                    className="form-select"
                    value={interactionType}
                    onChange={(e) => setInteractionType(e.target.value as InteractionType)}
                  >
                    {INTERACTION_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Tech Tags (comma separated)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Redis, Caching, Backend, Microservices"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Creator Review Notes / Initial Context</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Seeking feedback on visual clarity and system design depth"
                  value={creatorNotes}
                  onChange={(e) => setCreatorNotes(e.target.value)}
                />
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <label className="form-label">Watch Completion Rate</label>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                    {watchPercentage}%
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={watchPercentage}
                  onChange={(e) => setWatchPercentage(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!title.trim()}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Sparkles size={15} />
                <span>Upload & Run AI Pipeline</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReelUploadModal;
