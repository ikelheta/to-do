/* eslint-disable */
import bcrypt from "bcrypt";
import { UnprocessableEntityError } from "./app-error.mjs";

import MESSAGES from "./messages.mjs";
import mongoose from "mongoose";

export default class Utils {
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }
  static validateObjectId = (id) => {
    if (!mongoose.isValidObjectId(id)) {
        return { error: "Invalid ID!" };
    }
    return true;
};

}
