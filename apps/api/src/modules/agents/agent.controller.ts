import type {Request, Response} from "express";
import {agentService} from "./agent.module";


export async function createAgent(req: Request, res: Response) {
    try {
        const input = req.body;
        const agent = await agentService.createAgent(input);
        res.status(201).json(agent);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}