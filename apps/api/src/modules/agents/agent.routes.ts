import { Router } from "express";
import { createAgent } from "./agent.controller";

export const agentRoutes = Router();

agentRoutes.post("/", createAgent);