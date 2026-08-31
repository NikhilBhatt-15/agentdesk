import {db} from "../../lib/db";
import type { PrismaClient } from "@agentdesk/db";
import type { CreateAgentInput } from "./agent.schema";
export class AgentRepository {
    constructor(private readonly db: PrismaClient) {}

    async create(input:CreateAgentInput) {
        const agent = await this.db.agent.create({
            data: input,
        });
        return agent;
    }
    async findById(id: string) {
        const agent = await this.db.agent.findUnique({
            where: { id },
        });
        return agent;
    }
}