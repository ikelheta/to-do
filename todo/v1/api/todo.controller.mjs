import _ from "lodash";
import {  UnauthorizedError } from "../../../shared/app-error.mjs";
import TodoProvider from "./todo.provider.mjs"

export default class UserController {
    static async createTodo(req){
        const userId = req.user._id

        TodoProvider.validateCreateTodo(req.body)
        const todo = await TodoProvider.create({...req.body, userId})
        return todo

    }
   
    static async getOne(req) {
        const  userId  = req.user._id
        const {todoId}  = req.params
        TodoProvider.validateTodoId(todoId)

        const filters = {
            _id: todoId
        }

        const todo = await TodoProvider.findOneOrThrowError(filters)
        console.info(userId)
        console.info(todo)
        if(String(todo.userId) != String (userId)){
            throw new UnauthorizedError()
        }
        return todo
    }



   
    static async update(req) {
        const  userId  = req.user._id
        const {todoId} =req.params
        


        TodoProvider.validateUpdateTodo(req.body)

        const filters = {
           _id  : todoId 
        }
        const todo = await TodoProvider.findOneOrThrowError(filters)
        if(String(todo.userId) != String (userId)){
            throw new UnauthorizedError()
        }
        
     
     
        let updatedTodo = await TodoProvider.updateOne(filters, req.body)
        

        return updatedTodo
    }
    static async delete(req) {
        const  userId  = req.user._id
        const {todoId} = req.params
        TodoProvider.validateTodoId(todoId)

        const filters = {
            _id: todoId
        }
        const todo = await TodoProvider.findOneOrThrowError(filters)
        if(String(todo.userId) != String (userId)){
            throw new UnauthorizedError()
        }
        const deleted = await TodoProvider.deleteOne(filters)

       
        return deleted
    }
   
} 