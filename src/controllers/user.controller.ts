import { Request, Response } from "express";
import { Users, UsersRead } from "../interfaces";
import userServices from "../services/user.services";
import { AppError } from "../errors";


const createUser = async (req: Request, res: Response): Promise<Response> => {
    const newUser = await userServices.createUser(req.body);

    return res.status(201).json(newUser);
};

const readUsers = async (req: Request, res: Response): Promise<Response> => {
    const users: UsersRead = await userServices.readUsers();

    return res.status(200).json(users);
};

export default { createUser, readUsers };