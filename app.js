require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const connectDB = require("./db/connect");

const authRouter = require("./routes/auth");
const jobRouter = require("./routes/jobs");

const authenticateUser = require("./middleware/authentication");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.set("trust proxy", 1);

// extra packages

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobRouter);

// middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const mongoURI = process.env.MONGO_URI;

const start = async () => {
  try {
    await connectDB(mongoURI);
    console.log("MongoDB connected successfully");
    app.listen(port, () => console.log(`Server url http://localhost:${port}`));
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

start();
