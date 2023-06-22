import { BadRequestError, UnprocessableEntityError } from "../../../shared/app-error.mjs"
import MESSAGES from "../../../shared/messages.mjs"
import Utils from "../../../shared/utils.mjs"
import TodoEntity from "./todo.entity.mjs"
import Joi from "joi"
import { BaseRepository } from "../../../shared/baseReposotory.mjs"


const MIN_TITLE_LENGTH = 2
const MAX_TITLE_LENGTH = 512
const MIN_DESCRIPTION_LENGTH = 2
const MAX_DESCRIPTION_LENGTH = 512



class TodoProvider extends BaseRepository{
    constructor(){
        super( TodoEntity, MESSAGES.TODO_NOT_FOUND)
    }
  

     validateCreateTodo = (todo)=>{
        const schema = Joi.object({
            title: Joi.string().min(MIN_TITLE_LENGTH).max(MAX_TITLE_LENGTH).required(),
            description: Joi.string().min(MIN_DESCRIPTION_LENGTH).max(MAX_DESCRIPTION_LENGTH).required(),
           
        });
        const { error } = schema.validate(todo);
        if (error) {
            throw new UnprocessableEntityError(error.details[0].message);
        }
        return
        
    }
 
    validateUpdateTodo = (todo)=>{
        const schema = Joi.object({
            title: Joi.string().trim().min(MIN_TITLE_LENGTH).max(MAX_TITLE_LENGTH),
            description: Joi.string().trim().min(MIN_DESCRIPTION_LENGTH).max(MAX_DESCRIPTION_LENGTH),
           
        });
        const { error } = schema.validate(todo);
        if (error) {
            throw new UnprocessableEntityError(error.details[0].message);
        }
        return
        
    }

    validateTodoId = (todoId)=>{
        if (!todoId) {
            throw new UnprocessableEntityError(MESSAGES.TODO_ID_REQUIRED);
        }
        const { error } = Utils.validateObjectId(todoId);
        if (error) {
            throw new UnprocessableEntityError(MESSAGES.TODO_INVALID_ID);
        }
        return
    }
   


    
}

export default new TodoProvider()