import { describe, it, expect } from 'vitest';
import { RecommendationEngine } from '../services/recommendationEngine';
import { PRESET_SCENARIOS } from '../config/constants';

describe('TechReel RecommendationEngine — Semantic Cross-Reel Reasoning', () => {
  it('correctly solves the Official Judge Trap without shallow keyword matching', () => {
    const trapScenario = PRESET_SCENARIOS.find((s) => s.id === 'official-trap')!;
    const result = RecommendationEngine.analyzeReels(trapScenario.reels, 'focus');

    // Broader synthesized interest must NOT be simply "Java"
    expect(result.hiddenInterest.inferredInterest.toLowerCase()).toContain('software engineering');
    expect(result.hiddenInterest.confidence).toBe('High');
    expect(result.hiddenInterest.confidenceScore).toBeGreaterThanOrEqual(85);

    // Primary recommendation should be High-Level Design (HLD) or Distributed Systems, NOT generic beginner Java
    expect(result.primaryRecommendation.category).toBe('HLD');
    expect(result.primaryRecommendation.title.toLowerCase()).toContain('high-level design');
    expect(result.primaryRecommendation.title.toLowerCase()).not.toContain('beginner java variables');

    // Required output format must be populated
    expect(result.requiredOutput.interestDetected).toBeTruthy();
    expect(result.requiredOutput.whyEvidence).toBeTruthy();
    expect(result.requiredOutput.recommendedTechReel).toBeTruthy();
    expect(result.requiredOutput.confidence).toBe('High');

    // Why Not explainability should reject keyword repeat and generic hype
    expect(result.primaryRecommendation.whyThisWhyNot.whyNotKeywordRepeat).toBeTruthy();
    expect(result.primaryRecommendation.whyThisWhyNot.whyNotGenericHype).toBeTruthy();
  });

  it('correctly infers AI Systems & Architecture for AI-focused signals', () => {
    const aiScenario = PRESET_SCENARIOS.find((s) => s.id === 'ai-research')!;
    const result = RecommendationEngine.analyzeReels(aiScenario.reels, 'focus');

    expect(result.hiddenInterest.inferredInterest.toLowerCase()).toContain('ai');
    expect(result.primaryRecommendation.category).toBe('AI');
    expect(result.primaryRecommendation.title.toLowerCase()).toContain('vllm');
  });

  it('correctly identifies mixed signals when scrolling lacks a technology core', () => {
    const mixedScenario = PRESET_SCENARIOS.find((s) => s.id === 'mixed-entertainment')!;
    const result = RecommendationEngine.analyzeReels(mixedScenario.reels, 'focus');

    expect(result.hiddenInterest.isMixedSignal).toBe(true);
    expect(result.hiddenInterest.confidence).toBe('Low');
    expect(result.requiredOutput.difficulty).toBe('Beginner');
  });
});
