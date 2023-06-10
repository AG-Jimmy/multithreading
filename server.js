const express = require("express");
const { Worker } = require("worker_threads");
const os = require("os");


const app = express();
const port = process.env.PORT || 5050;
const cpuCount = os.cpus().length;

app.get("/non_blocking", (req, res) => {
  res.status(200).send("All Good");
});

app.get("/blocking", async (req, res) => {
  const worker = new Worker("./worker.js");
  worker.on("message", (data) => {
    res.status(200).send(`result is ${data}`);
  });
  worker.on("error", (error) => {
    res.status(404).send(`result Error is ${error}`);
  });
});

app.listen(port, () => {
  console.log(`
            ******************************
            app is listing in port: ${port}
            my cpuCount is: ${cpuCount} 
            worker pid: ${process.pid} 
            ******************************
            `);
});
