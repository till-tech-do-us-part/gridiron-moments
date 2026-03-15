# Monarch Moments — AI Agent Handover Prompt

> **Purpose**: This document is a comprehensive handover for a successor AI agent taking over development of this application. Read this document in full before making any changes to the codebase.

---

## 1. Mission & Product Context

**Monarch Moments** is a premium digital collectibles marketplace for football highlights. Users collect, trade, and own officially licensed digital "moments" — short video clips of memorable plays — presented as graded trading card slabs with rarity tiers.

The design philosophy is **cinematic storytelling meets luxury e-commerce**: pure black backgrounds, oversized condensed typography, glassmorphic surfaces, neon rarity-tier accents, and a signature 3D rotating slab interaction that plays embedded highlight videos.

The application was built to match a detailed design specification found at `../target_design/DESIGN_ANALYSIS.md`, which analyzed a production sports collectibles platform (NBA Top Shot) and distilled its design language into an actionable spec. The branding was changed from "Gridiron" to "Monarch" during development.

### Current State

The application is **feature-complete for its current scope** — a single-page marketing/showcase site with 9 content sections, a detail modal, and the 3D moment slab as its hero interaction. It is NOT yet deployed to production. There is no backend, no authentication, no real blockchain integration, and no user accounts. All data is static (defined in `src/data/siteData.ts`). The site is ready for static hosting deployment (e.g., Vercel, Netlify).

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 19.2.0 |
| Language | TypeScript | ~5.9.3 |
| Build Tool | Vite | 7.2.4 |
| Styling | Tailwind CSS | 3.4.19 |
| Animation | Framer Motion | 12.34.3 |
| Icons | Lucide React | 0.562.0 |
| Utilities | clsx + tailwind-merge | 2.1.1 / 3.4.0 |
| Fonts | Google Fonts (Barlow Condensed, Inter) | CDN |

**Architecture**: Single-page application with anchor-based navigation (`#explore`, `#drops`, `#marketplace`, `#play`). No router. No SSR. Pure client-side React rendered into a single `#root` div.

**Path alias**: `@` maps to `./src` (configured in both `vite.config.ts` and `tsconfig.app.json`).

**Dev server**: Runs on port `5174` by default (configurable via `PORT` env var).

---

## 3. Project Structure

```
gridiron-moments/
├── index.html                          # Entry HTML — title: "Monarch Moments - Own the Play"
├── package.json                        # Dependencies and scripts
├── vite.config.ts                      # Vite config: React plugin, @ alias, port 5174
├── tailwind.config.js                  # Extended theme: colors, fonts, keyframes, rarity tokens
├── tsconfig.json                       # References app + node configs
├── tsconfig.app.json                   # Strict TS, ES2020, path alias @/*
├── tsconfig.node.json                  # Node-side TS config
├── postcss.config.js                   # Tailwind + autoprefixer
├── HANDOVER.md                         # This document
│
├── public/
│   ├── favicon.svg                     # Monarch logo SVG favicon
│   ├── images/
│   │   ├── monarch-logo.png            # Brand logo (used in nav + footer)
│   │   ├── player-card-main.jpg        # Primary featured card (has "MONARCH GLORY" text baked in)
│   │   ├── player-card-main.jpg.bak    # Backup before text edit
│   │   ├── player-thumb-1.jpg          # Thumbnail image
│   │   ├── player-thumb-2.jpg          # Thumbnail image
│   │   ├── player-thumb-3.jpg          # Thumbnail image
│   │   ├── related-1.jpg              # Moment card image (Jake Thompson)
│   │   ├── related-2.jpg              # Moment card image (Devon Williams)
│   │   ├── related-3.jpg              # Moment card image (Chris Jackson)
│   │   ├── related-4.jpg              # Moment card image (Tyler Brooks, has "MONARCH LEGENDS" baked in)
│   │   └── related-4.jpg.bak          # Backup before text edit
│   └── videos/
│       ├── moment-00001.mp4            # 1.1 MB — highlight clip (from YouTube Shorts)
│       ├── moment-00002.mp4            # 1.1 MB — highlight clip (from YouTube Shorts)
│       └── moment-00003.mp4            # 49 MB — highlight clip (from YouTube Shorts, large file)
│
└── src/
    ├── main.tsx                        # React DOM root render
    ├── App.tsx                         # Root component: section ordering + modal state
    ├── App.css                         # Custom CSS: 3D slab system, glassmorphism, marquee, effects
    ├── index.css                       # Global styles: fonts, base, scrollbar, accessibility
    │
    ├── types/
    │   └── index.ts                    # All TypeScript interfaces and type aliases
    │
    ├── data/
    │   └── siteData.ts                 # All static content data + config exports
    │
    ├── lib/
    │   ├── animation.ts                # Framer Motion variants, timing, easing constants
    │   └── utils.ts                    # cn() utility (clsx + tailwind-merge)
    │
    ├── hooks/
    │   ├── useInView.ts                # IntersectionObserver hook (threshold, rootMargin, once)
    │   └── useScrollPosition.ts        # Window scroll position tracker (scrollPosition, isScrolled)
    │
    └── components/
        ├── layout/
        │   ├── Navigation.tsx           # Fixed glassmorphic header + mobile hamburger menu
        │   └── Footer.tsx               # Link grid footer with Monarch branding
        │
        └── sections/
            ├── HeroSection.tsx          # Cinematic split-screen hero with featured card
            ├── ValueProps.tsx            # Three-column value proposition cards
            ├── FeatureBlocks.tsx         # Alternating 50/50 storytelling blocks (3 blocks)
            ├── ImageTicker.tsx           # Full-width marquee of athlete images
            ├── TrendingMoments.tsx       # ★ 3D MOMENT SLAB — signature feature with video
            ├── PackDrops.tsx             # Four-tier pack pricing cards
            ├── StatsDashboard.tsx        # Market analytics: filter pills + animated counters + table
            ├── MarketplaceCards.tsx      # Horizontal scroll carousel of collectible cards
            ├── GameZone.tsx              # Gamification UI: challenges, leaderboards
            └── DetailModal.tsx           # Full-screen card detail overlay with 3D wireframe
```

