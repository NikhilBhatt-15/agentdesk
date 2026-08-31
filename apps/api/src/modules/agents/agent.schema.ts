import { z } from "zod";

export const createAgentSchema = z.object({
  name: z.string().trim().min(1).max(100),

  description: z
    .string()
    .trim()
    .max(500)
    .optional(),

  systemPrompt: z
    .string()
    .trim()
    .min(1),

  model: z
    .string()
    .trim()
    .min(1),
});

export type CreateAgentInput = z.infer<
  typeof createAgentSchema
>;