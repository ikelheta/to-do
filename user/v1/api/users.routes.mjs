import { Router } from "express";
import asyncWrapper from "../../../shared/async-wrapper.mjs";
import UserView from "./users.view.mjs";

const userRoutes = Router();

userRoutes
  .route("/signup").post(asyncWrapper(UserView.signUp));
  userRoutes
  .route("/signin").post(asyncWrapper(UserView.signIn));

export default userRoutes;