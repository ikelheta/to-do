import { BadRequestError, UnprocessableEntityError } from "../../../shared/app-error.mjs"
import {MESSAGES} from "../../messages.mjs"
import Joi from "joi"
import { BaseRepository } from "../../../shared/baseReposotory.mjs"
import UserEntity from "./users.entity.mjs"



const MIN_PASSWORD = 6
const MIN_USERNAME = 6
const MAX_USERNAME = 256
class UserProvider extends BaseRepository{
    constructor(){
        super( UserEntity, MESSAGES.USER_NOT_FOUND)
    }
     async validateExistEmail(email){
        const filters = {email}
        const user = await this.findOne(filters)
        if(user){
            throw new BadRequestError(MESSAGES.USER_EMAIL_ALREADY_EXIST)
        }
    }

     validateCreateUser = (user)=>{
        const schema = Joi.object({
            userName: Joi.string().trim().min(MIN_USERNAME).max(MAX_USERNAME),
            password: Joi.string().trim().min(MIN_PASSWORD).required(),
            email: Joi.string().trim().email().required(),
        });
        const { error } = schema.validate(user);
        if (error) {
            throw new UnprocessableEntityError(error.details[0].message);
        }
        return
    }
 
     validateSignIn= (user)=>{
        const schema = Joi.object({
            password: Joi.string().trim().min(MIN_PASSWORD).required(),
            email: Joi.string().trim().email().required(),
        });
        const { error } = schema.validate(user);
        if (error) {
            throw new UnprocessableEntityError(error.details[0].message);
        }
        return
    }
     validateUserId = (userId)=>{
        if (!userId) {
            throw new UnprocessableEntityError(MESSAGES.USER_ID_REQUIRED);
        }
        const { error } = Utils.validateObjectId(userId);
        if (error) {
            throw new UnprocessableEntityError(MESSAGES.USER_INVALID_ID);
        }
        return
    }

    
}

export default new UserProvider()