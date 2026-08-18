import { describe, it, expect } from 'vitest';
import { RecommendationEngine } from '../services/recommendationEngine';
import { ReelInteraction } from '../types/reel';

describe('TechReel AI — Topic Saturation and Hype Filtering Tests', () => {
  it('triggers topic saturation when repeated category interactions occur', () => {
    const repetitiveReels: ReelInteraction[] = [
      {
        id: 'r1',
        title: 'Java Basics',
        caption: 'Variables in Java',
        category: 'Coding',
        interactionType: 'Watched',
        watchPercentage: 100,
        timestamp: Date.now(),
      },
      {
        id: 'r2',
        title: 'Java Loops',
        caption: 'For loops in Java',
        category: 'Coding',
        interactionType: 'Watched',
        watchPercentage: 100,
        timestamp: Date.now(),
      },
      {
        id: 'r3',
        title: 'Java OOP',
        caption: 'Classes in Java',
        category: 'Coding',
        interactionType: 'Watched',
        watchPercentage: 100,
        timestamp: Date.now(),
      },
    ];

    const result = RecommendationEngine.analyzeReels(repetitiveReels, 'focus');

    expect(result.saturationAlert.detected).toBe(true);
    expect(result.saturationAlert.saturatedTopic).toBe('Coding');
    expect(result.saturationAlert.adjacentExplorationTopics?.length).toBeGreaterThan(0);
  });

  it('maintains low hype risk and provides explainability reasons', () => {
    const repetitiveReels: ReelInteraction[] = [
      {
        id: 'r1',
        title: 'Java Basics',
        caption: 'Variables',
        category: 'Coding',
        interactionType: 'Watched',
        watchPercentage: 80,
        timestamp: Date.now(),
      },
      {
        id: 'r2',
        title: 'SWE Lifestyle',
        caption: 'Dev day',
        category: 'Career',
        interactionType: 'Watched',
        watchPercentage: 80,
        timestamp: Date.now(),
      },
      {
        id: 'r3',
        title: 'Leetcode Binary Tree',
        caption: 'DSA tree',
        category: 'Coding',
        interactionType: 'Saved',
        watchPercentage: 90,
        timestamp: Date.now(),
      },
    ];

    const result = RecommendationEngine.analyzeReels(repetitiveReels, 'focus');

    expect(result.primaryRecommendation.dna.hypeRisk).toBe('Low');
    expect(result.primaryRecommendation.whyThisWhyNot.whyNotGenericHype.toLowerCase()).toContain('generic');
  });
});
