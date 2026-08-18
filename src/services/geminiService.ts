import { GoogleGenerativeAI } from '@google/generative-ai';
import { ReelInteraction } from '../types/reel';
import { AnalysisResult } from '../types/analysis';
import { RecommendationEngine } from './recommendationEngine';
import { getGeminiKey } from '../config/env';

export class GeminiService {
  /**
   * Analyzes reel interactions with Google Gemini AI.
   * If Gemini API key is not present or an API limit occurs,
   * it falls back to the deterministic semantic reasoning engine without throwing.
   */
  public static async analyzeReelsWithGemini(
    reels: ReelInteraction[],
    focusMode: 'focus' | 'explore' = 'focus',
    pastRecommendations: string[] = []
  ): Promise<AnalysisResult> {
    const apiKey = getGeminiKey();

    if (!apiKey) {
      // Return local semantic reasoning engine result directly
      console.info('No Gemini API key detected in environment. Using TechReel Semantic Engine.');
      return RecommendationEngine.analyzeReels(reels, focusMode, pastRecommendations);
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: {
          temperature: focusMode === 'explore' ? 0.6 : 0.2,
          responseMimeType: 'application/json',
        },
      });

      const reelsData = reels.map((r, i) => ({
        index: i + 1,
        title: r.title,
        caption: r.caption,
        category: r.category,
        interactionType: r.interactionType,
        watchPercentage: `${r.watchPercentage}%`,
      }));

