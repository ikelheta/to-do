import  jwt from "jsonwebtoken"
import { UnauthorizedError } from "../shared/app-error.mjs";
import UserProvider from "../user/v1/api/users.provider.mjs";
  export const verifyTokenGetUserData = async(token)=> {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET_KEY || "SECRET")
      const { _id } = payload
      const filters = {
        _id
      }
      const user = await UserProvider.findOneOrThrowError(filters)
      return user
    } catch (error) {
      throw new UnauthorizedError()
    }
   
  }

  export const userAuth =async (req, res, next)=> {

    const bearerToken = req.headers.authorization;

    if (!bearerToken || !String(bearerToken).startsWith("Bearer ")) {
      throw new UnauthorizedError();
    }
    const token = bearerToken.split(" ")[1];
    if (!token) {
      throw new UnauthorizedError()
    }
    const user = await verifyTokenGetUserData(token)
    req.user = user
    next()
  }

   
  export const createToken =async (user) => {
    const id = user._id
    return jwt.sign({ _id:id }, process.env.JWT_SECRET_KEY || "SECRET", {
      expiresIn: process.env.JWT_EXPIRE_IN,
    })
  }

