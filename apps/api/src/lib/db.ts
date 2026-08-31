import { createPrismaClient } from "@agentdesk/db";

export const db = createPrismaClient(
  process.env.DATABASE_URL!,
);