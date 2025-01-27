import mongoose from "mongoose";

const rootSchema = new mongoose.Schema({
  root: { type: String, required: true, unique: true },
  ganam: { type: String, required: true },
  ganamIndex: { type: Number, required: true },
});

const Root = mongoose.model("Root", rootSchema);

export default Root;
