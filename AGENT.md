## Agent Model and API

This document defines how agents are represented in AgentDesk today and how this model is expected to evolve.

## Purpose

AgentDesk is being built as a platform for users to create and run different kinds of agents.

The current implementation milestone is focused on one capability:
- Creating and storing an agent through the API

## Current Agent Schema

The `Agent` entity is stored in PostgreSQL through Prisma.

Fields currently implemented:
- `id` (`String`, generated with `cuid()`)
- `name` (`String`)
- `description` (`String?` in Prisma schema)
- `systemPrompt` (`String`)
- `model` (`String`)
- `createdAt` (`DateTime`, defaults to `now()`)
- `updatedAt` (`DateTime`, auto-updated)

Schema location:
- `packages/db/prisma/schema.prisma`

## Create Agent API

### Endpoint

- Method: `POST`
- Path: `/api/agents`

### Input contract (current service validation)

All of the following are required by the service layer right now:
- `name`
- `description`
- `systemPrompt`
- `model`

If any required field is missing, the API returns:
- Status: `400`
- Body: `{ "error": "Missing required fields" }`

### Success contract

On success, the API returns:
- Status: `201`
- Body: created `Agent` record

### Example request

```json
{
  "name": "Research Assistant",
  "description": "Helps gather and summarize technical info",
  "systemPrompt": "You are a focused research assistant.",
  "model": "gpt-4.1-mini"
}
```

## Current Module Flow

Request flow in `apps/api`:
1. Route receives `POST /api/agents`
2. Controller reads request body
3. Service validates required fields
4. Repository writes to Prisma client
5. Created agent is returned in response

Key files:
- `apps/api/src/modules/agents/agent.routes.ts`
- `apps/api/src/modules/agents/agent.controller.ts`
- `apps/api/src/modules/agents/agent.service.ts`
- `apps/api/src/modules/agents/agent.respository.ts`

## Database and Local Infra

- PostgreSQL runs in Docker via `docker-compose.yml`
- Prisma migration for agent creation exists in:
  - `packages/db/prisma/migrations/20260831174254_create_agent/migration.sql`

Required environment variable:
- `DATABASE_URL`

## Planned Evolution

Expected next steps for the agent domain:
- Add strict request validation (schema-based)
- Align optional/required behavior for `description` between API and DB schema
- Add read/list/update/delete endpoints
- Add execution runtime concepts (runs, status, logs)
- Introduce agent tools/integrations and per-agent configuration

This file should be updated whenever the agent contract or behavior changes.
