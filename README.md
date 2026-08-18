# TECHREEL AI

> **"Turn your scrolling into smarter technology discovery."**

Built for **PromptWars 2026** — the annual AI Hackathon hosted by RGM College of Engineering & Technology.

---

## The Problem

Students spend significant time scrolling short-form content (Instagram Reels, YouTube Shorts). Much of this is entertainment that provides little educational or career value. Even when students watch technology content, **traditional recommendation systems repeat the same surface-level topic** — missing the deeper, evolving interest hiding beneath the surface.

A student who watches Java memes + coding interview jokes + SWE career content + laptop comparisons is **not just interested in Java**. They are building toward a **Software Engineering career**. No current recommendation system connects these signals.

---

## The Solution

**TECHREEL AI** is a semantic AI recommendation agent that:

1. Accepts Reel interactions supplied by a student (title, caption, category, interaction type, watch %)
2. Uses **Google Gemini AI** to reason semantically across ALL interactions simultaneously
3. Infers a **hidden underlying technology interest** — not just a surface keyword
4. Recommends the **next high-leverage technology content** to accelerate the student's actual learning trajectory

---

## The Innovation — Semantic vs. Keyword Reasoning

| Approach | Input | Output |
|---|---|---|
| **Traditional keyword matching** | Java Meme | More Java content |
| **TECHREEL AI semantic reasoning** | Java + Coding + Career + Tech | Software Engineering → System Design / HLD |

The AI understands:
- Cross-reel semantic relationships
- Apparent career and learning aspirations
- Topic repetition and saturation
- Educational value and difficulty
- Novelty — avoiding hype and generic content

---

## Core User Journey

```
LANDING PAGE
    ↓
⚡ TRY JUDGE DEMO  OR  📧 CONTINUE WITH EMAIL
    ↓
ADD 3–8 REEL INTERACTIONS
    ↓
🧠 ANALYZE MY SCROLLING  (real Gemini AI call)
    ↓
AI understands cross-reel semantic patterns
    ↓
🧠 HIDDEN INTEREST DISCOVERED
    ↓
🔍 EVIDENCE TRAIL (why the AI thinks this)
    ↓
🎯 RECOMMENDED TECH REEL
    ↓
💡 WHY THIS? ⚔️ WHY NOT JUST JAVA?
    ↓
📊 RECOMMENDATION SIGNALS (AI-estimated)
    ↓
👍 / 👎 / TRY ANOTHER  (feedback loop)
    ↓
ADAPTIVE FUTURE DISCOVERY
```

---

## Official Judge Trap Scenario

The system is specifically validated against the **Official PromptWars Trap**:

| # | Reel |
|---|---|
| 1 | Java Runtime Exception Meme ☕ |
| 2 | Software Engineer Work-Life Balance 🚀 |
| 3 | Coding Interview Prep Joke 💻 |
| 4 | Laptop Spec Comparison 🔌 |

**Weak system** → recommends another Java tutorial.

**TECHREEL AI** → recognizes the cluster as a Software Engineering career signal → recommends **System Design / High-Level Architecture (HLD)**.

The result is **NOT hardcoded**. It is generated live by the Gemini AI based on semantic reasoning from the prompt.

---

## Architecture

```
src/
├── components/
│   ├── analysis/
│   │   ├── ResultsPage.tsx          # Unified result experience (all sections)
│   │   ├── HiddenInterestCard.tsx   # Hero: inferred interest + confidence
│   │   ├── EvidenceTrail.tsx        # Why the AI thinks this
│   │   ├── RequiredOutputCard.tsx   # PromptWars required JSON output
│   │   ├── RecommendationCard.tsx   # Recommendation + chat assistant
│   │   ├── RecommendationDNAPanel.tsx  # AI-estimated signals
│   │   ├── SemanticVsKeywordBenchmark.tsx  # Competitive differentiation
│   │   ├── TopicSaturationAlert.tsx # Repetition fatigue detection
│   │   └── AnalysisLoadingState.tsx # Gemini reasoning progress steps
│   ├── chat/
│   │   ├── ChatSidebar.tsx          # ChatGPT-style navigation sidebar
│   │   ├── ChatMessageList.tsx      # AI conversation thread
│   │   └── ChatInput.tsx            # User prompt input
│   ├── common/
│   │   ├── LandingPage.tsx          # Entry point — hero, CTAs, demo
│   │   └── Header.tsx               # Workspace header + mode toggle
│   ├── judge/
│   │   └── JudgeDemoWalkthrough.tsx # Isolated one-time judge sandbox
│   ├── reels/
│   │   ├── ReelList.tsx             # Reel grid + search/filters + sort
│   │   ├── ReelCard.tsx             # Individual reel card with AI feedback CTA
│   │   ├── ReelInputModal.tsx       # Quick add / edit reel form
│   │   ├── ReelUploadModal.tsx      # Multi-stage AI ingestion & upload pipeline
│   │   └── ReelDetailView.tsx       # Video player, scorecard, feedback & comments
│   ├── graph/
│   │   └── InteractiveInterestGraph.tsx  # Lightweight 2D interest tree
│   └── dashboard/
│       ├── AnalyticsDashboard.tsx   # Insights view
│       └── HistoryView.tsx          # Past analyses with search + filters
├── context/
│   └── TechReelContext.tsx          # Centralized state + API orchestration
├── services/
│   ├── geminiService.ts             # Gemini AI integration + fallback engine
│   ├── recommendationEngine.ts      # Local semantic fallback (no API key)
│   └── storageService.ts            # LocalStorage persistence
├── types/
│   ├── analysis.ts                  # Core type definitions
│   ├── reel.ts                      # Reel, comment, transcript & AI feedback types
│   └── feedback.ts                  # Feedback types
└── styles/
    └── designSystem.css             # Design tokens + component styles
```

