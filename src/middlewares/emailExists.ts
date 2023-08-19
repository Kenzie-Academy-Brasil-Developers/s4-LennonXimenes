import { NextFunction, Request, Response } from "express";
import { Users, UsersResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors";

const emailExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email } = req.body;

    if (!email) return next();

    const queryString: string = `SELECT * FROM "users" WHERE "email" = $1`;

    const queryResult: UsersResult = await client.query(queryString, [email]);

    if (queryResult.rowCount) {
        throw new AppError("Email already exists.", 409)
    }

    return next();
}

export { emailExists };