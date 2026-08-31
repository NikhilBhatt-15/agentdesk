import express from "express";
import { agentRoutes } from "./modules/agents/agent.routes";

export const app = express();

app.use(express.json());

app.use("/api/agents", agentRoutes);