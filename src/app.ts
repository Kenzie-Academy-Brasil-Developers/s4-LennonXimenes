import "express-async-errors";
import express, { Application, json } from 'express'
import { handleErrors } from "./middlewares";
import { userRouter, courseRouter, sessionRouter } from "./routers";

const app: Application = express()
app.use(json())

app.use("/users", userRouter);
app.use("/courses", courseRouter);
app.use("/login", sessionRouter);


app.use(handleErrors);

export default app
