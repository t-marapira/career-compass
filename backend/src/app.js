import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRouter);

export default app;
