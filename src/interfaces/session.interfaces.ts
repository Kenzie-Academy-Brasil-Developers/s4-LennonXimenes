import { z } from "zod";
import { SessionCreate } from "../schemas/session.schemas";

type SessionCreate = z.infer<typeof SessionCreate>;
type SessionReturn = { token: string };

export { SessionCreate, SessionReturn };