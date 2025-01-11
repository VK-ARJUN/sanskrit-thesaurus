import mongoose from "mongoose";

const verbSchema = new mongoose.Schema({
  verb: { type: String, required: true, unique: true },
  englishMeaning: { type: String, required: true },
  lookup: { type: [String], required: true },
  root: { type: String, required: true },
  ganam: { type: String, required: true },
  transVerb: { type: String, required: true },
  ItAgma: { type: String, required: true },
  derivation: { type: String },
});

const Verb = mongoose.model("Verb", verbSchema);

export default Verb;