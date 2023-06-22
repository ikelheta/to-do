import { AppError } from "../../../shared/app-error.mjs";
import { MESSAGES } from "../../messages.mjs";
import TodoController from "./todo.controller.mjs"

export default class TodoView {
    static async create(req, res){
        try {
            const data = await TodoController.createTodo(req);
            return res.send({
                success : MESSAGES.TODO_CREATED_SUCCESSFULLY,
                data
            });
        } catch (error) {

            console.info(error)
            throw new AppError(error);
        }

    }
   
    static async getOne(req, res) {
        try {
            const data = await TodoController.getOne(req);
            return res.send({
                success : true,
                data
            });
        } catch (error) {
            throw new AppError(error);
        }
    }

 



    static async update(req, res) {
        try {
            const data = await TodoController.update(req);
            return res.send({
                message : MESSAGES.TODO_UPDATED_SUCCESSFULLY,
                data
            });
        } catch (error) {
            throw new AppError(error);
        }
    }

    static async delete(req, res) {
        try {
            const data = await TodoController.delete(req);
            return res.send({
                message : MESSAGES.TODO_DELETED_SUCCESSFULLY,
                data
            });
        } catch (error) {
            throw new AppError(error);
        }
    }


}