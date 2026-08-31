# AgentDesk

AgentDesk is a platform-in-progress for creating and running AI agents.

The current milestone focuses on backend foundations:
- Monorepo setup with Turborepo + pnpm
- PostgreSQL in Docker
- Prisma ORM and migration flow
- First API endpoint to create an agent

## Vision

AgentDesk will allow users to:
- Create agents with a dedicated prompt, model, and metadata
- Run agents against tasks and workflows
- Manage and monitor multiple agent types from one platform

This repository currently implements the first part of that plan: agent creation and persistence.

## Current Status

Implemented now:
- `POST /api/agents` endpoint in the API app
- `Agent` Prisma model and initial migration
- Database client package shared via `@agentdesk/db`
- Dockerized local PostgreSQL (`postgres:17`)

Planned next:
- Get agent by id/list APIs
- Agent execution runtime
- Frontend workflows for creating and managing agents

## Tech Stack

- Runtime: Node.js (>= 24)
- Monorepo: Turborepo + pnpm workspaces
- API: Express + TypeScript
- Database: PostgreSQL
- ORM: Prisma (with `@prisma/adapter-pg`)
- Infra (local): Docker Compose

## Repository Layout

```text
agentdesk/
  apps/
    api/        # Express API (agent routes)
    web/        # Next.js app (UI work in progress)
    docs/       # Next.js docs app
  packages/
    db/         # Prisma schema, migrations, shared DB client
    ui/         # Shared UI components
    eslint-config/
    typescript-config/
```

## Quick Start

### 1) Prerequisites

- Node.js `>=24`
- pnpm `11+`
- Docker Desktop (or Docker Engine + Compose)

### 2) Install dependencies

```bash
pnpm install
```

### 3) Start PostgreSQL

```bash
docker compose up -d
```

Postgres runs with:
- Host: `localhost`
- Port: `5433`
- Database: `agentdesk`
- Username: `agentdesk`
- Password: `agentdesk`

### 4) Configure environment

Create `apps/api/.env`:

```env
DATABASE_URL="postgresql://agentdesk:agentdesk@localhost:5433/agentdesk"
```

For Prisma CLI commands in `packages/db`, also create `packages/db/.env` with the same `DATABASE_URL` value.

### 5) Run Prisma generate + migrations

```bash
pnpm --filter @agentdesk/db db:generate
pnpm --filter @agentdesk/db db:migrate
```

### 6) Start the API

```bash
pnpm --filter @agentdesk/api dev
```

The API starts on `http://localhost:3001`.

## API: Create Agent

### Endpoint

`POST /api/agents`

### Request body

```json
{
  "name": "Support Assistant",
  "description": "Answers user account questions",
  "systemPrompt": "You are a helpful support agent.",
  "model": "gpt-4.1-mini"
}
```

### Success response

`201 Created`

```json
{
  "id": "cmf...",
  "name": "Support Assistant",
  "description": "Answers user account questions",
  "systemPrompt": "You are a helpful support agent.",
  "model": "gpt-4.1-mini",
  "createdAt": "2026-09-01T00:00:00.000Z",
  "updatedAt": "2026-09-01T00:00:00.000Z"
}
```

### Quick curl test

```bash
curl -X POST http://localhost:3001/api/agents \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Support Assistant",
    "description": "Answers user account questions",
    "systemPrompt": "You are a helpful support agent.",
    "model": "gpt-4.1-mini"
  }'
```

## Workspace Commands

From repository root:

```bash
pnpm dev          # run dev tasks across workspace
pnpm build        # build all packages/apps
pnpm lint         # lint all packages/apps
pnpm check-types  # TypeScript checks
```

## Notes

- This is an active build; expect rapid iteration.
- Existing API validation is intentionally minimal and will be hardened in upcoming milestones.
- See `AGENT.md` for the current agent model contract and design direction.
