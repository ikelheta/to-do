import { Router } from "express";
import userRoutes from "./v1/v1-routes.mjs";

const routes = Router();

routes.use("/v1", userRoutes);

export default routes;
