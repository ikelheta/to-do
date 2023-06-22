import { AppError } from "../../../shared/app-error.mjs";
import { MESSAGES } from "../../messages.mjs";
import UserController from "./users.controller.mjs"

export default class UserView {
    static async signUp(req, res) {
        try {
            const data = await UserController.signUp(req);
            return res.send({
                message : MESSAGES.USER_CREATED_SUCCESSFULLY,
                data
            });
        } catch (error) {
            throw new AppError(error);
        }
    }

    static async signIn(req, res) {
        try {
            const data = await UserController.signIn(req);
            return res.send({
                message : MESSAGES.USER_SIGN_IN_SUCCESSFULLY,
                data
            });
        } catch (error) {
            throw new AppError(error);
        }
    }

    static async getOne(req, res) {
        try {
            const data = await UserController.getOne(req);
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
            const data = await UserController.update(req);
            return res.send({
                message : MESSAGES.USER_UPDATED_SUCCESSFULLY,
                data
            });
        } catch (error) {
            throw new AppError(error);
        }
    }

    static async delete(req, res) {
        try {
            const data = await UserController.delete(req);
            return res.send({
                message : MESSAGES.USER_DELETED_SUCCESSFULLY,
                data
            });
        } catch (error) {
            throw new AppError(error);
        }
    }


}