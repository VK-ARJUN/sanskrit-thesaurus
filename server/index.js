import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import entryRouter from "./routes/entry.route.js";

dotenv.config();

const MONGO = "mongodb+srv://nivedkp001:sanskrit@sanskritthesaurus.awilq.mongodb.net/SanskritThesaurus?retryWrites=true&w=majority&appName=SanskritThesaurus"

mongoose
  .connect(MONGO, {
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
app.use(cors());

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

app.use("/server/entry", entryRouter);
