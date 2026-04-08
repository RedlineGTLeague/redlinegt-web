# Redline GT League Website

Official website for Redline GT League, a competitive Gran Turismo 7 racing league.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4, CSS custom properties
- **Components**: Radix UI primitives + shadcn/ui patterns
- **Forms**: React Hook Form + Zod validation
- **Fonts**: Inter (body), Oswald (headings)
- **Analytics**: Vercel Analytics

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout with nav/footer
│   ├── calendario/        # Race calendar page
│   ├── clasificacion/     # Team standings page
│   ├── reglamento/        # Rulebook (multilingual)
│   └── reportar-incidente/ # Incident report form (disabled)
├── components/            # Reusable components
│   ├── ui/               # Base UI components (shadcn-style)
│   ├── navigation.tsx    # Sticky header nav
│   ├── footer.tsx        # Footer
│   ├── champion-banner.tsx
│   ├── team-table.tsx
│   ├── teams-section.tsx
│   ├── pre-qualy-card.tsx  # Pre-qualification event card
│   └── background-slideshow.tsx
├── lib/                   # Utilities and data
│   ├── data.ts           # Teams, standings, races, Redline TV
│   ├── routes.ts         # Nav items config
│   ├── reglamento-server.ts  # Rulebook markdown loading
│   └── backgrounds.ts    # Background image config
├── public/                # Static assets
│   ├── images/           # Logos, team logos
│   ├── bgs/             # Background images
│   └── media/           # Rulebook media assets
└── redlinegt-rulebook/   # Markdown rulebook content
    └── content/rules/   # ES, PT, CA translations
```

## Features

### Pages
- **Homepage**: Hero with season status, next race info, standings preview, team grid, quick links
- **Clasificación**: Team standings table with points gap analysis
- **Calendario**: Season calendar with race status indicators and progress bar
- **Reglamento**: Interactive rulebook with language switcher (ES/PT/CA), table of contents, video embeds
- **Reportar Incidente**: Incident report form (currently disabled)

### Components
- Sticky navigation with mobile hamburger menu
- Animated background slideshow with Ken Burns effect
- Team logos and standings table
- Champion banner (shown when season is completed)
- Pre-Qualy card (toggleable event card for pre-season car drafting)
- Theme support (dark mode default, theme-provider)
- Responsive design

### Data
- 6 active teams (SRT, TSR, KSM, TR, GRT, HRB)
- 3 inactive/past teams (BPF, SHK, SPUK)
- 8 rounds per season (GT7 circuits)
- Redline TV integration (Twitch/YouTube via caster dihondia)

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Notes

- Season data is hardcoded in `lib/data.ts` - update for new seasons
- Rulebook content lives in `redlinegt-rulebook/content/rules/{lang}/`
- Incidents page is disabled via `routes.ts` `enabled: false` flag
- Pre-Qualy card is controlled via `preQualy` object in `lib/data.ts`:
  - Set `enabled: true/false` to show/hide
  - Update `circuit` and `car` when announced
- Discord invite: https://discord.gg/bybcwHPQ3
