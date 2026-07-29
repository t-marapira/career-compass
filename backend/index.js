import express from "express";

const PORT = process.env.PORT || 3000;

const server = express();

server.get("/", (req, res) => {
  res.json({ status: "OK" });
});

server.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
