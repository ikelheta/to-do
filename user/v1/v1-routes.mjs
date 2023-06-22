import { Router } from "express";
import apiRoutes from "./api/users.routes.mjs";


const v1Routes = Router();

v1Routes.use("/api", apiRoutes);

export default v1Routes;
