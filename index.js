import express from "express";
import { spawn } from "node:child_process";

const randGen = (high, low) => Math.floor(Math.random() * (high - low) + low);

const app = express();
const PORT = 8080;

app.get("/", (req, res) => res.json({ a: 1, b: 2 }));

app.get("/fire", async (req, res) => {
  try {
    const ls = spawn(`ls`);
    ls.stdout.on("data", (data) => {
      res.json({ status: false, msg: "Success", data: String(data) });
    });
  } catch (error) {
    res.json({ status: false, msg: "Failure" });
  }
});

app.listen(PORT, () => {
  console.log(`Server Listening at http://localhost:${PORT}`);
});
