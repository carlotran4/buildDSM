const bodyParser = require("body-parser");

const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();
const path = require("path");

// Have Node serve the files for our built React app
app.use(express.static(path.resolve("./client/dist")));

var jsonParser = bodyParser.json();

// Handle GET requests to /api route
app.post("/api/optimalCowData", jsonParser, (req, res) => {
  console.log(req.body);
  const spawn = require("child_process").spawn;
  const pythonProcess = spawn("python", ["./recommendations.py", JSON.stringify(req.body)]);
  pythonProcess.stdout.on("data", (data) => {
    res.json(JSON.parse(data.toString()));
  });
  pythonProcess.stderr.on("data", (data) => {
    console.log("JAVASCRIPT: ", data.toString());
  });
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve("./client/dist", "index.html"));
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
