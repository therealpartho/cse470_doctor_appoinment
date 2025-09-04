import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./Database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import {errorMiddleware} from './middlewarse/errorMiddleware.js';
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";

// Load environment variables early
config({ path: "./config/config.env" });

const app = express();

// Middleware setup
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL, "http://localhost:5174", "http://localhost:5175"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);

app.use("/api/v1/message",messageRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/appointment",appointmentRouter);

// Connect to MongoDB
dbConnection();

app.use(errorMiddleware);

export default app;
