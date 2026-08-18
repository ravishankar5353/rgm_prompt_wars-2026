import { describe, it, expect } from 'vitest';
import { RecommendationEngine } from '../services/recommendationEngine';
import { PRESET_SCENARIOS } from '../config/constants';

describe('TechReel AI — Required Output Specification & Schema Validation', () => {
  it('strictly conforms to the PromptWars required output field specification', () => {
    const scenario = PRESET_SCENARIOS[0];
    const result = RecommendationEngine.analyzeReels(scenario.reels, 'focus');

    const out = result.requiredOutput;

    // Check all required fields exist and are strings
    expect(typeof out.currentReelReference).toBe('string');
    expect(out.currentReelReference.length).toBeGreaterThan(3);

    expect(typeof out.interestDetected).toBe('string');
    expect(out.interestDetected.length).toBeGreaterThan(3);

    expect(typeof out.whyEvidence).toBe('string');
    expect(out.whyEvidence.length).toBeGreaterThan(5);

    expect(typeof out.recommendedTechReel).toBe('string');
    expect(out.recommendedTechReel.length).toBeGreaterThan(5);

    expect(['AI', 'DSA', 'Java', 'HLD', 'Cybersecurity', 'Cloud', 'Hardware', 'Career', 'Other']).toContain(
      out.category
    );

    expect(typeof out.whyThisRecommendation).toBe('string');
    expect(out.whyThisRecommendation.length).toBeGreaterThan(5);

    expect(['Beginner', 'Intermediate', 'Advanced']).toContain(out.difficulty);
    expect(['High', 'Medium', 'Low']).toContain(out.confidence);
  });

  it('validates that Recommendation DNA scores fall within bounded 0-100% ranges', () => {
    const scenario = PRESET_SCENARIOS[0];
    const result = RecommendationEngine.analyzeReels(scenario.reels, 'focus');
    const dna = result.primaryRecommendation.dna;

    expect(dna.interestMatch).toBeGreaterThanOrEqual(0);
    expect(dna.interestMatch).toBeLessThanOrEqual(100);

    expect(dna.contextMatch).toBeGreaterThanOrEqual(0);
    expect(dna.contextMatch).toBeLessThanOrEqual(100);

    expect(dna.novelty).toBeGreaterThanOrEqual(0);
    expect(dna.novelty).toBeLessThanOrEqual(100);

    expect(dna.learningValue).toBeGreaterThanOrEqual(0);
    expect(dna.learningValue).toBeLessThanOrEqual(100);

    expect(dna.difficultyFit).toBeGreaterThanOrEqual(0);
    expect(dna.difficultyFit).toBeLessThanOrEqual(100);

    expect(['Low', 'Medium', 'High']).toContain(dna.hypeRisk);
  });
});
