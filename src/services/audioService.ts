export class AudioService {
  /**
   * Checks if browser speech recognition is available.
   */
  public static isSpeechSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  }

  /**
   * Starts listening to user voice and invokes callback with transcript.
   */
  public static startListening(
    onResult: (transcript: string) => void,
    onError: (err: string) => void,
    onEnd: () => void
  ): any {
    if (!this.isSpeechSupported()) {
      onError('Speech recognition is not supported in this browser. Please type your query.');
      return null;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let current = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          current += event.results[i][0].transcript;
        }
        onResult(current);
      };

      recognition.onerror = (event: any) => {
        onError(`Speech recognition error: ${event.error}`);
      };

      recognition.onend = () => {
        onEnd();
      };

      recognition.start();
      return recognition;
    } catch (e: any) {
      onError(`Failed to start speech recognition: ${e.message}`);
      return null;
    }
  }

  /**
   * Speaks out a short text summary using Web Speech Synthesis if available.
   */
  public static speakText(text: string) {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }
}
