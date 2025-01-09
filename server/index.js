import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Verb from "./schema/entryform.js";

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
app.use(cors());

// POST route to add entries
app.post("/entry", async (req, res) => {
  try {
    const { verb, root, englishMeaning, lookup } = req.body;

    const newEntry = new Verb({ verb, root, englishMeaning, lookup });
    await newEntry.save();

    res.status(201).send("Entry added successfully");
  } catch (error) {
    console.error("Error adding entry:", error);
    res.status(500).send("An error occurred while adding the entry");
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
