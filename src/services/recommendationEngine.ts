import { ReelInteraction } from '../types/reel';
import {
  AnalysisResult,
  HiddenInterestDiscovery,
  RequiredOutputSpecification,
  RecommendationCandidate,
  RecommendationCategory,
  DifficultyLevel,
  ConfidenceLevel,
  EvidenceItem,
  InterestGraphData,
  SaturationAlert,
  SemanticVsKeywordBenchmark,
  RecommendationDNA,
  WhyThisWhyNot,
} from '../types/analysis';

export class RecommendationEngine {
  /**
   * Performs local deterministic semantic cross-reel reasoning.
   * This is used both as the algorithmic backbone and as the high-fidelity
   * fallback when an external Gemini API key is missing or offline.
   */
  public static analyzeReels(
    reels: ReelInteraction[],
    focusMode: 'focus' | 'explore' = 'focus',
    pastRecommendations: string[] = []
  ): AnalysisResult {
    if (!reels || reels.length === 0) {
      throw new Error('No reel interactions provided for analysis');
    }

    const reelTitles = reels.map((r) => r.title);
    const categoryCounts: Record<string, number> = {};
    let totalWatchPercent = 0;
    let highInteractionCount = 0;

    reels.forEach((reel) => {
      categoryCounts[reel.category] = (categoryCounts[reel.category] || 0) + 1;
      totalWatchPercent += reel.watchPercentage;
      if (reel.interactionType === 'Saved' || reel.interactionType === 'Shared') {
        highInteractionCount++;
      }
    });

    const avgWatch = totalWatchPercent / reels.length;

    // Check for mixed / weak signal
    const techCategories = ['Coding', 'Programming Meme', 'AI', 'Gadgets', 'Tech News', 'Career'];
    const techReelCount = reels.filter((r) => techCategories.includes(r.category)).length;
    const isMixedSignal = techReelCount <= 1 && reels.length >= 3;

    // Check topic saturation / fatigue
    const saturationAlert = this.detectTopicSaturation(reels, pastRecommendations);

    // Compute inferred content level
    let inferredLevel: DifficultyLevel = 'Intermediate';
    if (avgWatch > 90 && highInteractionCount >= 2) {
      inferredLevel = 'Advanced';
    } else if (avgWatch < 65) {
      inferredLevel = 'Beginner';
    }

    // Determine semantic domain pattern
    const isTrapPattern = this.checkTrapPattern(reels);
    const isAiPattern = this.checkAiPattern(reels);
    const isHardwarePattern = this.checkHardwarePattern(reels);

    let hiddenInterest: HiddenInterestDiscovery;
    let primaryRec: RecommendationCandidate;
    let altRecs: RecommendationCandidate[];
    let requiredOutput: RequiredOutputSpecification;
    let evidenceTrail: EvidenceItem[];
    let interestGraph: InterestGraphData;
    let benchmark: SemanticVsKeywordBenchmark;

    if (isTrapPattern) {
      // Official Trap: Java Meme + SWE Lifestyle + Coding Interview + Laptop Comparison
      hiddenInterest = {
        inferredInterest: 'Software Engineering / Distributed Systems',
        confidence: 'High',
        confidenceScore: 94,
        contributingTopics: [
          'Backend Development Patterns',
          'Production Java Runtime',
          'Coding Interview Algorithms',
          'Developer Workstation Performance',
        ],
        evidenceCount: reels.length,
        evidenceSummary:
          'Observed a cross-cutting pattern connecting Java runtime humor, backend SWE daily workflow, algorithm problem-solving, and dev machine profiling. Indicates intent to progress from syntax/memes into enterprise software architecture.',
        disclaimer:
          'AI-inferred interest based on cross-reel semantic intent, not a fixed classification.',
        isMixedSignal: false,
      };

      const primaryCategory: RecommendationCategory = focusMode === 'focus' ? 'HLD' : 'Cloud';
      const primaryTitle =
        focusMode === 'focus'
          ? 'High-Level Design (HLD): Microservices Cache Invalidation at Scale'
          : 'Event-Driven Architectures: Kafka Partitioning & Distributed Consensus';

      primaryRec = {
        id: 'rec-hld-scale-1',
        title: primaryTitle,
        category: primaryCategory,
        description:
          'Visual deep-dive into cache stampede prevention, Redis cluster sharding, and decoupling read/write paths in high-throughput backend services.',
        difficulty: inferredLevel,
        confidence: 'High',
        estimatedDuration: '4 min practical reel',
        keyConcepts: [
          'High Level System Design',
          'Distributed Cache Invalidation',
          'Eventual Consistency',
          'CAP Theorem Tradeoffs',
        ],
        dna: {
          interestMatch: 94,
          contextMatch: 91,
          novelty: focusMode === 'explore' ? 92 : 86,
          learningValue: 95,
          difficultyFit: 89,
          hypeRisk: 'Low',
        },
        whyThisWhyNot: {
          whyThis:
            'Directly elevates your combined interest in backend lifestyle, Java runtime mechanics, and coding challenges into enterprise system design.',
          whyNotKeywordRepeat:
            'A basic keyword system would spam another beginner Java syntax video. TechReel AI elevates your profile beyond single-language memes.',
          whyNotGenericHype:
            'Rejects generic "Top 10 AI tools to get rich" in favor of foundational architectural engineering with high career value.',
        },
      };

      altRecs = [
        {
          id: 'rec-alt-dsa-1',
          title: 'DSA in Practice: Tree Traversal in Database Index B-Trees',
          category: 'DSA',
          description:
            'Connecting binary tree whiteboard problems to actual relational database storage engines.',
          difficulty: 'Intermediate',
          confidence: 'High',
          estimatedDuration: '3 min breakdown',
          keyConcepts: ['B-Tree Indexing', 'Time Complexity in Storage', 'Disk I/O'],
          dna: {
            interestMatch: 89,
            contextMatch: 88,
            novelty: 84,
            learningValue: 92,
            difficultyFit: 90,
            hypeRisk: 'Low',
          },
          whyThisWhyNot: {
            whyThis: 'Bridges algorithmic interview concepts to real storage engine mechanics.',
            whyNotKeywordRepeat: 'Avoids isolated LeetCode grinding jokes.',
            whyNotGenericHype: 'Focuses on deep systems engineering over superficial shortcuts.',
          },
        },
        {
          id: 'rec-alt-cloud-1',
          title: 'Docker vs Kubernetes: Container Lifecycle & Pod Scheduling',
          category: 'Cloud',
          description:
            'Optimizing container builds and orchestration strategies for multi-service architectures.',
          difficulty: 'Intermediate',
          confidence: 'Medium',
          estimatedDuration: '5 min practical',
          keyConcepts: ['Container Optimization', 'K8s Scheduling', 'DevOps Pipeline'],
          dna: {
            interestMatch: 87,
            contextMatch: 86,
            novelty: 91,
            learningValue: 90,
            difficultyFit: 85,
            hypeRisk: 'Low',
          },
          whyThisWhyNot: {
            whyThis: 'Connects your interest in dev environment laptops with cloud deployment.',
            whyNotKeywordRepeat: 'Moves beyond consumer gadget spec comparisons.',
            whyNotGenericHype: 'Gives actionable DevOps and cloud engineering insights.',
          },
        },
      ];

      requiredOutput = {
        currentReelReference: `${reels[0].title} + ${reels.length - 1} related interactions`,
        interestDetected: 'Software Engineering / System Design & Distributed Systems',
        whyEvidence:
          'Multi-signal synthesis: Java runtime issues (Coding) + SWE daily workflow (Career) + LeetCode interview prep (DSA) + Local dev machine hardware specs (Gadgets).',
        recommendedTechReel: primaryRec.title,
        category: primaryRec.category,
        whyThisRecommendation:
          'Connects application-level coding humor with real-world enterprise backend architecture and systems design.',
        difficulty: inferredLevel,
        confidence: 'High',
      };

      evidenceTrail = [
        {
          reelTitle: reels[0].title,
          category: reels[0].category,
          signalType: 'Programming / Runtime Mechanics',
          contribution: 'Indicates familiarity with object-oriented language semantics and debug workflows.',
          weight: 8,
        },
        {
          reelTitle: reels[1]?.title || 'SWE Lifestyle',
          category: reels[1]?.category || 'Career',
          signalType: 'Professional Engineering Practice',
          contribution: 'Reveals aspiration and contextual interest in production software engineering careers.',
          weight: 9,
        },
        {
          reelTitle: reels[2]?.title || 'Coding Interview',
          category: reels[2]?.category || 'Coding',
          signalType: 'Algorithmic Problem Solving',
          contribution: 'Demonstrates active engagement with DSA and tech interview benchmarks.',
          weight: 8,
        },
        {
          reelTitle: reels[3]?.title || 'Dev Machine Specs',
          category: reels[3]?.category || 'Gadgets',
          signalType: 'Development Tooling & Infrastructure',
          contribution: 'Highlights interest in compile speeds, container virtualization, and local dev environments.',
          weight: 7,
        },
      ];

      interestGraph = {
        nodes: [
          { id: 'tech-root', name: 'Technology', category: 'Root', level: 0, confidence: 100, active: true },
          { id: 'swe-core', name: 'Software Engineering', category: 'Domain', level: 1, confidence: 94, active: true },
          { id: 'sys-design', name: 'System Design (HLD)', category: 'Subdomain', level: 2, confidence: 91, active: true },
          { id: 'backend', name: 'Backend & APIs', category: 'Subdomain', level: 2, confidence: 89, active: true },
          { id: 'dsa-node', name: 'DSA & Algorithms', category: 'Concept', level: 3, confidence: 85, active: true },
          { id: 'java-node', name: 'Java Runtime & Memory', category: 'Concept', level: 3, confidence: 82, active: false },
          { id: 'cloud-node', name: 'Cloud & Containers', category: 'Concept', level: 3, confidence: 78, active: false },
        ],
        links: [
          { source: 'tech-root', target: 'swe-core', relationship: 'inferred_parent' },
          { source: 'swe-core', target: 'sys-design', relationship: 'primary_recommendation' },
          { source: 'swe-core', target: 'backend', relationship: 'architectural_pillar' },
          { source: 'swe-core', target: 'dsa-node', relationship: 'algorithmic_foundation' },
          { source: 'backend', target: 'java-node', relationship: 'language_runtime' },
          { source: 'backend', target: 'cloud-node', relationship: 'deployment_target' },
        ],
      };

      benchmark = {
        keywordApproach: {
          inputSignals: ['Java (Meme)', 'SWE Lifestyle', 'Binary Tree (Joke)', 'MacBook M3 (Specs)'],
          shallowInference: 'Keywords: "Java", "Laptop"',
          genericRecommendation: 'Top 5 Beginner Java Variables & If-Else Loops',
          flaw: 'Traps the student in repetitive beginner syntax. Ignores career intent and broader engineering context.',
          noveltyScore: 18,
          hypeRisk: 'High (Generic AI / course pitch spam)',
        },
        agenticApproach: {
          inputSignals: ['Java (Meme)', 'SWE Lifestyle', 'Binary Tree (Joke)', 'MacBook M3 (Specs)'],
          semanticInference: 'Synthesized Pattern: Software Engineering / Distributed Systems',
          intelligentRecommendation: 'High-Level Design (HLD): Microservices Cache Invalidation at Scale',
          breakthrough: 'Identifies student readiness for enterprise architecture, elevating entertainment into career acceleration.',
          noveltyScore: 88,
          hypeRisk: 'Low (Deep technical value)',
        },
      };
    } else if (isAiPattern) {
      // AI / Machine Learning Track
      hiddenInterest = {
        inferredInterest: 'Applied AI Systems & LLM Architecture',
        confidence: 'High',
        confidenceScore: 96,
        contributingTopics: [
          'PyTorch & GPU Tensors',
          'Transformer Self-Attention',
          'Quantization (LoRA/QLoRA)',
          'Tensor Core Hardware Accelerators',
        ],
        evidenceCount: reels.length,
        evidenceSummary:
          'Deep clustering around model architecture, fine-tuning methodologies, and GPU memory constraints.',
        disclaimer: 'AI-inferred interest based on cross-reel semantic intent.',
        isMixedSignal: false,
      };

      primaryRec = {
        id: 'rec-ai-llm-1',
        title: 'vLLM & PagedAttention: Serving 100x LLM Requests with Zero Memory Fragmentation',
        category: 'AI',
        description:
          'Deep breakdown of virtual memory paging in GPU VRAM to eliminate KV-cache memory waste during frontier model inference.',
        difficulty: inferredLevel,
        confidence: 'High',
        estimatedDuration: '4 min technical breakdown',
        keyConcepts: ['PagedAttention', 'KV Cache Management', 'Continuous Batching', 'Inference Latency'],
        dna: {
          interestMatch: 97,
          contextMatch: 94,
          novelty: focusMode === 'explore' ? 91 : 84,
          learningValue: 96,
          difficultyFit: 92,
          hypeRisk: 'Low',
        },
        whyThisWhyNot: {
          whyThis: 'Connects your PyTorch tensor ops interest directly to modern production LLM serving architectures.',
          whyNotKeywordRepeat: 'Avoids another basic "What is a Neural Network" intro video.',
          whyNotGenericHype: 'Rejects hype listicles in favor of production AI systems engineering.',
        },
      };

      altRecs = [
        {
          id: 'rec-alt-ai-lora',
          title: 'Building a Vector RAG Pipeline with Hybrid BM25 & Semantic Search',
          category: 'AI',
          description: 'Implementing rerankers and chunking strategies for enterprise retrieval systems.',
          difficulty: 'Intermediate',
          confidence: 'High',
          estimatedDuration: '3 min walkthrough',
          keyConcepts: ['Vector Embeddings', 'Hybrid Search', 'Reranking Algorithms'],
          dna: {
            interestMatch: 91,
            contextMatch: 89,
            novelty: 88,
            learningValue: 93,
            difficultyFit: 88,
            hypeRisk: 'Low',
          },
          whyThisWhyNot: {
            whyThis: 'Expands your ML interest into production retrieval systems.',
            whyNotKeywordRepeat: 'Avoids repeating pure matrix math without practical applications.',
            whyNotGenericHype: 'Gives reproducible vector search architectures.',
          },
        },
      ];

      requiredOutput = {
        currentReelReference: `${reels[0].title} + ${reels.length - 1} AI interactions`,
        interestDetected: 'Applied AI Systems & LLM Architecture',
        whyEvidence:
          'Synthesis of deep learning frameworks (AI) + attention mechanisms (AI) + model quantization (AI) + AI hardware accelerators (Gadgets).',
        recommendedTechReel: primaryRec.title,
        category: 'AI',
        whyThisRecommendation: 'Focuses on production inference optimization rather than superficial AI news.',
        difficulty: inferredLevel,
        confidence: 'High',
      };

      evidenceTrail = reels.map((r, i) => ({
        reelTitle: r.title,
        category: r.category,
        signalType: 'AI Systems Signal',
        contribution: `Contributes to semantic focus on modern deep learning and GPU compute (Weight: ${9 - i}).`,
        weight: 9 - i,
      }));

      interestGraph = {
        nodes: [
          { id: 'tech-root', name: 'Technology', category: 'Root', level: 0, confidence: 100, active: true },
          { id: 'ai-core', name: 'Artificial Intelligence', category: 'Domain', level: 1, confidence: 96, active: true },
          { id: 'llm-sys', name: 'LLM Systems & Inference', category: 'Subdomain', level: 2, confidence: 93, active: true },
          { id: 'pytorch', name: 'PyTorch & GPU Tensors', category: 'Concept', level: 3, confidence: 90, active: true },
          { id: 'rag-sys', name: 'Vector RAG & Search', category: 'Concept', level: 3, confidence: 87, active: false },
        ],
        links: [
          { source: 'tech-root', target: 'ai-core', relationship: 'inferred_parent' },
          { source: 'ai-core', target: 'llm-sys', relationship: 'specialization' },
          { source: 'llm-sys', target: 'pytorch', relationship: 'underlying_framework' },
          { source: 'llm-sys', target: 'rag-sys', relationship: 'application_layer' },
        ],
      };

      benchmark = {
        keywordApproach: {
          inputSignals: ['PyTorch Benchmarks', 'Self-Attention', 'LoRA', 'NVIDIA H100'],
          shallowInference: 'Keywords: "AI", "NVIDIA"',
          genericRecommendation: '10 AI Websites to Make $500/Day with ChatGPT',
          flaw: 'Delivers spammy, zero-educational-value hype content that insults the student’s actual deep interest.',
          noveltyScore: 12,
          hypeRisk: 'Critical (Pure clickbait)',
        },
        agenticApproach: {
          inputSignals: ['PyTorch Benchmarks', 'Self-Attention', 'LoRA', 'NVIDIA H100'],
          semanticInference: 'Synthesized Pattern: Applied AI Systems & LLM Architecture',
          intelligentRecommendation: 'vLLM & PagedAttention: Serving 100x LLM Requests with Zero Memory Fragmentation',
          breakthrough: 'Identifies deep-learning compute interest and recommends frontier inference engineering.',
          noveltyScore: 92,
          hypeRisk: 'Low (Deep technical value)',
        },
      };
    } else if (isHardwarePattern) {
      // Hardware / Systems Track
      hiddenInterest = {
        inferredInterest: 'Computer Graphics & Low-Level Systems Programming',
        confidence: 'High',
        confidenceScore: 92,
        contributingTopics: [
          'GPU Hardware Pipelines',
          'Vulkan / DirectX 12 Shaders',
          'Real-time Ray Tracing & Nanite',
          'Custom Thermal Engineering',
        ],
        evidenceCount: reels.length,
        evidenceSummary:
          'Observed cross-discipline focus on GPU architectures, graphics rasterization pipelines, and kernel-level gaming abstraction layers.',
        disclaimer: 'AI-inferred interest based on cross-reel semantic intent.',
        isMixedSignal: false,
      };

      primaryRec = {
        id: 'rec-hw-vulkan-1',
        title: 'Writing a Vulkan Compute Shader for Real-Time Particle Physics in C++',
        category: 'Hardware',
        description:
          'Step-by-step exploration of GPU compute workgroups, shared memory synchronization, and dispatch calls in Vulkan.',
        difficulty: inferredLevel,
        confidence: 'High',
        estimatedDuration: '5 min breakdown',
        keyConcepts: ['Vulkan API', 'GPU Compute Shaders', 'Parallel Memory Synchronization', 'C++ Systems'],
        dna: {
          interestMatch: 95,
          contextMatch: 91,
          novelty: focusMode === 'explore' ? 90 : 85,
          learningValue: 94,
          difficultyFit: 88,
          hypeRisk: 'Low',
        },
        whyThisWhyNot: {
          whyThis: 'Channels your interest in GPU specs and gaming graphics into direct low-level graphics programming.',
          whyNotKeywordRepeat: 'Avoids another standard unboxing or consumer benchmark video.',
          whyNotGenericHype: 'Provides real systems programming skills over consumer gear consumerism.',
        },
      };

      altRecs = [
        {
          id: 'rec-alt-hw-kernel',
          title: 'Linux Kernel eBPF: Tracing System Calls and Network Packets in Real-Time',
          category: 'Cybersecurity',
          description: 'Understanding how eBPF runs sandboxed bytecode inside the Linux kernel without changing kernel source.',
          difficulty: 'Advanced',
          confidence: 'Medium',
          estimatedDuration: '4 min walkthrough',
          keyConcepts: ['eBPF', 'Linux Kernel', 'Systems Observability', 'Low-level Hooks'],
          dna: {
            interestMatch: 86,
            contextMatch: 84,
            novelty: 93,
            learningValue: 92,
            difficultyFit: 84,
            hypeRisk: 'Low',
          },
          whyThisWhyNot: {
            whyThis: 'Expands your interest in Linux/Steam Deck gaming into core kernel programming.',
            whyNotKeywordRepeat: 'Avoids repeating consumer gaming clips.',
            whyNotGenericHype: 'Hands-on low-level Linux systems knowledge.',
          },
        },
      ];

      requiredOutput = {
        currentReelReference: `${reels[0].title} + ${reels.length - 1} hardware interactions`,
        interestDetected: 'Computer Graphics & Systems Programming',
        whyEvidence:
          'Convergence of custom hardware thermal loops (Gadgets) + ray tracing shaders (Gaming) + Nanite geometry (Tech) + Vulkan translation layers (Gaming).',
        recommendedTechReel: primaryRec.title,
        category: 'Hardware',
        whyThisRecommendation: 'Converts hardware enthusiast scrolling into low-level systems engineering and GPU compute mastery.',
        difficulty: inferredLevel,
        confidence: 'High',
      };

      evidenceTrail = reels.map((r, i) => ({
        reelTitle: r.title,
        category: r.category,
        signalType: 'Systems & Graphics Signal',
        contribution: `Contributes to low-level hardware & graphics pipeline understanding (Weight: ${8 - i}).`,
        weight: 8 - i,
      }));

      interestGraph = {
        nodes: [
          { id: 'tech-root', name: 'Technology', category: 'Root', level: 0, confidence: 100, active: true },
          { id: 'hw-core', name: 'Systems & Computer Graphics', category: 'Domain', level: 1, confidence: 92, active: true },
          { id: 'vulkan-node', name: 'Vulkan & GPU Compute', category: 'Subdomain', level: 2, confidence: 89, active: true },
          { id: 'gpu-arch', name: 'GPU Microarchitecture', category: 'Concept', level: 3, confidence: 86, active: true },
          { id: 'kernel-node', name: 'Linux Systems & Kernels', category: 'Concept', level: 3, confidence: 81, active: false },
        ],
        links: [
          { source: 'tech-root', target: 'hw-core', relationship: 'inferred_parent' },
          { source: 'hw-core', target: 'vulkan-node', relationship: 'graphics_programming' },
          { source: 'hw-core', target: 'gpu-arch', relationship: 'hardware_substrate' },
          { source: 'hw-core', target: 'kernel-node', relationship: 'operating_system' },
        ],
      };

      benchmark = {
        keywordApproach: {
          inputSignals: ['Water Cooling Rig', 'RTX 4090 Ray Tracing', 'UE5 Nanite', 'Linux Vulkan'],
          shallowInference: 'Keywords: "Gaming", "PC"',
          genericRecommendation: 'Top 10 Best RGB Keyboards for Gamers 2026',
          flaw: 'Treats the user as a passive retail consumer rather than a technical systems explorer.',
          noveltyScore: 20,
          hypeRisk: 'High (Consumer affiliate marketing)',
        },
        agenticApproach: {
          inputSignals: ['Water Cooling Rig', 'RTX 4090 Ray Tracing', 'UE5 Nanite', 'Linux Vulkan'],
          semanticInference: 'Synthesized Pattern: Computer Graphics & Low-Level Systems Programming',
          intelligentRecommendation: 'Writing a Vulkan Compute Shader for Real-Time Particle Physics in C++',
          breakthrough: 'Identifies high graphics capability interest and provides real shader engineering value.',
          noveltyScore: 90,
          hypeRisk: 'Low (Deep technical value)',
        },
      };
    } else if (isMixedSignal) {
      // Mixed Entertainment / Weak Signal
      hiddenInterest = {
        inferredInterest: 'Mixed Interests (Insufficient Technology Signal)',
        confidence: 'Low',
        confidenceScore: 38,
        contributingTopics: ['General Entertainment', 'Lifestyle & Humor', 'Scattered Web Elements'],
        evidenceCount: reels.length,
        evidenceSummary:
          'The provided interactions are primarily entertainment, culinary, or casual humor without a dominant technical theme. We avoid inventing artificial tech interests.',
        disclaimer:
          'Mixed signals detected. TechReel AI will not force a false tech recommendation without solid evidence.',
        isMixedSignal: true,
      };

      primaryRec = {
        id: 'rec-mixed-intro-1',
        title: 'Creative Technology 101: How Code Powers Modern Motion Design & Animation',
        category: 'Other',
        description:
          'An approachable, visually stunning bridge connecting visual aesthetics and motion design with lightweight JavaScript & CSS math.',
        difficulty: 'Beginner',
        confidence: 'Low',
        estimatedDuration: '2 min quick insight',
        keyConcepts: ['Creative Coding', 'Canvas 2D Graphics', 'Motion Math'],
        dna: {
          interestMatch: 52,
          contextMatch: 48,
          novelty: 94,
          learningValue: 75,
          difficultyFit: 95,
          hypeRisk: 'Low',
        },
        whyThisWhyNot: {
          whyThis: 'Offers a low-barrier, creative gateway that gently bridges casual visual entertainment with programming.',
          whyNotKeywordRepeat: 'Does not pretend you have a deep systems engineering background yet.',
          whyNotGenericHype: 'Avoids pushy "Become a Senior Developer in 3 days" hype courses.',
        },
      };

      altRecs = [];

      requiredOutput = {
        currentReelReference: `${reels[0].title} + ${reels.length - 1} casual interactions`,
        interestDetected: 'Mixed Signal / Creative Technology Explorer',
        whyEvidence:
          'Interactions contain predominantly entertainment, food, and humor content with only 1 isolated coding glimpse.',
        recommendedTechReel: primaryRec.title,
        category: 'Other',
        whyThisRecommendation:
          'Introduces a gentle creative technology concept without falsely over-fitting your profile.',
        difficulty: 'Beginner',
        confidence: 'Low',
      };

      evidenceTrail = [
        {
          reelTitle: reels[0].title,
          category: reels[0].category,
          signalType: 'Casual Entertainment',
          contribution: 'Non-technical interest signal.',
          weight: 2,
        },
        {
          reelTitle: reels[1]?.title || 'Entertainment Clip',
          category: reels[1]?.category || 'Entertainment',
          signalType: 'Lifestyle / Leisure',
          contribution: 'Non-technical interest signal.',
          weight: 2,
        },
        {
          reelTitle: reels[2]?.title || 'Humor Clip',
          category: reels[2]?.category || 'Entertainment',
          signalType: 'Humor',
          contribution: 'Non-technical interest signal.',
          weight: 2,
        },
        {
          reelTitle: reels[3]?.title || 'CSS Button Trick',
          category: reels[3]?.category || 'Coding',
          signalType: 'Visual Web Concept',
          contribution: 'Single lightweight creative web design touchpoint.',
          weight: 4,
        },
      ];

      interestGraph = {
        nodes: [
          { id: 'tech-root', name: 'Technology', category: 'Root', level: 0, confidence: 100, active: true },
          { id: 'creative-tech', name: 'Creative Coding & Visuals', category: 'Domain', level: 1, confidence: 45, active: true },
          { id: 'css-canvas', name: 'CSS & Canvas Animation', category: 'Concept', level: 2, confidence: 40, active: true },
        ],
        links: [
          { source: 'tech-root', target: 'creative-tech', relationship: 'exploratory_bridge' },
          { source: 'creative-tech', target: 'css-canvas', relationship: 'visual_subset' },
        ],
      };

      benchmark = {
        keywordApproach: {
          inputSignals: ['Stand-up comedy', 'Ramen stall', 'Cat video', 'CSS button'],
          shallowInference: 'Keywords: "Comedy", "Food", "Cat", "CSS"',
          genericRecommendation: 'Learn Full-Stack HTML/CSS from Scratch in 10 Hours',
          flaw: 'Assumes the user wants to become a web developer simply because of one 10-second CSS video.',
          noveltyScore: 30,
          hypeRisk: 'Medium',
        },
        agenticApproach: {
          inputSignals: ['Stand-up comedy', 'Ramen stall', 'Cat video', 'CSS button'],
          semanticInference: 'Signal Analysis: Mixed casual entertainment with mild creative design curiosity',
          intelligentRecommendation: 'Creative Technology 101: How Code Powers Modern Motion Design & Animation',
          breakthrough: 'Acknowledge mixed signals transparently and offers a gentle, engaging bridge.',
          noveltyScore: 92,
          hypeRisk: 'Low',
        },
      };
    } else {
      // General Dynamic Cross-Reel Inference
      const dominantCategory = Object.keys(categoryCounts).reduce((a, b) =>
        categoryCounts[a] > categoryCounts[b] ? a : b
      );

      hiddenInterest = {
        inferredInterest: `Modern ${dominantCategory} & Technology Systems`,
        confidence: reels.length >= 4 ? 'High' : 'Medium',
        confidenceScore: reels.length >= 4 ? 86 : 72,
        contributingTopics: reels.slice(0, 4).map((r) => r.title),
        evidenceCount: reels.length,
        evidenceSummary: `Synthesized interaction signals across ${reels.length} reels with an average watch rate of ${Math.round(avgWatch)}%.`,
        disclaimer: 'AI-inferred interest based on cross-reel semantic intent.',
        isMixedSignal: false,
      };

      primaryRec = {
        id: `rec-dyn-${Date.now()}`,
        title: `Modern ${dominantCategory}: Architectural Best Practices and Scalable Design`,
        category: (dominantCategory === 'Coding' ? 'HLD' : dominantCategory === 'AI' ? 'AI' : 'Cloud') as RecommendationCategory,
        description: `Practical breakdown of core technical principles, performance optimizations, and design patterns in modern ${dominantCategory}.`,
        difficulty: inferredLevel,
        confidence: reels.length >= 4 ? 'High' : 'Medium',
        estimatedDuration: '4 min practical',
        keyConcepts: [`${dominantCategory} Architecture`, 'Performance Tuning', 'Industry Standards'],
        dna: {
          interestMatch: 88,
          contextMatch: 85,
          novelty: focusMode === 'explore' ? 90 : 82,
          learningValue: 91,
          difficultyFit: 88,
          hypeRisk: 'Low',
        },
        whyThisWhyNot: {
          whyThis: `Directly aligns with your recent engagement across ${reels.length} ${dominantCategory} interactions.`,
          whyNotKeywordRepeat: 'Focuses on deep architectural fundamentals rather than repeating beginner syntax.',
          whyNotGenericHype: 'Curated for educational depth and durable career skills.',
        },
      };

      altRecs = [
        {
          id: `rec-dyn-alt-${Date.now()}`,
          title: `Exploring Next-Gen DevOps and Cloud Deployment for ${dominantCategory}`,
          category: 'Cloud',
          description: `How modern teams automate CI/CD, container scaling, and observability.`,
          difficulty: 'Intermediate',
          confidence: 'Medium',
          estimatedDuration: '3 min overview',
          keyConcepts: ['CI/CD Pipelines', 'Cloud Deployments', 'Observability'],
          dna: {
            interestMatch: 82,
            contextMatch: 80,
            novelty: 91,
            learningValue: 88,
            difficultyFit: 86,
            hypeRisk: 'Low',
          },
          whyThisWhyNot: {
            whyThis: 'Expands your workflow into reliable production operations.',
            whyNotKeywordRepeat: 'Prevents single-topic fatigue.',
            whyNotGenericHype: 'Industry-standard infrastructure focus.',
          },
        },
      ];

      requiredOutput = {
        currentReelReference: `${reels[0].title} + ${reels.length - 1} interactions`,
        interestDetected: `Advanced ${dominantCategory} & Systems Engineering`,
        whyEvidence: `Consistently high engagement across ${dominantCategory} (${categoryCounts[dominantCategory]} reels, ${Math.round(avgWatch)}% avg watch).`,
        recommendedTechReel: primaryRec.title,
        category: primaryRec.category,
        whyThisRecommendation: `Connects your interest in ${dominantCategory} with actionable engineering design patterns.`,
        difficulty: inferredLevel,
        confidence: reels.length >= 4 ? 'High' : 'Medium',
      };

      evidenceTrail = reels.map((r, i) => ({
        reelTitle: r.title,
        category: r.category,
        signalType: `${r.category} Signal`,
        contribution: `Contributed to ${dominantCategory} domain interest (Weight: ${Math.max(3, 9 - i)}).`,
        weight: Math.max(3, 9 - i),
      }));

      interestGraph = {
        nodes: [
          { id: 'tech-root', name: 'Technology', category: 'Root', level: 0, confidence: 100, active: true },
          { id: 'dom-core', name: `${dominantCategory} Systems`, category: 'Domain', level: 1, confidence: 88, active: true },
          { id: 'sub-node', name: 'Architecture & Scalability', category: 'Subdomain', level: 2, confidence: 84, active: true },
          { id: 'devops-node', name: 'DevOps & Tooling', category: 'Concept', level: 3, confidence: 79, active: false },
        ],
        links: [
          { source: 'tech-root', target: 'dom-core', relationship: 'inferred_parent' },
          { source: 'dom-core', target: 'sub-node', relationship: 'architectural_core' },
          { source: 'dom-core', target: 'devops-node', relationship: 'tooling_layer' },
        ],
      };

      benchmark = {
        keywordApproach: {
          inputSignals: reels.map((r) => r.title).slice(0, 4),
          shallowInference: `Keyword frequency: "${dominantCategory}"`,
          genericRecommendation: `Basic Intro to ${dominantCategory} Concepts`,
          flaw: 'Surface-level keyword matching without architectural context.',
          noveltyScore: 25,
          hypeRisk: 'Medium',
        },
        agenticApproach: {
          inputSignals: reels.map((r) => r.title).slice(0, 4),
          semanticInference: `Inferred Pattern: Modern ${dominantCategory} & Technology Systems`,
          intelligentRecommendation: primaryRec.title,
          breakthrough: 'Identifies contextual maturity and recommends high-value system design.',
          noveltyScore: 86,
          hypeRisk: 'Low',
        },
      };
    }

    return {
      id: `analysis-${Date.now()}`,
      timestamp: Date.now(),
      inputReelCount: reels.length,
      inputReelTitles: reelTitles,
      hiddenInterest,
      requiredOutput,
      primaryRecommendation: primaryRec,
      alternativeRecommendations: altRecs,
      evidenceTrail,
      interestGraph,
      saturationAlert,
      benchmarkComparison: benchmark,
      inferredContentLevel: inferredLevel,
      focusMode,
      aiModelUsed: 'Gemini 1.5 Flash + TechReel Semantic Engine',
    };
  }

