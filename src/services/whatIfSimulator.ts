import { AnalysisResult, HiddenInterestDiscovery, RecommendationCandidate } from '../types/analysis';

export interface WhatIfScenarioOption {
  id: string;
  name: string;
  icon: string;
  description: string;
  simulatedInterest: string;
  simulatedRecommendation: string;
  category: any;
  confidenceShift: string;
  keyConcepts: string[];
}

export const WHAT_IF_OPTIONS: WhatIfScenarioOption[] = [
  {
    id: 'cybersecurity',
    name: 'Cybersecurity & Ethical Hacking',
    icon: '🛡️',
    description: 'Simulate shifting scrolling behavior towards vulnerability research, zero-day exploits, and network packet analysis.',
    simulatedInterest: 'Offensive Security, Penetration Testing & Cryptography',
    simulatedRecommendation: 'Reverse Engineering x86 Binaries with Ghidra & Buffer Overflow Mitigation',
    category: 'Cybersecurity',
    confidenceShift: '+42% Security, -15% Pure Java',
    keyConcepts: ['Binary Exploitation', 'Ghidra Decompiler', 'Stack Canaries', 'Memory Safety in Rust'],
  },
  {
    id: 'cloud-devops',
    name: 'Distributed Cloud & Kubernetes',
    icon: '☁️',
    description: 'Simulate shifting towards Terraform, distributed consensus (Raft/Paxos), and cloud-native microservices.',
    simulatedInterest: 'Site Reliability Engineering & Distributed Systems Infrastructure',
    simulatedRecommendation: 'Building a Zero-Downtime Multi-Region Kubernetes Failover with Envoy Proxy',
    category: 'Cloud',
    confidenceShift: '+55% Cloud Infrastructure, +30% DevOps',
    keyConcepts: ['Service Mesh', 'Envoy Proxy', 'Raft Consensus', 'Multi-Cloud High Availability'],
  },
  {
    id: 'quantum-computing',
    name: 'Quantum Computing & Algorithms',
    icon: '⚛️',
    description: 'Simulate exploring quantum superposition, Qiskit circuits, and Grover’s search algorithm.',
    simulatedInterest: 'Quantum Information Science & Quantum Circuit Design',
    simulatedRecommendation: 'Simulating Shor’s Factoring Algorithm with IBM Qiskit & Quantum Noise Modeling',
    category: 'AI',
    confidenceShift: '+60% Quantum Math, +25% Theoretical CS',
    keyConcepts: ['Qubits & Superposition', 'Qiskit Python SDK', 'Quantum Phase Estimation', 'Error Mitigation'],
  },
  {
    id: 'embedded-robotics',
    name: 'Embedded Systems & Robotics',
    icon: '🤖',
    description: 'Simulate watching microcontrollers, ROS2 robot kinematics, and real-time operating systems (RTOS).',
    simulatedInterest: 'Autonomous Robotics & Embedded RTOS Engineering',
    simulatedRecommendation: 'Writing a Real-Time Motor Control Loop on FreeRTOS with STM32 Microcontrollers',
    category: 'Hardware',
    confidenceShift: '+50% Embedded C, +40% Hardware I/O',
    keyConcepts: ['FreeRTOS Scheduling', 'PWM Motor Drivers', 'ROS2 Navigation', 'SPI/I2C Protocols'],
  },
];