---

## Gemini AI Integration

The system uses **Google Gemini 1.5 Flash** via `@google/generative-ai`.

The prompt explicitly instructs the model to:
- Reason **across ALL Reels simultaneously** — not one at a time
- Identify **semantic cross-reel patterns** (career + coding + tech = SWE trajectory)
- **Avoid keyword matching** and category counting
- Consider: topic, context, interaction type, watch percentage, novelty, learning value, hype risk
- Return **strict structured JSON** with full output schema

The service falls back gracefully to the local `RecommendationEngine` if:
- No API key is configured
- Gemini times out (>10s)
- Rate limit / quota error
- Malformed JSON response

---

## Authentication

- **Passwordless email sign-in** via Supabase Auth (magic link flow)
- Authenticated sessions are persisted — returning users skip the landing page
- **Judge Demo** requires no login and does not pollute authenticated user data
- Logout clears session and redirects to the landing page
- Row-Level Security (RLS) ensures users access only their own data

---

## Setup

```bash
# 1. Clone the repository
git clone https://github.com/ravishankar5353/rgm_prompt_wars-2026.git
cd rgm_prompt_wars-2026

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env and add your keys (see below)

# 4. Run locally
npm run dev

# 5. Build for production
npm run build
```

---

## Environment Variables

```env
VITE_GEMINI_API_KEY=   # Google AI Studio API key (gemini-1.5-flash)
VITE_SUPABASE_URL=     # Supabase project URL
VITE_SUPABASE_ANON_KEY= # Supabase anonymous (public) key — never service-role!
VITE_APP_ENV=development
VITE_DEMO_MODE=true
```

**Get a free Gemini API key:** https://aistudio.google.com/app/apikey

**The app works without an API key** — it falls back to the local semantic reasoning engine.

> ⚠️ **Never commit your `.env` file**. It is in `.gitignore`. Only share `.env.example`.

---

## Deployment (Vercel)

```bash
# One-command production deploy
npx vercel --prod --yes
```

Configure these environment variables in the Vercel dashboard under **Project → Settings → Environment Variables**.

**Live URL:** https://prompt-wars-tau.vercel.app

---

## Privacy & Data Principles

- TechReel AI **does not connect to any social media platform**
- All reel data is **explicitly provided** by the student — we do not scrape
- Analysis is processed **transiently per session** for unauthenticated users
- Authenticated users' data is stored in Supabase with Row-Level Security
- Users can clear their history or delete their account from the Privacy section

---

## Limitations

- Reel interactions must be entered manually (no social media API integration)
- AI inference quality depends on the richness of reel descriptions provided
- Gemini API subject to Google quota limits (graceful fallback exists)
- Interest inference is probabilistic — labeled as AI-estimated, not factual
- No claims of model retraining from user feedback

---

## Future Scope

- Supabase Realtime for cross-device sync
- Progressive interest profile evolution over multiple sessions
- Curriculum mapping — link recommendations to actual courses/resources
- Instructor/mentor view (admin role)
- WhatsApp / Telegram Reel sharing integration
- Multimodal Gemini Vision for direct Reel image/video analysis

---

## Built With

- **React + TypeScript + Vite**
- **Google Gemini 1.5 Flash** (AI reasoning)
- **Supabase** (Auth + Database)
- **Lucide React** (icons)
- **canvas-confetti** (feedback delight)
- **Vanilla CSS + Design Tokens** (no Tailwind dependency)
- **Vercel** (deployment)

---

*TECHREEL AI — Turn your scrolling into smarter technology discovery.*
