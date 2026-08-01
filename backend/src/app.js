import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import skillRouter from "./routes/skill.route.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRouter);
app.use("/api/skills",skillRouter)

export default app;
