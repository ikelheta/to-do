import { Router } from "express";
import asyncWrapper from "../../../shared/async-wrapper.mjs";
import { userAuth } from "../../../middlewares/user.auth.mjs";
import TodoView from "./todo.view.mjs";

const todoRoutes = Router();


todoRoutes.use(asyncWrapper(userAuth))
todoRoutes.route('/').post(asyncWrapper( TodoView.create))
todoRoutes.route('/:todoId').get( asyncWrapper(TodoView.getOne)).delete(asyncWrapper(TodoView.delete)).put(asyncWrapper(TodoView.update))





export default todoRoutes;