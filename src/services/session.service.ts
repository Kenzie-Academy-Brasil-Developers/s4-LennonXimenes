import { compare } from "bcryptjs";
import { client } from "../database";
import { AppError } from "../errors";
import { SessionCreate, SessionReturn, UsersResult } from "../interfaces";
import { sign } from "jsonwebtoken";

const loginSession = async (sessionData: SessionCreate): Promise<string> => {
    const queryString: string = `
        SELECT * FROM "users"
        WHERE email = $1;
    `;

    const queryResult: UsersResult = await client.query(queryString, [sessionData.email]);

    if (!queryResult.rowCount) {
        throw new AppError("Wrong email/password", 401);
    };

    const matchPass: boolean = await compare(sessionData.password, queryResult.rows[0].password);

    if (!matchPass) {
        throw new AppError("Wrong email/password", 401);
    };

    if (!queryResult.rows[0].admin) {
        throw new AppError("This user is inactive", 401);
    };

    const token: string = sign(
        { email: queryResult.rows[0].email },
        process.env.SECRET_KEY!,
        {
            expiresIn: process.env.EXPIRES_IN!,
            subject: queryResult.rows[0].id.toString()
        }
    );

    return token;
}


export default loginSession;