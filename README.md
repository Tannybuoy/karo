# Karo

A co-working match app that connects people to work alongside each other at nearby cafés — "Co-work with one person. Once a week."

## Stack

- **Frontend**: React 19 + Vite, Tailwind CSS v4, shadcn/ui, framer-motion
- **Backend**: Node.js 24, Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Monorepo**: pnpm workspaces + TypeScript

## Prerequisites

- [Node.js 24](https://nodejs.org/)
- [pnpm](https://pnpm.io/installation) — `npm install -g pnpm`
- PostgreSQL database (local install or a free hosted option like [Neon](https://neon.tech))

## Running Locally

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment variables

Create a `.env` file (or set these in your terminal session):

**API server** — create `artifacts/api-server/.env`:
```
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/karo
```

**Frontend** — create `artifacts/workmate/.env`:
```
PORT=5173
VITE_API_URL=http://localhost:3000
```

> `BASE_PATH` defaults to `/` locally — no need to set it.

### 3. Run database migrations

```bash
# From the repo root
cd lib/db
DATABASE_URL=postgresql://... pnpm drizzle-kit push
```

### 4. Start the API server

Open a terminal and run:

```powershell
# Windows PowerShell
cd artifacts\api-server
$env:PORT="3000"; $env:DATABASE_URL="postgresql://user:password@localhost:5432/karo"; pnpm run build; pnpm run start
```

```bash
# Mac / Linux / Git Bash
cd artifacts/api-server
PORT=3000 DATABASE_URL=postgresql://... pnpm run build && pnpm run start
```

The API will be available at `http://localhost:3000`.

### 5. Start the frontend

Open a second terminal:

```bash
cd artifacts/workmate
pnpm run dev
```

The app will be available at `http://localhost:5173`.

## Project Structure

```
karo2/
├── artifacts/
│   ├── api-server/     # Express 5 API
│   └── workmate/       # React + Vite frontend
├── lib/
│   ├── db/             # Drizzle ORM schema + DB connection
│   ├── api-spec/       # OpenAPI spec
│   ├── api-client-react/  # Generated React Query hooks
│   └── api-zod/        # Generated Zod schemas
└── scripts/
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/healthz` | Health check |
| GET | `/api/profiles/me` | Get current user profile |
| PUT | `/api/profiles/me` | Update profile |
| GET | `/api/matches/current` | Get this week's match |
| GET | `/api/chat/:matchId/messages` | Get chat messages |
| POST | `/api/chat/:matchId/messages` | Send a message |
| GET | `/api/chat/:matchId/cafes` | Get café suggestions |

Pass `x-user-id` header to identify the user (defaults to `user-demo-1`).

## Deploying to Vercel

Vercel works best for the **frontend**. The Express API needs a separate host.

### Frontend on Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → New Project → import your repo.
3. Set **Root Directory** to `artifacts/workmate`.
4. Set **Build Command** to `pnpm run build`.
5. Set **Output Directory** to `dist/public`.
6. Add environment variables in the Vercel dashboard:
   - `VITE_API_URL` = your deployed API URL (e.g. `https://karo-api.railway.app`)

### API + Database

Vercel Serverless Functions don't run Express natively. Recommended options:

| Option | Notes |
|--------|-------|
| **[Railway](https://railway.app)** | Easiest — deploy the `artifacts/api-server` folder + provision a Postgres DB in one place |
| **[Render](https://render.com)** | Free tier available for web services + managed Postgres |
| **[Fly.io](https://fly.io)** | Good for Docker-based deploys |

For any of these, set `PORT` and `DATABASE_URL` as environment variables on the platform.

### Database migrations on deploy

Run migrations once after provisioning the database:

```bash
DATABASE_URL=<your-production-url> pnpm --filter @workspace/db drizzle-kit push
```