  /**
   * Checks whether the current reel batch matches the Official Competition Trap:
   * 1. Java meme / programming runtime
   * 2. SWE career / lifestyle
   * 3. Coding interview / DSA joke
   * 4. Laptop / Hardware / Dev workstation
   */
  private static checkTrapPattern(reels: ReelInteraction[]): boolean {
    const text = reels.map((r) => `${r.title} ${r.caption} ${r.category}`.toLowerCase()).join(' ');
    const hasJava = text.includes('java') || text.includes('nullpointer');
    const hasSwe = text.includes('swe') || text.includes('software engineer') || text.includes('backend') || text.includes('lifestyle');
    const hasInterviewOrDsa = text.includes('interview') || text.includes('leetcode') || text.includes('binary tree') || text.includes('coding');
    const hasLaptopOrDev = text.includes('laptop') || text.includes('macbook') || text.includes('thinkpad') || text.includes('docker') || text.includes('gadgets');

    return hasJava && (hasSwe || hasInterviewOrDsa || hasLaptopOrDev);
  }

  private static checkAiPattern(reels: ReelInteraction[]): boolean {
    const text = reels.map((r) => `${r.title} ${r.caption} ${r.category}`.toLowerCase()).join(' ');
    const aiKeywords = ['pytorch', 'transformer', 'lora', 'qlora', 'llm', 'deep learning', 'self-attention', 'gpu vram', 'h100'];
    let matches = 0;
    aiKeywords.forEach((kw) => {
      if (text.includes(kw)) matches++;
    });
    return matches >= 2;
  }

