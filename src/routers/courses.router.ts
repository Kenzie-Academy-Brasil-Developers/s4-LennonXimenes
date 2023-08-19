import { Router } from "express";
import coursesController from "../controllers/courses.controller";
import { tokenValid, validateBody } from "../middlewares";
import { courseCreateSchema } from "../schemas";



const courseRouter: Router = Router();

courseRouter.post("", validateBody(courseCreateSchema), coursesController.createCourse);
courseRouter.get("", coursesController.readCourses);

courseRouter.post("/:courseId/users/:userId", tokenValid, coursesController.addUserToCourse);
courseRouter.delete("/:courseId/users/:userId", tokenValid, coursesController.deleteUserFromCourse);
courseRouter.get("/:id/users", coursesController.listUserCourses);


export default courseRouter;