export class WhatIfSimulator {
  public static simulateScenario(
    currentAnalysis: AnalysisResult | null,
    scenarioId: string
  ): AnalysisResult {
    const scenario = WHAT_IF_OPTIONS.find((s) => s.id === scenarioId) || WHAT_IF_OPTIONS[0];

    const baseInterest = currentAnalysis?.hiddenInterest.inferredInterest || 'Software Engineering';

    const simulatedHiddenInterest: HiddenInterestDiscovery = {
      inferredInterest: `${baseInterest} ➔ ${scenario.simulatedInterest}`,
      confidence: 'High',
      confidenceScore: 91,
      contributingTopics: [
        'Historical Profile Signals',
        ...scenario.keyConcepts.slice(0, 3),
      ],
      evidenceCount: (currentAnalysis?.inputReelCount || 4) + 2,
      evidenceSummary: `Simulation: Adding 2 ${scenario.name} interactions pivots your interest graph into advanced ${scenario.category}.`,
      disclaimer: '⚠️ Simulation mode only: Your active profile has not been permanently modified.',
      isMixedSignal: false,
    };

    const simulatedRec: RecommendationCandidate = {
      id: `sim-rec-${Date.now()}`,
      title: scenario.simulatedRecommendation,
      category: scenario.category,
      description: `Simulated top match connecting your current baseline knowledge to ${scenario.name}.`,
      difficulty: 'Advanced',
      confidence: 'High',
      estimatedDuration: '4 min simulated masterclass',
      keyConcepts: scenario.keyConcepts,
      dna: {
        interestMatch: 95,
        contextMatch: 92,
        novelty: 96,
        learningValue: 97,
        difficultyFit: 89,
        hypeRisk: 'Low',
      },
      whyThisWhyNot: {
        whyThis: `Leverages your foundation to cross-pollinate into ${scenario.name}.`,
        whyNotKeywordRepeat: 'Bypasses introductory trivia to expose core domain engineering.',
        whyNotGenericHype: 'Focuses on deep practical implementation.',
      },
    };

    return {
      id: `sim-${Date.now()}`,
      timestamp: Date.now(),
      inputReelCount: (currentAnalysis?.inputReelCount || 4) + 2,
      inputReelTitles: [
        ...(currentAnalysis?.inputReelTitles || ['Recent Interactions']),
        `[Simulated] ${scenario.name} Reel 1`,
        `[Simulated] ${scenario.name} Reel 2`,
      ],
      hiddenInterest: simulatedHiddenInterest,
      requiredOutput: {
        currentReelReference: `Simulated pivot from ${baseInterest}`,
        interestDetected: scenario.simulatedInterest,
        whyEvidence: `Projected trajectory adding ${scenario.name} signals.`,
        recommendedTechReel: simulatedRec.title,
        category: scenario.category,
        whyThisRecommendation: `Accelerates mastery in ${scenario.simulatedInterest}.`,
        difficulty: 'Advanced',
        confidence: 'High',
      },
      primaryRecommendation: simulatedRec,
      alternativeRecommendations: currentAnalysis?.alternativeRecommendations || [],
      evidenceTrail: [
        {
          reelTitle: `[Simulated] ${scenario.name} Interaction 1`,
          category: scenario.category,
          signalType: 'Projected Domain Shift',
          contribution: scenario.confidenceShift,
          weight: 10,
        },
      ],
      interestGraph: {
        nodes: [
          { id: 'tech-root', name: 'Technology', category: 'Root', level: 0, confidence: 100, active: true },
          { id: 'sim-domain', name: scenario.simulatedInterest, category: 'Domain', level: 1, confidence: 91, active: true },
          { id: 'sim-sub', name: scenario.keyConcepts[0], category: 'Concept', level: 2, confidence: 88, active: true },
        ],
        links: [
          { source: 'tech-root', target: 'sim-domain', relationship: 'simulated_projection' },
          { source: 'sim-domain', target: 'sim-sub', relationship: 'simulated_concept' },
        ],
      },
      saturationAlert: { detected: false },
      benchmarkComparison: {
        keywordApproach: {
          inputSignals: [`[Simulated] ${scenario.name}`],
          shallowInference: `Keyword: "${scenario.name}"`,
          genericRecommendation: `Introduction to ${scenario.name} Basics`,
          flaw: 'Surface-level repetition.',
          noveltyScore: 30,
          hypeRisk: 'Medium',
        },
        agenticApproach: {
          inputSignals: [`[Simulated] ${scenario.name}`],
          semanticInference: scenario.simulatedInterest,
          intelligentRecommendation: scenario.simulatedRecommendation,
          breakthrough: 'Projects domain acceleration without starting from scratch.',
          noveltyScore: 96,
          hypeRisk: 'Low',
        },
      },
      inferredContentLevel: 'Advanced',
      focusMode: 'explore',
      aiModelUsed: 'TechReel What-If Predictive Simulator',
      isSimulated: true,
    };
  }
}
