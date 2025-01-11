import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import entryRouter from "./routes/entry.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const app = express();
app.use(express.json());

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

app.use("/server/entry", entryRouter);
