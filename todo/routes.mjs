import { Router } from "express";
import todoRoutes from "./v1/v1-routes.mjs";

const routes = Router();

routes.use("/v1", todoRoutes);

export default routes;
