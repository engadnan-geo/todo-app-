import {z} from "zod";
export const todoSchema = z.object({
title: z.string().min(2, "Title is required").max(100, "Title must be less than 100 characters"),
completed: z.boolean().optional(),
status: z.enum(["pending", "in-progress", "completed"]).optional()


})