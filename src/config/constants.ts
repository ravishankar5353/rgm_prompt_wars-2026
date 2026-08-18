import { ReelCategory, InteractionType, ReelInteraction } from '../types/reel';
import { RecommendationCategory } from '../types/analysis';

export const REEL_CATEGORIES: ReelCategory[] = [
  'Coding',
  'Programming Meme',
  'Career',
  'AI',
  'Gadgets',
  'Tech News',
  'Gaming',
  'Entertainment',
  'Other',
];

export const INTERACTION_TYPES: InteractionType[] = [
  'Watched',
  'Liked',
  'Saved',
  'Shared',
];

export const RECOMMENDATION_CATEGORIES: RecommendationCategory[] = [
  'AI',
  'DSA',
  'Java',
  'HLD',
  'Cybersecurity',
  'Cloud',
  'Hardware',
  'Career',
  'Other',
];

export interface PresetScenario {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  reels: ReelInteraction[];
}

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'official-trap',
    name: 'Official Judge Trap (SWE Inference)',
    badge: '🏆 Official Trap',
    tagline: 'Java Meme + SWE Lifestyle + Coding Joke + Laptop Comparison',
    description: 'Tests semantic cross-Reel reasoning. A shallow keyword system simply recommends generic Java. TechReel AI infers a broader Software Engineering interest and recommends High-Level System Design (HLD).',
    reels: [
      {
        id: 'trap-1',
        title: 'Java Runtime Exception Meme',
        caption: 'When your Java code compiles on the first try with 0 errors but throws NullPointerException at runtime 💀 #Java #NullPointer #CodeMeme',
        category: 'Programming Meme',
        interactionType: 'Liked',
        watchPercentage: 100,
        timestamp: Date.now() - 3600000 * 4,
        url: 'https://youtube.com/shorts/sample-java-meme',
      },
      {
        id: 'trap-2',
        title: 'Day in Life: Backend Software Engineer',
        caption: 'Morning standup, microservice code review, debugging a Redis cache stampede, and optimizing database indexes. #SWE #Backend #TechCareer',
        category: 'Career',
        interactionType: 'Watched',
        watchPercentage: 95,
        timestamp: Date.now() - 3600000 * 3,
        url: 'https://youtube.com/shorts/sample-swe-lifestyle',
      },
      {
        id: 'trap-3',
        title: 'Whiteboard Coding Interview Struggle',
        caption: 'Interviewer: "Now invert a binary tree and handle all edge cases in O(1) space." Me: 👁️👄👁️ #LeetCode #DSA #Interview',
        category: 'Coding',
        interactionType: 'Saved',
        watchPercentage: 90,
        timestamp: Date.now() - 3600000 * 2,
        url: 'https://youtube.com/shorts/sample-coding-interview',
      },
      {
        id: 'trap-4',
        title: 'M3 Max vs ThinkPad for Docker & Local Dev',
        caption: 'Comparing compile speeds, thermals, and Docker container performance on 16-core Apple Silicon vs Intel Core i9. #Laptops #DevSetup #Hardware',
        category: 'Gadgets',
        interactionType: 'Shared',
        watchPercentage: 85,
        timestamp: Date.now() - 3600000 * 1,
        url: 'https://youtube.com/shorts/sample-laptop-comparison',
      },
    ],
  },
  {
    id: 'ai-research',
    name: 'AI & Deep Learning Enthusiast',
    badge: '🧠 AI / ML Track',
    tagline: 'PyTorch + LLM Fine-Tuning + Transformer Architecture',
    description: 'Demonstrates deep context matching for AI engineering, inferring interest in scalable LLM deployment and quantization.',
    reels: [
      {
        id: 'ai-1',
        title: 'PyTorch vs JAX: Tensor Ops Benchmark',
        caption: 'Comparing GPU memory utilization and automatic differentiation benchmarks between PyTorch 2.0 and JAX. #PyTorch #JAX #DeepLearning',
        category: 'AI',
        interactionType: 'Saved',
        watchPercentage: 100,
        timestamp: Date.now() - 3600000 * 4,
      },
      {
        id: 'ai-2',
        title: 'How Transformer Self-Attention Actually Computes',
        caption: '3D animation visualizing Query, Key, Value matrix multiplication and attention weights in LLMs. #Transformer #NLP #AI',
        category: 'AI',
        interactionType: 'Liked',
        watchPercentage: 95,
        timestamp: Date.now() - 3600000 * 3,
      },
      {
        id: 'ai-3',
        title: 'Fine-Tuning LLaMA-3 with LoRA and QLoRA',
        caption: 'Low-rank adaptation explained in 60 seconds with practical VRAM consumption breakdown. #LLM #OpenSourceAI #LoRA',
        category: 'AI',
        interactionType: 'Saved',
        watchPercentage: 90,
        timestamp: Date.now() - 3600000 * 2,
      },
      {
        id: 'ai-4',
        title: 'NVIDIA H100 vs B200 Tensor Core Architecture',
        caption: 'FP4 precision computing, NVLink 5 bandwidth, and inference throughput for frontier models. #Hardware #NVIDIA #TechNews',
        category: 'Gadgets',
        interactionType: 'Shared',
        watchPercentage: 88,
        timestamp: Date.now() - 3600000 * 1,
      },
    ],
  },
  {
    id: 'hardware-gaming',
    name: 'GPU Architecture & Systems Hardware',
    badge: '⚡ Hardware / Systems',
    tagline: 'Custom PC Build + Unreal Engine Nanite + Linux Kernel',
    description: 'Infers interest in Computer Graphics, GPU compute pipelines, and Low-Level Systems Programming.',
    reels: [
      {
        id: 'hw-1',
        title: 'Custom Hardline Water-Cooled Rig Build',
        caption: 'Bending acrylic tubes and optimizing custom dual-radiator loop pressure for 600W thermal dissipation. #PCBuild #CustomWatercooling #Hardware',
        category: 'Gadgets',
        interactionType: 'Liked',
        watchPercentage: 95,
        timestamp: Date.now() - 3600000 * 4,
      },
      {
        id: 'hw-2',
        title: 'RTX 4090 vs RX 7900 XTX Ray Tracing Stress Test',
        caption: 'Path-tracing frame rate comparison in Cyberpunk 2077 with DLSS 3.5 Ray Reconstruction enabled. #Gaming #GPU #RayTracing',
        category: 'Gaming',
        interactionType: 'Watched',
        watchPercentage: 85,
        timestamp: Date.now() - 3600000 * 3,
      },
      {
        id: 'hw-3',
        title: 'How Unreal Engine 5 Nanite Renders Billions of Polygons',
        caption: 'Meshlet clustering, GPU-driven occlusion culling, and hardware rasterization pipeline explained. #GameDev #UnrealEngine #Graphics',
        category: 'Tech News',
        interactionType: 'Saved',
        watchPercentage: 92,
        timestamp: Date.now() - 3600000 * 2,
      },
      {
        id: 'hw-4',
        title: 'Why Steam Deck Runs Games Smoothly on Linux (Proton/Vulkan)',
        caption: 'Translating DirectX 12 calls to Vulkan via DXVK with zero shader stutter. #Linux #Vulkan #SteamDeck',
        category: 'Gaming',
        interactionType: 'Shared',
        watchPercentage: 90,
        timestamp: Date.now() - 3600000 * 1,
      },
    ],
  },
  {
    id: 'mixed-entertainment',
    name: 'Mixed Entertainment (Weak Signal Test)',
    badge: '⚠️ Mixed Signal Test',
    tagline: 'Comedy + Cooking + Cat Video + Single CSS Reel',
    description: 'Tests the AI Mixed Signal Detector: when inputs are conflicting and lack a dominant technical direction, it avoids forcing a fake technology recommendation.',
    reels: [
      {
        id: 'mix-1',
        title: 'Stand-up comedy about everyday traffic',
        caption: 'Why driving 2 miles takes 45 minutes in rush hour 😂 #Comedy #StandUp #Relatable',
        category: 'Entertainment',
        interactionType: 'Liked',
        watchPercentage: 90,
        timestamp: Date.now() - 3600000 * 4,
      },
      {
        id: 'mix-2',
        title: 'Street food stall making giant ramen bowls',
        caption: 'Handmade noodles in Tokyo with 24-hour pork broth. #Foodie #Ramen #TokyoEats',
        category: 'Entertainment',
        interactionType: 'Watched',
        watchPercentage: 85,
        timestamp: Date.now() - 3600000 * 3,
      },
      {
        id: 'mix-3',
        title: 'Cat knocking cups off table in slow motion',
        caption: 'He looked me in the eye before pushing it over 🐱 #CatMemes #Pets #Funny',
        category: 'Entertainment',
        interactionType: 'Watched',
        watchPercentage: 70,
        timestamp: Date.now() - 3600000 * 2,
      },
      {
        id: 'mix-4',
        title: 'Cool 3D button hover animation in CSS',
        caption: 'Pure CSS transform-style preserve-3d button effect. #CSS #WebDev #FrontEnd',
        category: 'Coding',
        interactionType: 'Liked',
        watchPercentage: 40,
        timestamp: Date.now() - 3600000 * 1,
      },
    ],
  },
];
