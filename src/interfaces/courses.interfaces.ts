import { QueryResult } from "pg";
import { courseCreateSchema, courseSchema, courseUpdateSchema } from "../schemas";
import { z } from "zod";

type Courses = z.infer<typeof courseSchema>


type CoursesResult = QueryResult<Courses>;
type CoursesCreate = z.infer<typeof courseCreateSchema>
type CoursesRead = Array<Courses>;
type CoursesUpdate = z.infer<typeof courseUpdateSchema>

export { Courses, CoursesResult, CoursesCreate, CoursesRead, CoursesUpdate };