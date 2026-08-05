import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import moduleRouter from "./routes/module.route.js";
import skillRouter from "./routes/skill.route.js";
import userRouter from "./routes/user.route.js";
import dataRouter from "./routes/data.route.js";
import careerRouter from "./routes/career.route.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRouter);
app.use("/api/module", moduleRouter);
app.use("/api/skill", skillRouter);
app.use("/api/user", userRouter);
app.use("/api/data", dataRouter);
app.use("/api/career", careerRouter);

export default app;
