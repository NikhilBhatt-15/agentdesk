import {AgentRepository} from "./agent.respository";
import {AgentService} from "./agent.service";
import {db} from "../../lib/db";
const agentRepository = new AgentRepository(db);
export const agentService = new AgentService(agentRepository);