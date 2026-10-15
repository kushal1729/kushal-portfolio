# kushalyarlagadda.in

Personal site for Kushal Yarlagadda — software engineer at HashedIn by Deloitte building AI systems that read, reason about and write software.

Built with Next.js 16 (App Router, Turbopack), TypeScript, and hand-written CSS. No animation library: motion is CSS, scroll-driven animations and the View Transitions API.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

Before pushing:

```bash
npm run lint
npm run build
```

## Structure

| Path | What lives there |
| --- | --- |
| `src/app/page.tsx` | The homepage: hero, selected work, builds, experience, research, writing, contact |
| `src/app/globals.css` | The whole design system: tokens, components, motion, print. No CSS framework classes in markup |
| `src/lib/site.ts` | Name, role, pitch, contact links, nav. Change these in one place |
| `src/content/profile.ts` | Case studies, builds, experience, papers and recognition |
| `src/content/writing.tsx` | Posts, authored as typed TSX modules |
| `src/components/trace-demo.tsx` | The hero's Read / Reason / Write demo |
| `src/components/case-figures.tsx` | The diagram beside each case study |
| `src/components/build-grid.tsx` | Filterable builds grid |
| `src/components/site-header.tsx` | Header, mobile menu, command palette (⌘K / Ctrl K) and toasts |
| `src/app/writing/` | Post index, post pages, per-post OG images, RSS feed |
| `src/app/opengraph-image.tsx` | Social preview card, generated at build time |

## Adding a post

Append an entry to the `posts` array in `src/content/writing.tsx`. Each post needs a `slug`, `title`, `standfirst`, `date` (`YYYY-MM-DD`), `readingTime`, and a `body` of JSX.

Everything else follows automatically: the route, the homepage listing, the sitemap entry, the RSS item, and a generated OG card.

## Design notes

The visual language is "Trace", borrowed from execution traces: following one request through a system. One cobalt accent marks only the thing being followed (the active state, the path, the finding); everything else is ink.

- Light: `#f1f2f4` ground, `#14161b` ink, `#2a3fe8` accent. Dark: deep ink blue `#0c1020`, accent `#8e9cff`. The site follows the system theme, with a toggle that remembers an explicit choice
- Type is Mona Sans throughout. Its width axis gives small facts (dates, stacks, venues) a condensed voice; Martian Mono appears only in literal code
- Motion: the name sets letter by letter on load and then answers the cursor along its width and weight axes; the hero demo runs Read, Reason and Write; scroll-driven reveals are shaped to what they reveal (headings sharpen, diagrams assemble, the timeline draws itself); the nav underline and filter pill glide; cards catch a spotlight; a back-to-top ring tracks reading progress. The static state is always complete, so `prefers-reduced-motion` removes the movement and loses nothing else, and browsers without scroll-driven animations simply show the content

Every text colour passes WCAG AA (4.5:1) on every surface in both themes — re-check before introducing a new one. Printing the homepage produces a clean CV without the site chrome, demo or writing list.

## Content guardrails

The legacy-systems work is employer client work. Site copy describes **method and technology only** — never client names, sectors, partners, platform names or figures, and never anything implying freelance availability. The hero demo's code, candidates and requirement are invented, and each caption is marked "Example only" for this reason.

Do not commit API keys, credentials, private client material, or unlicensed assets.

## Deployment

Hosted on Vercel, deployed from `main`. Domain registered at GoDaddy, DNS pointed at Vercel.

Pushes to `main` deploy to production automatically; pull requests get preview URLs.
