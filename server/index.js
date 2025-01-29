import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import entryRouter from "./routes/entry.route.js";
import authRouter from "./routes/auth.route.js";
import createAdminUser from "./adminUser.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");
    await createAdminUser();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const app = express();
app.use(express.json());
app.use(cors());

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

app.use("/server/entry", entryRouter);
app.use("/server/auth", authRouter);
