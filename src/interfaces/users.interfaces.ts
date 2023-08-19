import { QueryResult } from "pg";
import { userCreateSchema, userSchema, userWithoutPassword } from "../schemas";
import { z } from "zod";

type Users = z.infer<typeof userSchema>

type UsersCreate = z.infer<typeof userCreateSchema>
type UsersRead = Array<Users>;
type UsersReturn = z.infer<typeof userWithoutPassword>
type UsersResult = QueryResult<Users>;

export { Users, UsersResult, UsersCreate, UsersRead, UsersReturn };