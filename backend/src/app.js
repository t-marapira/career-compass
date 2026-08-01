import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import moduleRouter from "./routes/module.route.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRoute);
app.use("/api/module",moduleRouter)

export default app;
