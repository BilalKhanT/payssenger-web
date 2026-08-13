# Payssenger

Marketing site for **Payssenger** — offline-first digital banking. When the
internet drops, Payssenger keeps banking working by sending signed,
bank-verified payments over SMS.

Built with the Next.js App Router, TypeScript, CSS Modules, Three.js (hero
particle network), and [Lenis](https://github.com/darkroomengineering/lenis)
for buttery, momentum-based smooth scrolling.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script              | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the dev server                 |
| `npm run build`     | Production build                     |
| `npm run start`     | Serve the production build           |
| `npm run lint`      | Run ESLint                           |
| `npm run typecheck` | Type-check without emitting          |

## Project structure

```
src/
├── app/
│   ├── globals.css          # Design tokens, base styles, keyframes
│   ├── layout.tsx           # Fonts + SmoothScroll provider
│   └── page.tsx             # Section composition
├── components/
│   ├── layout/              # Navbar, Footer
│   ├── providers/           # SmoothScroll (Lenis)
│   ├── sections/            # Hero, Marquee, Problem, HowItWorks,
│   │                        #   Security, Statement, Stats, CTA
│   └── ui/                  # Reveal, Counter, MagneticLink,
│                            #   HeroCanvas, PhoneMock
├── hooks/                   # useInView, useMagnetic
└── lib/
    └── heroNetwork.ts       # Three.js hero animation
```

## Design system

| Token       | Value     | Usage                      |
| ----------- | --------- | -------------------------- |
| `--ink`     | `#1a3c58` | Dark surfaces, text        |
| `--bg`      | `#eef1f6` | Page background            |
| `--paper`   | `#ffffff` | Cards                      |
| `--muted`   | `#5f6f80` | Secondary text             |
| `--signal`  | `#3e9be0` | Primary accent             |
| `--wire`    | `#8fc9ef` | Light accent               |

Fonts: **Space Grotesk** (display), **Hanken Grotesk** (body),
**Space Mono** (labels) — loaded via `next/font/google`.

## Accessibility & motion

All animations (Lenis smooth scroll, reveals, marquee, the floating phone,
and the WebGL hero) respect `prefers-reduced-motion`.