      const prompt = `You are TechReel AI, an expert agentic recommendation engine for students.
Your mission: Turn short-form entertainment scrolling into smarter technology discovery.
Do NOT use simple keyword matching.
Understand:
- Underlying semantic topic & context
- Cross-reel relationships (e.g. Java meme + SWE lifestyle + LeetCode joke + Laptop spec comparison => Broad Software Engineering / Distributed Systems / HLD)
- Apparent career and educational aspirations
- Novelty and educational value
- Avoid generic hype (e.g. reject "10 AI tools to get rich").
- Mode: ${focusMode.toUpperCase()} mode.

Analyze these ${reels.length} reel interactions:
${JSON.stringify(reelsData, null, 2)}

Return a strict JSON object with this EXACT structure:
{
  "hiddenInterest": {
    "inferredInterest": "string (broad synthesized interest)",
    "confidence": "High" | "Medium" | "Low",
    "confidenceScore": number (0-100),
    "contributingTopics": ["string", "string"],
    "evidenceCount": number,
    "evidenceSummary": "string",
    "disclaimer": "AI-inferred interest based on cross-reel semantic intent.",
    "isMixedSignal": boolean
  },
  "requiredOutput": {
    "currentReelReference": "string",
    "interestDetected": "string",
    "whyEvidence": "string",
    "recommendedTechReel": "string",
    "category": "AI" | "DSA" | "Java" | "HLD" | "Cybersecurity" | "Cloud" | "Hardware" | "Career" | "Other",
    "whyThisRecommendation": "string",
    "difficulty": "Beginner" | "Intermediate" | "Advanced",
    "confidence": "High" | "Medium" | "Low"
  },
  "primaryRecommendation": {
    "id": "rec-gemini-1",
    "title": "string",
    "category": "AI" | "DSA" | "Java" | "HLD" | "Cybersecurity" | "Cloud" | "Hardware" | "Career" | "Other",
    "description": "string",
    "difficulty": "Beginner" | "Intermediate" | "Advanced",
    "confidence": "High" | "Medium" | "Low",
    "estimatedDuration": "3-5 min reel",
    "keyConcepts": ["concept1", "concept2"],
    "dna": {
      "interestMatch": number (0-100),
      "contextMatch": number (0-100),
      "novelty": number (0-100),
      "learningValue": number (0-100),
      "difficultyFit": number (0-100),
      "hypeRisk": "Low" | "Medium" | "High"
    },
    "whyThisWhyNot": {
      "whyThis": "string",
      "whyNotKeywordRepeat": "string",
      "whyNotGenericHype": "string"
    }
  },
  "alternativeRecommendations": [
    {
      "id": "rec-gemini-alt-1",
      "title": "string",
      "category": "string",
      "description": "string",
      "difficulty": "Intermediate",
      "confidence": "Medium",
      "estimatedDuration": "3 min",
      "keyConcepts": ["concept1"],
      "dna": {
        "interestMatch": 88,
        "contextMatch": 85,
        "novelty": 90,
        "learningValue": 92,
        "difficultyFit": 86,
        "hypeRisk": "Low"
      },
      "whyThisWhyNot": {
        "whyThis": "string",
        "whyNotKeywordRepeat": "string",
        "whyNotGenericHype": "string"
      }
    }
  ],
  "evidenceTrail": [
    {
      "reelTitle": "string",
      "category": "string",
      "signalType": "string",
      "contribution": "string",
      "weight": number (1-10)
    }
  ],
  "saturationAlert": {
    "detected": boolean,
    "saturatedTopic": "string",
    "count": number,
    "message": "string",
    "adjacentExplorationTopics": ["topic1", "topic2"]
  },
  "benchmarkComparison": {
    "keywordApproach": {
      "inputSignals": ["string"],
      "shallowInference": "string",
      "genericRecommendation": "string",
      "flaw": "string",
      "noveltyScore": 15,
      "hypeRisk": "High"
    },
    "agenticApproach": {
      "inputSignals": ["string"],
      "semanticInference": "string",
      "intelligentRecommendation": "string",
      "breakthrough": "string",
      "noveltyScore": 88,
      "hypeRisk": "Low"
    }
  },
  "inferredContentLevel": "Beginner" | "Intermediate" | "Advanced"
}`;

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Gemini API timeout after 10s')), 10000)
      );

      const result = await Promise.race([model.generateContent(prompt), timeoutPromise]);
      const text = result.response.text();
      const parsed = JSON.parse(text);

      // Validate required fields
      if (!parsed.hiddenInterest || !parsed.requiredOutput || !parsed.primaryRecommendation) {
        throw new Error('Malformed Gemini response schema');
      }

      // Construct complete AnalysisResult
      const baseResult = RecommendationEngine.analyzeReels(reels, focusMode, pastRecommendations);

      return {
        id: `gemini-analysis-${Date.now()}`,
        timestamp: Date.now(),
        inputReelCount: reels.length,
        inputReelTitles: reels.map((r) => r.title),
        hiddenInterest: parsed.hiddenInterest || baseResult.hiddenInterest,
        requiredOutput: parsed.requiredOutput || baseResult.requiredOutput,
        primaryRecommendation: parsed.primaryRecommendation || baseResult.primaryRecommendation,
        alternativeRecommendations: parsed.alternativeRecommendations || baseResult.alternativeRecommendations,
        evidenceTrail: parsed.evidenceTrail || baseResult.evidenceTrail,
        interestGraph: baseResult.interestGraph, // Keep deterministic robust graph
        saturationAlert: parsed.saturationAlert || baseResult.saturationAlert,
        benchmarkComparison: parsed.benchmarkComparison || baseResult.benchmarkComparison,
        inferredContentLevel: parsed.inferredContentLevel || baseResult.inferredContentLevel,
        focusMode,
        aiModelUsed: 'Google Gemini 1.5 Flash (Verified Live)',
      };
    } catch (err: any) {
      console.warn('Gemini API request failed or timed out. Gracefully falling back to TechReel Engine:', err);
      const fallback = RecommendationEngine.analyzeReels(reels, focusMode, pastRecommendations);
      fallback.aiModelUsed = 'TechReel Agentic Reasoning (Resilient Fallback)';
      return fallback;
    }
  }

  /**
   * Responds to user chat messages regarding recommendations, reasoning, or tech exploration.
   */
  public static async answerChatQuery(
    userQuery: string,
    currentAnalysis: AnalysisResult | null,
    reels: ReelInteraction[]
  ): Promise<string> {
    const apiKey = getGeminiKey();

    if (!apiKey || !currentAnalysis) {
      return this.generateDeterministicChatResponse(userQuery, currentAnalysis, reels);
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const contextPrompt = `You are TechReel AI, the recommendation and reasoning agent for a student's technology discovery profile.
Current Inferred Interest: ${currentAnalysis.hiddenInterest.inferredInterest}
Current Primary Recommendation: ${currentAnalysis.primaryRecommendation.title} (${currentAnalysis.primaryRecommendation.category})
Evidence: ${currentAnalysis.requiredOutput.whyEvidence}
Reel Inputs: ${reels.map((r) => `${r.title} (${r.category})`).join(', ')}

Student asks: "${userQuery}"

Provide a concise, helpful, intellectually sharp 2-3 paragraph answer explaining your reasoning, suggesting next learning steps, or addressing why this recommendation was chosen over generic keyword matches. Be encouraging, professional, and clear.`;

      const result = await model.generateContent(contextPrompt);
      return result.response.text();
    } catch (err) {
      console.warn('Gemini chat failed, using deterministic response:', err);
      return this.generateDeterministicChatResponse(userQuery, currentAnalysis, reels);
    }
  }

  private static generateDeterministicChatResponse(
    userQuery: string,
    currentAnalysis: AnalysisResult | null,
    reels: ReelInteraction[]
  ): string {
    const q = userQuery.toLowerCase();

    if (!currentAnalysis) {
      return `Welcome to TechReel AI! Please add 3 to 8 reels or load one of our Judge Demo scenarios (such as the Official Judge Trap) to begin semantic cross-reel discovery.`;
    }

    if (q.includes('why hld') || q.includes('why system design') || q.includes('why this')) {
      return `### Why High-Level System Design (HLD)?
We recommended **${currentAnalysis.primaryRecommendation.title}** because your interactions reveal a pattern beyond basic syntax:
1. **Java Runtime Meme**: Demonstrates familiarity with language semantics and runtime debugging.
2. **SWE Lifestyle**: Shows interest in professional production engineering environments.
3. **Coding Interview Challenge**: Highlights active problem-solving and algorithmic thinking.
4. **Dev Machine Spec Comparison**: Signals focus on real-world developer tools and containerization.

Connecting these dots reveals an aspiration for **Software Engineering & Distributed Systems**, making System Design the highest-leverage career milestone.`;
    }

    if (q.includes('why not java') || q.includes('why not another java')) {
      return `### Why Not Another Java Reel?
A shallow keyword matching system sees "Java" in Reel 1 and immediately serves another beginner Java syntax video. 
However:
- You already demonstrated understanding of Java runtime nuances (NullPointerException).
- Serving repetitive syntax creates **topic saturation** and low novelty.
- TechReel AI's goal is to elevate existing scrolling into forward-looking discovery.`;
    }

    if (q.includes('easier') || q.includes('beginner') || q.includes('too hard')) {
      return `### Inferred Content Level Adjustment
Understood! While your interaction metrics suggested an **${currentAnalysis.inferredContentLevel}** level, you can explore introductory visual breakdowns in **Focus Mode** or switch to our foundational DSA walkthrough: **${currentAnalysis.alternativeRecommendations[0]?.title || 'Foundations of Clean Architecture'}**.`;
    }

    if (q.includes('strongest') || q.includes('which interest')) {
      return `### Strongest Inferred Interest
Your strongest detected domain is **${currentAnalysis.hiddenInterest.inferredInterest}** with a confidence score of **${currentAnalysis.hiddenInterest.confidenceScore}%**.
This was synthesized from ${currentAnalysis.evidenceTrail.length} separate interaction signals.`;
    }

    if (q.includes('ai') || q.includes('machine learning')) {
      return `### Exploring AI & Machine Learning
If you would like to pivot toward AI Systems, consider exploring **vLLM Inference Optimization** or **LoRA Fine-Tuning**. You can also try our "What-If Simulator" in the left sidebar to simulate this shift in your interest graph!`;
    }

    return `### TechReel AI Agent Response
Based on your current profile in **${currentAnalysis.hiddenInterest.inferredInterest}**:
- **Primary Recommendation:** ${currentAnalysis.primaryRecommendation.title}
- **Novelty Index:** ${currentAnalysis.primaryRecommendation.dna.novelty}%
- **Educational Value:** ${currentAnalysis.primaryRecommendation.dna.learningValue}%

How would you like to explore next? You can ask for an adjacent topic, adjust difficulty, or try **Explore Mode**!`;
  }
}
