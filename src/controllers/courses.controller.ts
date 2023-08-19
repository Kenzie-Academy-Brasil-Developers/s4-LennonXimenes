import { Request, Response } from "express";
import { Courses, CoursesCreate, CoursesRead } from "../interfaces";
import coursesServices, { addUserToCourseService, deleteCourseService, deleteUserFromCourseService } from "../services/courses.services";
import userServices from "../services/user.services";

const createCourse = async (req: Request, res: Response): Promise<Response> => {
    const course: Courses = await coursesServices.createCourse(req.body);

    return res.status(201).json(course);
};

const readCourses = async (req: Request, res: Response): Promise<Response> => {
    const courses: CoursesRead = await coursesServices.readCourses();

    return res.status(200).json(courses);
};

const registerCourse = async (req: Request, res: Response): Promise<Response> => {
    const payload: CoursesCreate = {
        ...req.body,
        courseId: req.params.courseId,
        userId: req.params.userId
    };

    const course: Courses = await coursesServices.createCourse(payload);

    return res.status(201).json(course);
};

const deleteCourse = async (req: Request, res: Response): Promise<Response> => {
    await deleteCourseService(req.params.id);

    return res.status(204).json();
};

const addUserToCourse = async (req: Request, res: Response): Promise<Response> => {
    const { userId, courseId } = req.params;

    await addUserToCourseService(userId, courseId)

    return res.status(201).json({ message: "User linked to project" });
};

const deleteUserFromCourse = async (req: Request, res: Response): Promise<Response> => {
    const { userId, courseId } = req.params;

    await deleteUserFromCourseService(userId, courseId)

    return res.status(204).json();
};

const listUserCourses = async (req: Request, res: Response): Promise<Response> => {
    const userCourses = await coursesServices.listUserCourses(req.params.id);

    return res.status(200).json(userCourses);
}


export default { createCourse, readCourses, registerCourse, addUserToCourse, deleteUserFromCourse, listUserCourses };