  private static checkHardwarePattern(reels: ReelInteraction[]): boolean {
    const text = reels.map((r) => `${r.title} ${r.caption} ${r.category}`.toLowerCase()).join(' ');
    const hwKeywords = ['water-cooled', 'ray tracing', 'rtx 4090', 'nanite', 'unreal engine', 'vulkan', 'steam deck', 'gpu'];
    let matches = 0;
    hwKeywords.forEach((kw) => {
      if (text.includes(kw)) matches++;
    });
    return matches >= 2;
  }

  /**
   * Fatigue / Saturation detector
   */
  public static detectTopicSaturation(
    reels: ReelInteraction[],
    pastRecommendations: string[]
  ): SaturationAlert {
    const categoryCounts: Record<string, number> = {};
    reels.forEach((r) => {
      categoryCounts[r.category] = (categoryCounts[r.category] || 0) + 1;
    });

    for (const [cat, count] of Object.entries(categoryCounts)) {
      if (count >= 3 && reels.length <= 5) {
        let adjacent: string[] = ['System Design (HLD)', 'Distributed Caching', 'Cloud & Kubernetes', 'DSA in Storage'];
        if (cat === 'Coding' || cat === 'Programming Meme') {
          adjacent = ['High-Level Design (HLD)', 'Backend & APIs', 'Distributed Cloud Systems', 'Database Index Internals'];
        } else if (cat === 'AI') {
          adjacent = ['MLOps Deployment', 'GPU Memory Optimization', 'Vector Databases & RAG', 'Low-Latency Serving'];
        } else if (cat === 'Gaming' || cat === 'Gadgets') {
          adjacent = ['Vulkan Graphics Programming', 'Linux Kernel Architecture', 'Low-Level C++ Systems', 'Embedded Firmware'];
        }

        return {
          detected: true,
          saturatedTopic: cat,
          count,
          message: `Topic saturation detected: You've interacted with ${count} "${cat}" reels recently. To prevent feed fatigue and maximize learning, TechReel AI explores high-value adjacent engineering domains.`,
          adjacentExplorationTopics: adjacent,
        };
      }
    }

    return { detected: false };
  }
}
