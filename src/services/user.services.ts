import format from "pg-format"
import { client } from "../database";
import { UsersCreate, UsersRead, UsersResult, UsersReturn } from "../interfaces";
import { hash } from "bcryptjs";
import { userWithoutPassword } from "../schemas";
import { AppError } from "../errors";

const createUser = async (userData: UsersCreate): Promise<UsersReturn> => {
    userData.password = await hash(userData.password, 10);

    const queryString: string = format(
        `
            INSERT INTO "users"
	            (%I)
            VALUES
                (%L)
            RETURNING *;
        `,
        Object.keys(userData),
        Object.values(userData)
    );

    const queryResult: UsersResult = await client.query(queryString);

    return userWithoutPassword.parse(queryResult.rows[0]);
};

const readUsers = async (): Promise<UsersRead> => {
    const queryString: string = `
        SELECT * FROM "users";
    `;
    const queryResult: UsersResult = await client.query(queryString);

    return queryResult.rows;
}

export default { createUser, readUsers }; 