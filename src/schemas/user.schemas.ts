import { z } from "zod";

const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(50),
    email: z.string().email().max(50),
    password: z.string().max(120),
    admin: z.boolean().default(false)
});

const userCreateSchema = userSchema.omit({ id: true });
const userWithoutPassword = userSchema.omit({ password: true });


export { userSchema, userCreateSchema, userWithoutPassword };