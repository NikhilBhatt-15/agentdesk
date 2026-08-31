import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

export function createPrismaClient(databaseUrl: string) {
  const pool = new Pool({
    connectionString: databaseUrl,
  });

  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
  });
}