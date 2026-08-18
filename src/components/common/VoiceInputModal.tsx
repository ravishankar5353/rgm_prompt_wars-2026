import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Send, X, AlertCircle } from 'lucide-react';
import { AudioService } from '../../services/audioService';
import { useTechReel } from '../../context/TechReelContext';

export const VoiceInputModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { sendChatMessage, setActiveTab } = useTechReel();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [recognitionObj, setRecognitionObj] = useState<any>(null);

  const startVoice = () => {
    setErrorMsg(null);
    setIsListening(true);
    const rec = AudioService.startListening(
      (text) => setTranscript(text),
      (err) => {
        setErrorMsg(err);
        setIsListening(false);
      },
      () => setIsListening(false)
    );
    setRecognitionObj(rec);
  };

  const stopVoice = () => {
    if (recognitionObj) {
      recognitionObj.stop();
    }
    setIsListening(false);
  };

  useEffect(() => {
    if (AudioService.isSpeechSupported()) {
      startVoice();
    } else {
      setErrorMsg('Speech recognition is not supported in this browser. You can type below instead.');
    }
    return () => {
      if (recognitionObj) {
        recognitionObj.stop();
      }
    };
  }, []);

  const handleSend = () => {
    if (transcript.trim()) {
      sendChatMessage(transcript);
      setActiveTab('chat');
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}>
            <Mic size={16} color="var(--accent-primary)" /> Voice Input & Questions
          </h3>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body" style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: isListening ? 'var(--accent-gradient)' : 'var(--bg-tertiary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: isListening ? 'var(--shadow-glow)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onClick={isListening ? stopVoice : startVoice}
          >
            {isListening ? (
              <Mic size={32} color="white" className="animate-pulse" />
            ) : (
              <MicOff size={32} color="var(--text-muted)" />
            )}
          </div>

          <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
            {isListening ? 'Listening... Speak your question or reel description' : 'Click microphone to start speaking'}
          </p>

          {errorMsg && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                color: '#f87171',
                fontSize: '0.78rem',
                marginBottom: '12px',
                textAlign: 'left',
              }}
            >
              <AlertCircle size={14} />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="form-group" style={{ textAlign: 'left' }}>
            <label className="form-label">Recognized Speech / Transcript</label>
            <textarea
              className="form-textarea"
              placeholder="Your spoken words will appear here..."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleSend}
            disabled={!transcript.trim()}
          >
            <Send size={14} />
            <span>Send to Assistant</span>
          </button>
        </div>
      </div>
    </div>
  );
};
