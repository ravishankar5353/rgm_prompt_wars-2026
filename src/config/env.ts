export const env = {
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || '',
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  IS_DEMO_MODE: import.meta.env.VITE_DEMO_MODE === 'true' || true,
};

export const getGeminiKey = (): string => {
  if (typeof window !== 'undefined') {
    const userEnteredKey = localStorage.getItem('techreel_custom_gemini_key');
    if (userEnteredKey && userEnteredKey.trim().length > 5) {
      return userEnteredKey.trim();
    }
  }
  return env.GEMINI_API_KEY;
};

export const setCustomGeminiKey = (key: string) => {
  if (typeof window !== 'undefined') {
    if (key) {
      localStorage.setItem('techreel_custom_gemini_key', key.trim());
    } else {
      localStorage.removeItem('techreel_custom_gemini_key');
    }
  }
};
