import cors from "cors";
import express from "express";
import { exec } from "node:child_process";

const app = express();
const PORT = 8080;

app.use(cors());
app.get("/", (req, res) => res.json({ a: 1, b: 2 }));

app.get("/power-on", async (req, res) => {
  // Run 'ls' command
  exec("cd ..", (error, lsOutput, lsError) => {
    if (error) {
      console.error(`Error executing 'ls': ${error}`);
      res.status(500).json({ msg: "Internal Server Error" });
      return;
    }

    // Run 'echo Hello' command
    exec("sudo python poweron.py", (error, echoOutput, echoError) => {
      if (error) {
        console.error(`Error executing 'echo Hello': ${error}`);
        res.status(500).json({ msg: "Internal Server Error" });

        return;
      }

      // Send the combined output as the response
      res.json({
        msg: `Listing files:\n${lsOutput}\nOutput of 'echo Hello': ${echoOutput}`,
      });
    });
  });
});

app.get("/power-off", async (req, res) => {
  // Run 'ls' command
  exec("cd ..", (error, lsOutput, lsError) => {
    if (error) {
      console.error(`Error executing 'ls': ${error}`);

      res.status(500).json({ msg: "Internal Server Error" });

      return;
    }

    // Run 'echo Hello' command
    exec("sudo python powerff.py", (error, echoOutput, echoError) => {
      if (error) {
        console.error(`Error executing 'echo Hello': ${error}`);
        res.status(500).json({ msg: "Internal Server Error" });

        return;
      }

      // Send the combined output as the response
      res.json({
        msg: `Listing files:\n${lsOutput}\nOutput of 'echo Hello': ${echoOutput}`,
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server Listening at http://localhost:${PORT}`);
});
