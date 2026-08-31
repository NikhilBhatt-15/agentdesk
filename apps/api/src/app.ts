import express from "express";
import { agentRoutes } from "./modules/agents/agent.routes";
import { errorHandler } from "./middleware/error-handler";

export const app = express();

app.use(express.json());

app.use("/api/agents", agentRoutes);
app.use(errorHandler);