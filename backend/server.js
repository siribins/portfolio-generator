const express = require("express");
const path = require("path");
const fs = require("fs");
const http = require("http");
const mongoose = require("mongoose");
const userRoutes = require("./routes/useRoutes");
const SignIn = require("./models/SignIn");

const app = express();
const PORT = 5000;

//node.js
app.use((req, res, next) => {
  if (req.headers["content-type"] === "application/json") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        req.body = JSON.parse(body);
        next();
      } catch (err) {
        console.error("Invalid JSON:", err);
        res.status(400).send({ error: "Invalid JSON" });
      }
    });
  } else {
    next();
  }
});

//node.js
app.get("/uploads/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("File not found:", err);
      return res.status(404).send("File not found");
    }
    res.send(data);
  });
});

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/portfolio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Routes
app.use("/api/users", userRoutes);

// Authentication Routes
app.post("/api/auth/signup", async (req, res) => {
  console.log("Received request on /api/auth/signup", req.body);
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).send({ error: "Email and Password are required" });
    }

    const existingUser = await SignIn.findOne({ Email });
    if (existingUser) {
      return res.status(400).send({ error: "User already exists" });
    }

    const newUser = new SignIn({ Email, Password });
    await newUser.save();
    res.status(201).send({ message: "User signed up successfully!" });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// Custom 404 Error
app.use((req, res) => {
  res.status(404).send("Endpoint not found");
});

// Start the server (Node.js explicit)
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
