import format from "pg-format"
import { client } from "../database";
import { Courses, CoursesResult, CoursesCreate, CoursesRead, CoursesUpdate, UsersResult } from "../interfaces";
import { AppError } from "../errors";

const createCourse = async (payload: CoursesCreate): Promise<Courses> => {
    const queryString: string = format(
        `
            INSERT INTO "courses"
	            (%I)
            VALUES
                (%L)
            RETURNING *;
        `,
        Object.keys(payload),
        Object.values(payload)
    );

    const queryResult: CoursesResult = await client.query(queryString);

    return queryResult.rows[0];
};

const readCourses = async (): Promise<CoursesRead> => {
    const queryString: string = `
        SELECT * FROM "courses";
    `;

    const queryResult: CoursesResult = await client.query(queryString);

    return queryResult.rows;
}

export const deleteCourseService = async (userId: string): Promise<void> => {
    const queryString: string = `
        UPDATE "userCourses"
        SET active = false
        WHERE id = $1;
    `;

    await client.query(queryString, [userId]);
}

export const addUserToCourseService = async (userId: string, courseId: string): Promise<void> => {
    const queryString: string =
        `
            INSERT INTO "userCourses"
	            ("userId", "courseId")
            VALUES
                ($1, $2)
            RETURNING *;
        `;

    await client.query(queryString, [userId, courseId]);
}

export const deleteUserFromCourseService = async (userId: string, courseId: string): Promise<void> => {
    const queryString: string =
        `
            DELETE FROM "userCourses"
	        WHERE "userId" = $1
            AND "courseId" = $2;
        `;

    await client.query(queryString, [userId, courseId]);
}

const listUserCourses = async (userId: string) => {
    const queryString: string = `
        SELECT
            "u"."id" AS "userId",
            "u"."name" AS "userName",
            "c"."id" AS "courseId",
            "c"."name" AS "courseName",
            "c"."description" AS "courseDescription",
            "uc"."active" AS "userActiveInCourse"
        FROM "users" AS "u"
        JOIN "userCourses" AS "uc"
            ON "uc"."userId" = "u"."id"
        JOIN "courses" AS "c"
            ON "uc"."courseId" = "c"."id"
        WHERE "u"."id" = $1;
    `;

    const queryResult: UsersResult = await client.query(queryString, [userId]);

    if(!queryResult.rowCount){
        throw new AppError("No course linked to this user", 401);
    }

    return queryResult.rows;
}

export default { createCourse, readCourses, listUserCourses };