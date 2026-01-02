import { z } from 'zod';

export const productZodSchema = z.object({
  body: z.object({
    // Using simple strings instead of objects to avoid TS(2353)
    name: z.string().min(1, "Name is required"),

    // Passing the type error message directly as a string
    price: z.number().positive("Price must be a positive number"),

    category: z.string().min(1, "Category is required"),

    description: z.string().optional(),

    stock: z.number().int().nonnegative().optional()
  }).strict()
});