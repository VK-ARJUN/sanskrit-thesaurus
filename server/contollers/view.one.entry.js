import Verb from "../schema/verb.schema.js";
import Lookup from "../schema/lookup.schema.js";

export const ViewOneEntry = async (req, res) => {
  try {
    const { id } = req.params;
    let entry = await Verb.findById(id);  // Declare with let

    if (!entry) {
      entry = await Lookup.findById(id);
    }

    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    res.json(entry);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "An error occurred while fetching the entry" });
  }
};