---

## 4. Section Rendering Order

Defined in `src/App.tsx`. The page renders these sections top-to-bottom:

1. **Navigation** — Fixed header (always visible)
2. **HeroSection** — Cinematic split-screen with featured moment
3. **ValueProps** — "Why Monarch Moments" — 3 columns (Scarcity, Trading, Permanence)
4. **FeatureBlocks** — 3 alternating 50/50 blocks (Collecting, Marketplace, Competition)
5. **ImageTicker** — Full-width marquee of athlete card images
6. **TrendingMoments** — ★ Horizontal scroll of 3D moment slabs with video
7. **PackDrops** — 4-tier pack pricing (Standard $9 → Legendary $399)
8. **StatsDashboard** — Market analytics with time-period filters + Top Purchases table
9. **MarketplaceCards** — Horizontal scroll of 8 collectible cards (click opens DetailModal)
10. **GameZone** — Gamification cards (Fast Break, Challenges, Leaderboards)
11. **Footer** — Link grid + copyright
12. **DetailModal** — Conditionally rendered full-screen card overlay

**Global state**: Only `selectedCard: CollectibleCard | null` in App.tsx, passed to MarketplaceCards (setter) and DetailModal (reader).

---

## 5. Design System

### Colors

**Rarity Tier Colors** (used throughout for badges, glows, borders, accents):

| Tier | Hex | Tailwind Token | CSS Variable |
|------|-----|----------------|--------------|
| Common | `#9CA3AF` | `rarity-common` | `--slab-glow-common` |
| Rare | `#3B82F6` | `rarity-rare` | `--slab-glow-rare` |
| Epic | `#A855F7` | `rarity-epic` | `--slab-glow-epic` |
| Legendary | `#F59E0B` | `rarity-legendary` | `--slab-glow-legendary` |
| Ultimate | `#EF4444` | `rarity-ultimate` | `--slab-glow-ultimate` |

**Brand colors**: Gold (`#F59E0B` primary, `#D97706` hover, `#FCD34D` light, `rgba(245,158,11,0.15)` dim)

**Dark surface scale**: `#000000` (bg) → `#0A0A0A` (card) → `#111111` (elevated) → `#1A1A1A` (surface) → `#212127` (surface-2) → `#2B2C33` (surface-3) → `#222222` (border) → `#333333` (border-hover)

### Typography

| Role | Font Family | Tailwind Class |
|------|------------|---------------|
| Display/Headlines | Barlow Condensed (400-900) | `font-display` |
| Body/UI | Inter (300-700) | `font-sans` (default) |

