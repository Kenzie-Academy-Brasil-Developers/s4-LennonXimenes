import { z } from "zod";

const courseSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(50),
    description: z.string()
});

const courseCreateSchema = courseSchema.omit({ id: true });
const courseUpdateSchema = courseCreateSchema.partial();

export { courseSchema, courseCreateSchema, courseUpdateSchema };