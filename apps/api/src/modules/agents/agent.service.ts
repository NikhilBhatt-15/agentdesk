import {AgentRepository} from "./agent.respository"
import type { CreateAgentInput } from "./agent.types";

export class AgentService {
    constructor(private readonly agentRepository: AgentRepository) {}

    async createAgent(input: CreateAgentInput) {
        if(!input.name || !input.description || !input.systemPrompt || !input.model) {
            throw new Error("Missing required fields");
        }
        const agent = await this.agentRepository.create(input);
        return agent;
    }

    async getAgentById(id: string) {
        if(!id) {
            throw new Error("Missing required field: id");
        }
        const agent = await this.agentRepository.findById(id);
        return agent;
    }
}