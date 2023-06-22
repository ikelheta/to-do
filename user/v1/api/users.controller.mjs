import _ from "lodash";
import { MESSAGES } from "../../messages.mjs"
import { createToken } from "../../../middlewares/user.auth.mjs"
import UserProvider from "./users.provider.mjs"
import {compare} from "bcrypt"
import { BadRequestError, NotFoundError, UnauthorizedError } from "../../../shared/app-error.mjs";
import TodoProvider from "../../../todo/v1/api/todo.provider.mjs"


export default class UserController {
    static async signUp(req) {
        
        const {email} = req.body
        UserProvider.validateCreateUser(req.body)
        await UserProvider.validateExistEmail(email)
        let user = await UserProvider.create(req.body)
        const access_token = await createToken(user)

        user = _.omit(user, ["password"]);

        return {...user._doc, access_token }
    }
    static async signIn(req) {
        UserProvider.validateSignIn(req.body)
        const {email, password} = req.body
        const filters = {
            email
        }
        const user = await UserProvider.findOne(filters)
        if(!user){
            throw new NotFoundError(MESSAGES.USER_EMAIL_NOT_EXIST)
        }
        const correctPassword = await compare(password, user.password)
        if(!correctPassword){
            throw new UnauthorizedError(MESSAGES.WRONG_PASSWORD)
        }

        const access_token =  await createToken(user)

        return {access_token}
    }
    static async getOne(req) {
        const { userId } = req.user._id
        UserProvider.validateUserId(userId)
        const filters = {
            _id: userId
        }
        const projection = ['_id', 'email', 'userName']
      
        const user = await UserProvider.findOneOrThrowError(filters, projection)
        return user
    }

   
    static async update(req) {
        const {_id}  = req.user
        const {email, username, role } = req.body
        const filters = {_id }
        UserProvider.validateUserId(_id)
        const user = await UserProvider.findOneOrThrowError(filters)
        
        if(email){
            const existEmail = await UserProvider.findOne({email})
            if(existEmail && String(existEmail._id) != String(_id)){
                throw new BadRequestError(MESSAGES.USER_EMAIL_ALREADY_EXIST)
            }
        }
     
        let updatedUser = await UserProvider.updateOne(filters, req.body)
        

        return {userName : updatedUser.userName, email: updatedUser.email}
    }
    static async delete(req) {
        const {_id}  = req.user
        const filters = {_id}
        const [deletedUser, deletedTodo] = await Promise.all([
            UserProvider.deleteOne(filters),
            TodoProvider.deleteMany({userId: _id})
        ])
        return {deletedUser}
    }
  

   
} 