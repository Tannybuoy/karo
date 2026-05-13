# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.
App name: **Karo** — a co-working match app that connects people to work alongside each other at nearby cafés.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite, Tailwind CSS v4, shadcn/ui, framer-motion

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── workmate/           # Karo frontend (React + Vite)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Karo App Features

### Landing Page (`/`)
- Hero with tagline "Co-work with one person. Once a week."
- 6-hour weekly window badge
- Email waitlist signup form (1,247 waitlist count displayed)
- Scrolling sections: Window, How It Works, Why Karo, Private Beta
- Sticky nav with Private Beta badge, Sign In, Join Waitlist

### App (`/app`, `/chat`, `/profile`)
- Bottom nav with Match / Chat / Profile tabs
- **Match screen** (`/app`): Shows current week's match card with session time, status, and matched user profile. "Open Coordination Chat" CTA.
- **Chat screen** (`/chat`): Ephemeral 1:1 coordination chat. Only enabled when match is confirmed. Shows café suggestions as cards, quick reply buttons, text input. Chat disappears after session.
- **Profile screen** (`/profile`): Working style selector (Quiet/Light Chat/Brief Social), focus area chips, neighborhood preferences, travel time, social links, privacy toggles.

## Database Schema

- `profiles` — user work preferences and profile info
- `matches` — weekly match pairings with session details and chat_enabled flag
- `chat_messages` — ephemeral messages for a match session

## API Endpoints

- `GET /api/healthz` — health check
- `GET /api/profiles/me` — get current user profile (x-user-id header or "user-demo-1")
- `PUT /api/profiles/me` — upsert profile
- `GET /api/matches/current` — get this week's match
- `GET /api/chat/{matchId}/messages` — get chat messages (403 if chat not enabled)
- `POST /api/chat/{matchId}/messages` — send message
- `GET /api/chat/{matchId}/cafes` — get suggested cafés

## Demo Data

- `user-demo-match` / `profile-match-demo` — Alex Chen (matched user)
- `match-demo-1` — confirmed match between user-demo-1 and user-demo-match with chat enabled
- 3 hardcoded café suggestions in the API

## Design

Coffee/matcha color palette:
- Primary: Matcha Green (`135 15% 45%`)
- Secondary: Coffee Brown (`25 25% 42%`)
- Background: Cream/off-white (`40 33% 98%`)
- Accent: Latte (`28 40% 65%`)
- Fonts: DM Sans (body), Outfit (display)
