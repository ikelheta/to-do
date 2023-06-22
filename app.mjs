/* eslint-disable import/no-extraneous-dependencies */
import compression from "compression";
import express from "express";
import helmet from "helmet";
import config from "./config/config.mjs";
import AppErrorHandler from "./config/error.mjs";
import { morganErrorHandler, morganSuccessHandler } from "./config/morgan.mjs";
// import { createServer } from 'http';
import LangMiddleware from "./middlewares/lang.middleware.mjs";
import cors from "cors"
import response from "./config/response.mjs";
import userRoutes from "./user/routes.mjs";
import todoRoutes from "./todo/routes.mjs";




const app = express();




app.use(morganSuccessHandler);
app.use(morganErrorHandler);
app.use(cors())

app.use(helmet());

app.use(express.json({ limit: config.router.limit.request }));
app.use(
  express.urlencoded({
    extended: true,
    limit: config.router.limit.request,
    parameterLimit: config.router.limit.parameter,
  })
);


app.use(compression());

app.use(response);

app.use("/users", LangMiddleware, userRoutes);
app.use("/todo", LangMiddleware, todoRoutes);




app.use(AppErrorHandler.handler);
app.use(AppErrorHandler.notFound);

export default app;
