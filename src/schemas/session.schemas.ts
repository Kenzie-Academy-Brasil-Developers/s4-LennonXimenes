import { userSchema } from "./user.schemas";

const SessionCreate = userSchema.pick({
    email: true,
    password: true
});

export { SessionCreate };