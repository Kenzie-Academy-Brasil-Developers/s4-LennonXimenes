import { Request, Response } from "express";
import { loginSession } from "../services";

const sessionController = async (req: Request, res: Response): Promise<Response> => {
    const token = await loginSession(req.body);

    return res.status(200).json({ token });
}

export default sessionController;