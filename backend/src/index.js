import dotenv from 'dotenv'

dotenv.config()

import express from "express";
import prisma from "./prisma.js";
import app from "./app.js";

const PORT = process.env.PORT || 3001;

const server = express();

server.use(app)

server.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
