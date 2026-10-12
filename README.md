# kushalyarlagadda.in

Personal site for Kushal Yarlagadda — software engineer working on legacy codebase archaeology: using AI to map, document and modernize enterprise systems that have outlived their documentation and their original engineers.

Built with Next.js 16 (App Router, Turbopack), TypeScript, and hand-written CSS.

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
| `src/app/page.tsx` | The homepage — hero, the problem, method, work, writing, credentials, about, contact |
| `src/app/globals.css` | The whole design system. No CSS framework classes in markup |
| `src/lib/site.ts` | Name, role, positioning line, contact links. Change these in one place |
| `src/content/writing.tsx` | Posts, authored as typed TSX modules |
| `src/components/chrome.tsx` | Shared header and footer |
| `src/app/writing/` | Post index, post pages, per-post OG images, RSS feed |
| `src/app/opengraph-image.tsx` | Social preview card, generated at build time |

## Adding a post

Append an entry to the `posts` array in `src/content/writing.tsx`. Each post needs a `slug`, `title`, `standfirst`, `date` (`YYYY-MM-DD`), `readingTime`, and a `body` of JSX.

Everything else follows automatically: the route, the homepage listing, the sitemap entry, the RSS item, and a generated OG card.

## Design notes

The visual language is "Core Sample", built around archaeological survey drawings rather than dev-portfolio convention. Colour is semantic, not decorative:

- **verdigris** `#1b5f4d` — the existing system: patina, age, what is already there
- **ochre** `#7a5508` — annotation: a marking made on it, something found

Type is Archivo for structure, Newsreader for reading passages, and JetBrains Mono for literal code only. All muted tones are tuned to pass WCAG AA (4.5:1) on the limestone ground — re-check contrast before introducing a new one.

## Content guardrails

The legacy-systems work is employer client work. Site copy describes **method and capability only** — never client names, systems, or figures, and never anything implying freelance availability. The strata drawing in the hero is captioned as illustrative for this reason.

Do not commit API keys, credentials, private client material, or unlicensed assets.

## Deployment

Hosted on Vercel, deployed from `main`. Domain registered at GoDaddy, DNS pointed at Vercel.

Pushes to `main` deploy to production automatically; pull requests get preview URLs.
