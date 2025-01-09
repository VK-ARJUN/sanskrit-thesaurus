import mongoose from "mongoose";

const verbSchema = new mongoose.Schema({
  verb: { type: String, required: true, unique: true },
  root: { type: String, required: true },
  englishMeaning: { type: String, required: true },
  lookup: { type: String, required: true },
});

const Verb = mongoose.model("Verb", verbSchema);

export default Verb;