**Responsive font sizes** (defined in `tailwind.config.js` using `clamp()`):
- `text-hero`: `clamp(3rem, 7vw, 5rem)` — hero headline
- `text-section`: `clamp(2rem, 4.5vw, 3.5rem)` — section headings
- `text-card-title`: `clamp(1.5rem, 2.5vw, 2rem)` — card titles
- `text-stat`: `clamp(2.5rem, 5vw, 4rem)` — large stat numbers

### Glassmorphism Layers (App.css)

| Class | Background | Blur |
|-------|-----------|------|
| `.glass` | `rgba(0,0,0,0.8)` | 20px |
| `.glass-subtle` | `rgba(10,10,10,0.6)` | 8px |
| `.glass-card` | `rgba(10,10,10,0.5)` | 12px |
| `.frosted-cta` | Radial gold gradient | 15px |

---

## 6. The 3D Moment Slab — Signature Feature

> **This is the most complex and important feature in the application.** Understand it thoroughly before making any changes.

### Design: Hybrid Approach C

The 3D moment slab uses **CSS 3D transforms for geometry + HTML5 `<video>` for the front face + JavaScript for dwell-based interaction control**. This was chosen over pre-rendered MP4 animations (the production reference site's approach) because it provides real-time interactivity with lower asset costs.

### File Locations

- **Component**: `src/components/sections/TrendingMoments.tsx`
- **CSS**: `src/App.css` (lines 131-316, section `3D MOMENT SLAB — Hybrid Approach C`)
- **Config**: `src/data/siteData.ts` → `slabConfig` export
- **Types**: `src/types/index.ts` → `MomentSlab`, `SlabConfig`

### Four-Phase Interaction Sequence

| Phase | Trigger | Visual | Implementation |
|-------|---------|--------|---------------|
| 1. Idle | Default | Slab at `rotateY(-15deg)`, poster visible, neon corners at base glow | CSS `transform: rotateY(var(--slab-rotation-idle))` |
| 2. Hover | `mouseenter` | Brightness +5%, neon corners intensify | CSS `:hover` filter + box-shadow |
| 3. Dwell | 1s after hover | Continuous Y rotation, video plays, poster fades out | JS `setTimeout` → adds `.slab--rotating` class + `video.play()` |
| 4. Exit | `mouseleave` | Smooth deceleration to idle angle, video pauses/resets | JS removes class, `video.pause()`, CSS transition kicks in |

### 3D Geometry

Each slab is a 6-faced rectangular prism (240×320×36px):

```
.slab-container          → perspective: 1000px
  .slab                  → transform-style: preserve-3d
    .slab__front         → Front face: poster image + video + neon corners + player info overlay
    .slab__back          → Back face: rotateY(180deg), player name + serial + price + rarity badge
    .slab__right         → Right edge: rotateY(90deg) translateZ(), neon glow box-shadow
    .slab__left          → Left edge: rotateY(-90deg) translateZ(0)
    .slab__top            → Top edge: rotateX(90deg) translateZ(0)
    .slab__bottom         → Bottom edge: rotateX(-90deg) translateZ()
```

All faces use `backface-visibility: hidden` and `position: absolute`.

### CSS Custom Properties

```css
:root {
  --slab-depth: 36px;
  --slab-rotation-idle: -15deg;
  --slab-rotation-speed: 10s;      /* Full 360° rotation duration */
  --slab-dwell-delay: 1s;          /* Reduced from 2s in a previous iteration */
  --slab-return-duration: 0.8s;    /* Deceleration back to idle */
  --slab-return-easing: cubic-bezier(0.25, 0.1, 0.25, 1);
}
```

Per-instance CSS variables set via inline styles on `.slab`:
- `--neon-color`: The rarity tier color (e.g., `#A855F7` for Epic)
- `--slab-depth`: Depth in pixels

### Video Integration

```tsx
<video
  ref={videoRef}
  src={moment.videoUrl}           // e.g., "/videos/moment-00001.mp4"
  muted loop playsInline
  preload="metadata"
  style={{ opacity: isPlaying ? 1 : 0, transition: 'opacity 0.4s ease' }}
  onError={() => setVideoFailed(true)}
/>
```

- Video is conditionally rendered: `{moment.videoUrl && !videoFailed && (...)}`
- When `isPlaying` becomes true, video fades in (opacity 0→1) and poster fades out via `.slab__front--playing .slab__poster { opacity: 0 }`
- Videos are muted (required for autoplay policy), looping, with `playsInline` for iOS

### The play() Race Condition Fix (CRITICAL)

**Problem**: When a user hovers briefly and leaves, `handleMouseLeave` calls `video.pause()` which aborts the pending `play()` promise. The original `.catch()` handler permanently set `videoFailed=true`, removing the video element from the DOM forever.

**Fix applied**: The `.catch()` now only treats `NotSupportedError` as permanent (truly unplayable media). `AbortError` (play interrupted by pause) and `NotAllowedError` (autoplay policy) are transient — silently ignored so the video retries on the next hover.

```tsx
videoRef.current.play().then(() => {
  setIsPlaying(true);
}).catch((err) => {
  if (err.name === 'NotSupportedError') {
    setVideoFailed(true);  // Permanent: codec/format issue
  }
  // AbortError / NotAllowedError are transient — retry on next hover
});
```

### Slab Config (from siteData.ts)

```typescript
export const slabConfig = {
  depth: 36,             // Edge thickness in pixels
  rotationIdle: -15,     // Idle angle in degrees
  rotationSpeed: 10,     // Seconds per full rotation
  dwellDelay: 1,         // Seconds before dwell triggers (was 2, reduced by 50%)
  returnDuration: 0.8,   // Seconds to decelerate back to idle
  returnEasing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
};
```

### Rarity-Based Visual Treatments

- **All tiers**: Neon corner accents on front face (4 corners, colored by `glowColor`)
- **Hover**: Corners gain box-shadow glow + `color-mix()` inset
- **Legendary/Ultimate**: `.slab--legendary` class adds intense multi-layer box-shadow on ALL edge faces
- **Edge glow during rotation**: `slab-glow-pulse` keyframe (opacity 0.7→1→0.7, 2.5s cycle)

---

## 7. Data Architecture

All static data lives in `src/data/siteData.ts`. Key exports:

| Export | Type | Count | Description |
|--------|------|-------|-------------|
| `navItems` | `NavItem[]` | 4 | Nav links (Explore, Drops, Market, Play) |
| `heroData` | Object | 1 | Hero headline, subheadline, CTA, image |
| `valueProps` | Object[] | 3 | Value proposition cards with icons |
| `featureBlocks` | `FeatureBlock[]` | 3 | Alternating 50/50 storytelling blocks |
| `trendingMoments` | `MomentSlab[]` | 6 | 3D slab data with video URLs and rarity |
| `slabConfig` | `SlabConfig` | 1 | 3D slab interaction configuration |
| `packTiers` | `PackTier[]` | 4 | Pack pricing tiers (Standard→Legendary) |
| `marketStats` | `Record<FilterPeriod, MarketStat[]>` | 5×4 | Stats for each time period |
| `productCards` | `CollectibleCard[]` | 8 | Full card data with stats for marketplace |
| `gameCards` | `GameCard[]` | 3 | Gamification mode cards |
| `tickerImages` | `TickerImage[]` | 8 | Marquee image list |
| `topPurchases` | Object[] | 5 | Recent purchase records for table |
| `rarityColors` | `Record<Rarity, string>` | 5 | Color hex per rarity |
| `rarityBgClasses` | `Record<string, string>` | 5 | Tailwind bg classes per rarity |
| `rarityGlowClasses` | `Record<string, string>` | 5 | Tailwind shadow classes per rarity |

### Type Definitions (src/types/index.ts)

```typescript
type Rarity = 'common' | 'rare' | 'epic' | 'legendary' | 'ultimate';
type FilterPeriod = '1D' | '7D' | '30D' | '90D' | 'ALL';

interface MomentSlab {
  id: string; image: string; videoUrl?: string; rarity: Rarity;
  playerName: string; playType: string; serial: string; price: string; glowColor: string;
}

interface SlabConfig {
  depth: number; rotationIdle: number; rotationSpeed: number;
  dwellDelay: number; returnDuration: number;
}

interface CollectibleCard {
  id: string; image: string; rarity: Rarity; playerName: string; title: string;
  position: string; team: string; lowestAsk: string; avgSale: string;
  serial: { current: number; total: number }; description: string;
  stats: Record<string, string | number>;
}

// Also: NavItem, FeatureBlock, MarketStat, PackTier, GameCard, TickerImage
```

### Video-to-Slab Mapping

| Slab | Player | Rarity | Video | Image |
|------|--------|--------|-------|-------|
| slab-1 | Marcus Green | epic | moment-00001.mp4 | player-card-main.jpg |
| slab-2 | Jake Thompson | legendary | moment-00002.mp4 | related-1.jpg |
| slab-3 | Devon Williams | rare | moment-00003.mp4 | related-2.jpg |
| slab-4 | Chris Jackson | epic | moment-00001.mp4 | related-3.jpg |
| slab-5 | Tyler Brooks | common | moment-00002.mp4 | related-4.jpg |
| slab-6 | Aiden Cole | rare | moment-00003.mp4 | player-thumb-3.jpg |

**Note**: `moment-00003.mp4` is 49MB (vs ~1MB for the others). This may cause slow loading for slabs 3 and 6.

---

## 8. Animation System

### Framer Motion (src/lib/animation.ts)

**Timing constants**:
- `TIMING`: fast (0.15s), normal (0.25s), slow (0.35s), reveal (0.6s), heroReveal (0.8s)
- `EASE`: default `[0.4,0,0.2,1]`, smooth `[0.25,0.1,0.25,1]`, bounce `[0.68,-0.55,0.265,1.55]`, out `[0,0,0.2,1]`
- `STAGGER`: fast (0.06s), normal (0.1s), slow (0.15s), hero (0.12s)

**Reusable variants** (import from `@/lib/animation`):
- `fadeInUp` — opacity 0→1, y: 30→0 (0.6s smooth) — **most commonly used**
- `fadeIn` — opacity only
- `slideInLeft` / `slideInRight` — horizontal entry
- `scaleIn` — scale 0.9→1
- `staggerContainer` — parent that staggers children (0.1s intervals)
- `heroStagger` — tighter stagger for hero section (0.12s, 0.2s delay)
- `scrollViewport` — `{ once: true, margin: '-80px' }` for whileInView triggers

**Pattern used in every section**:
```tsx
<motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={scrollViewport}>
  <motion.h2 variants={fadeInUp}>...</motion.h2>
  <motion.p variants={fadeInUp}>...</motion.p>
</motion.div>
```

### CSS Animations (tailwind.config.js keyframes)

| Name | Effect | Duration |
|------|--------|----------|
| `marquee` | Horizontal translateX scroll | 40s linear infinite |
| `fade-in-up` | Opacity + Y translation | 0.5s ease-out |
| `glow-pulse` | Opacity 0.5→1→0.5 | 2s ease-in-out infinite |
| `slab-rotate` | rotateY(-15deg→345deg) | 10s linear infinite |
| `gradient-shift` | Background position animation | 6s ease infinite |
| `skeleton-shimmer` | Background position shift | 2s linear infinite |
| `spin-slow` | rotateY full 360 | 20s linear infinite |
| `slide-up` | translateY(100%→0) | 0.5s ease-out |

### Utility (src/lib/utils.ts)

`cn(...inputs)` — merges `clsx()` + `tailwind-merge()` for safe conditional class composition.

---

## 9. CSS Architecture

### App.css Sections (371 lines)

| Lines | Section | Key Classes |
|-------|---------|------------|
| 1-17 | Marquee/Ticker | `.marquee-track`, `.marquee-mask` |
| 19-34 | Glassmorphism | `.glass`, `.glass-subtle`, `.glass-card` |
| 36-43 | Gradient Text | `.gradient-text` (gold linear gradient with `background-clip: text`) |
| 45-67 | Neon Glow Border | `.glow-border` (animated gradient border using mask-composite) |
| 69-88 | Nav Underline | `.nav-link::after` (scaleX transition on hover) |
| 90-103 | Cards & Buttons | `.card-hover`, `button:active` |
| 105-121 | Scrollbar & Snap | `.no-scrollbar`, `.scroll-snap-x` |
| 123-129 | Skeleton Loading | `.skeleton` (gradient shimmer) |
| **131-316** | **3D Moment Slab** | Full slab system (see Section 6 above) |
| 318-340 | Scroll Edge Masks | `.scroll-mask-right`, `.scroll-mask-left` |
| 342-352 | Frosted CTA | `.frosted-cta` (radial gold gradient + blur) |
| 354-363 | Radial Glows | `.radial-glow-gold/purple/blue` |
| 365-370 | Responsive | Mobile font-size reduction |

### index.css (56 lines)

- Google Fonts imports (Barlow Condensed 400-900, Inter 300-700)
- Tailwind directives (`@tailwind base/components/utilities`)
- Base styles: dark border default, black bg, white text, smooth scrolling
- Custom dark scrollbar styling
- Gold text selection (`rgba(245,158,11,0.3)`)
- Gold focus ring (`2px solid #F59E0B`)
- `@media (prefers-reduced-motion)` — forces `animation-duration: 0.01ms`

---

## 10. Asset Inventory

### Images

All in `public/images/`. These are static JPG/PNG files — **not generated**.

**Important**: Two images have text baked into their pixels that was manually edited using Python Pillow:
- `player-card-main.jpg` — Originally said "GRIDIRON GLORY", painted over and re-rendered as "MONARCH GLORY" using Impact font. Backup at `.bak`.
- `related-4.jpg` — Originally said "GRIDIRON LEGENDS", painted over and re-rendered as "MONARCH LEGENDS" with black text + white stroke. Backup at `.bak`.

If you need to re-edit these images, use the `.bak` backups as the clean starting point and Pillow for pixel manipulation. The font used was `C:\Windows\Fonts\impact.ttf` (Impact).

### Videos

All in `public/videos/`. Downloaded via `yt-dlp` from YouTube Shorts:

| File | Size | Source |
|------|------|--------|
| moment-00001.mp4 | 1.1 MB | YouTube Shorts/X9-lz2l2DsA |
| moment-00002.mp4 | 1.1 MB | YouTube Shorts/5nRrMZYj6FA |
| moment-00003.mp4 | 49 MB | YouTube Shorts/B6P0opKqP3I |

**Note**: `moment-00003.mp4` is disproportionately large. For production, it should be re-encoded to a smaller size or replaced.

---

## 11. Development History & Key Decisions

### Chronological Summary

1. **Initial build**: Site scaffolded with Vite + React + TypeScript + Tailwind. All 9 sections implemented with static data and Framer Motion animations.

2. **3D Moment Slab implementation**: Originally the Trending Moments section was flat cards. The design spec called for 3D rotating slabs with video. Implemented using Hybrid Approach C (CSS 3D transforms + embedded video) rather than pre-rendered MP4 animations (the reference site's approach). This decision traded visual fidelity for real-time interactivity and lower asset costs.

3. **Video asset acquisition**: Used `yt-dlp` (downloaded from GitHub releases) to grab 3 YouTube Shorts as placeholder highlight clips. `ffmpeg` was also configured.

4. **Dwell delay reduction**: The original 2-second hover-to-activation delay felt too sluggish. Reduced to 1 second (50% reduction) by changing `slabConfig.dwellDelay` from 2 to 1.

5. **GRIDIRON → MONARCH rebrand**: Comprehensive rename across all code files, component text, nav logo, footer, page title, and baked-in JPG artwork. The logo was changed from a placeholder "G" div to an actual `<img>` referencing `monarch-logo.png`.

6. **Image pixel editing**: Two card artwork images had "GRIDIRON" baked into their pixels. Used Python Pillow to paint over the text regions and re-render "MONARCH" in matching fonts. This required multiple iterations to get positioning, coverage, and color matching right.

7. **Video playback bug fix**: Tyler Brooks' slab would spin on hover but video wouldn't play. Root cause: the `play()` promise `.catch()` handler was treating ALL rejections as permanent failures (setting `videoFailed=true` and removing the video element from the DOM). The classic "play() interrupted by pause()" browser race condition caused `AbortError` rejections that were incorrectly treated as permanent. Fixed by only treating `NotSupportedError` as permanent.

### Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| CSS 3D transforms over pre-rendered video | Real-time interactivity, smaller assets, works on all devices |
| `preload="metadata"` over `preload="auto"` | Avoids downloading 49MB+ of video data upfront |
| Single `App.css` over CSS modules | Matches the design's global token system; 3D slab CSS needs global scope |
| Framer Motion over CSS-only animations | Scroll-triggered animations need JS observer integration; stagger orchestration |
| Static data file over CMS/API | Prototype/showcase scope; no backend needed yet |

---

## 12. Known Issues & Remaining Work

### Known Issues

1. **moment-00003.mp4 is 49MB** — Disproportionately large. May cause slow loading or memory pressure on mobile. Should be re-encoded or replaced with a smaller clip.

2. **No mobile optimization for 3D slabs** — The 3D perspective and hover-based interaction assume desktop mouse input. Touch/tap interaction is not implemented. The design spec recommends disabling real-time 3D on mobile.

3. **No loading states / skeleton screens** — The design spec calls for skeleton loading states everywhere. The CSS class `.skeleton` exists but isn't used in components.

4. **No error boundaries** — If a section crashes, the whole page goes down.

5. **Image text edits are JPEG-quality limited** — The Pillow-edited text in `player-card-main.jpg` and `related-4.jpg` doesn't perfectly match the original artwork's font rendering. Noticeable on close inspection.

### Not Yet Implemented (from Design Spec)

- [ ] Pack opening ceremony animation (sequential card reveal with suspense)
- [ ] Real authentication (Auth0 or similar)
- [ ] Backend / API / CMS integration (Contentful or similar)
- [ ] Blockchain integration (Flow / Cadence smart contracts)
- [ ] Real marketplace functionality (buy, sell, trade)
- [ ] User profiles and collection management
- [ ] Search functionality (search button in nav is non-functional)
- [ ] Mobile-responsive 3D slab experience (tap-to-activate instead of hover)
- [ ] Skeleton loading states during data fetch
- [ ] Image CDN optimization (Cloudflare or similar)
- [ ] SEO meta tags and Open Graph images
- [ ] Analytics integration
- [ ] Cookie consent / privacy (OneTrust or similar)

### Production Deployment Considerations

- Static build: `npm run build` produces `dist/` folder suitable for any static host
- No environment variables needed currently
- No `vercel.json` or deployment config exists yet
- The 49MB video file will be expensive to serve from a CDN — address before deploying
- Consider adding `robots.txt` and `sitemap.xml`

---

## 13. How to Run

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5174)
npm run dev

# Type-check + production build
npm run build

# Preview production build
npm run preview
```

**System requirements**: Node.js (18+), npm. Windows environment (paths use backslashes in some configs).

**Python (for image editing only)**: `python` (not `python3` on Windows) at `C:/Users/shimo/AppData/Local/Programs/Python/Python311/python`. Requires `pip install Pillow`.

**yt-dlp (for video acquisition only)**: Binary at project-adjacent path, downloaded from GitHub releases.

---

## 14. Design Reference

The original design specification that guided all development decisions:

```
C:\Users\shimo\Downloads\2\target_design\DESIGN_ANALYSIS.md
```

This 38KB document contains:
- Complete visual anatomy of the reference site (NBA Top Shot)
- Color system with ~126 CSS custom properties
- Typography scale and font stack
- Component patterns (buttons, cards, badges, navigation)
- 3D moment slab specification (the most critical section)
- Animation catalog (ambient, transition, scroll-triggered)
- Responsiveness breakpoints and mobile adaptations
- Z-index layering system

The `target_design/` folder also contains ~100 frame images (`ezgif-frame-*.jpg`) showing animation sequences from the reference site.

---

## 15. Quick Reference for Common Tasks

### Adding a new moment slab
1. Add a `MomentSlab` object to `trendingMoments` array in `src/data/siteData.ts`
2. Place the video file in `public/videos/`
3. Place the poster image in `public/images/`
4. Set `glowColor` to the appropriate rarity hex from `rarityColors`

### Changing slab interaction timing
Edit `slabConfig` in `src/data/siteData.ts`. CSS variables in `App.css` `:root` should stay in sync.

### Adding a new section
1. Create component in `src/components/sections/`
2. Use `motion.div` with `staggerContainer`/`fadeInUp` from `@/lib/animation`
3. Import and add to `src/App.tsx` in desired position
4. Follow the pattern: `initial="hidden" whileInView="visible" viewport={scrollViewport}`

### Modifying rarity tier colors
Update in THREE places: `rarityColors` in `siteData.ts`, `rarity` object in `tailwind.config.js`, and `--slab-glow-*` variables in `App.css`.

---

*Generated on 2026-03-14. This document reflects the state of the codebase at the time of generation.*
