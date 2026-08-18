export type RecommendationCategory =
  | 'AI'
  | 'DSA'
  | 'Java'
  | 'HLD'
  | 'Cybersecurity'
  | 'Cloud'
  | 'Hardware'
  | 'Career'
  | 'Other';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type ConfidenceLevel = 'High' | 'Medium' | 'Low';
export type HypeRiskLevel = 'Low' | 'Medium' | 'High';

export interface RecommendationDNA {
  interestMatch: number; // 0-100%
  contextMatch: number;  // 0-100%
  novelty: number;       // 0-100%
  learningValue: number; // 0-100%
  difficultyFit: number; // 0-100%
  hypeRisk: HypeRiskLevel;
}

export interface WhyThisWhyNot {
  whyThis: string;
  whyNotKeywordRepeat: string;
  whyNotGenericHype: string;
}

export interface EvidenceItem {
  reelTitle: string;
  category: string;
  signalType: string;
  contribution: string;
  weight: number; // 1-10
}

export interface RequiredOutputSpecification {
  currentReelReference: string;
  interestDetected: string;
  whyEvidence: string;
  recommendedTechReel: string;
  category: RecommendationCategory;
  whyThisRecommendation: string;
  difficulty: DifficultyLevel;
  confidence: ConfidenceLevel;
}

export interface RecommendationCandidate {
  id: string;
  title: string;
  category: RecommendationCategory;
  description: string;
  difficulty: DifficultyLevel;
  confidence: ConfidenceLevel;
  dna: RecommendationDNA;
  whyThisWhyNot: WhyThisWhyNot;
  estimatedDuration: string;
  keyConcepts: string[];
  sampleVideoThumbnail?: string;
  videoUrl?: string;
}

export interface HiddenInterestDiscovery {
  inferredInterest: string;
  confidence: ConfidenceLevel;
  confidenceScore: number; // 0-100%
  contributingTopics: string[];
  evidenceCount: number;
  evidenceSummary: string;
  disclaimer: string;
  isMixedSignal?: boolean;
}

export interface InterestGraphNode {
  id: string;
  name: string;
  category: string;
  level: number; // 0: Root (Technology), 1: Core Domain (e.g. Software Engineering), 2: Sub-domain (e.g. System Design), 3: Tech Concept (e.g. HLD, DSA)
  confidence: number;
  active?: boolean;
  children?: string[];
}

export interface InterestGraphLink {
  source: string;
  target: string;
  relationship: string;
}

export interface InterestGraphData {
  nodes: InterestGraphNode[];
  links: InterestGraphLink[];
}

export interface SemanticVsKeywordBenchmark {
  keywordApproach: {
    inputSignals: string[];
    shallowInference: string;
    genericRecommendation: string;
    flaw: string;
    noveltyScore: number;
    hypeRisk: string;
  };
  agenticApproach: {
    inputSignals: string[];
    semanticInference: string;
    intelligentRecommendation: string;
    breakthrough: string;
    noveltyScore: number;
    hypeRisk: string;
  };
}

export interface SaturationAlert {
  detected: boolean;
  saturatedTopic?: string;
  count?: number;
  message?: string;
  adjacentExplorationTopics?: string[];
}

export interface AnalysisResult {
  id: string;
  timestamp: number;
  inputReelCount: number;
  inputReelTitles: string[];
  hiddenInterest: HiddenInterestDiscovery;
  requiredOutput: RequiredOutputSpecification;
  primaryRecommendation: RecommendationCandidate;
  alternativeRecommendations: RecommendationCandidate[];
  evidenceTrail: EvidenceItem[];
  interestGraph: InterestGraphData;
  saturationAlert: SaturationAlert;
  benchmarkComparison: SemanticVsKeywordBenchmark;
  inferredContentLevel: DifficultyLevel;
  focusMode: 'focus' | 'explore';
  aiModelUsed: string;
  isSimulated?: boolean;
}
