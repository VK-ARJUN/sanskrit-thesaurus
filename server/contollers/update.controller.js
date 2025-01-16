import Verb from "../schema/verb.schema.js";
import Lookup from "../schema/lookup.schema.js";

// Update an existing entry by id or create a new entry in Lookup if not found in Verb
export const updateEntry = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    // First, attempt to update the entry in the Verb collection
    let updatedEntry = await Verb.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedEntry) {
      // If not found in Verb, try to update the entry in the Lookup collection
      updatedEntry = await Lookup.findByIdAndUpdate(id, updatedData, { new: true });

      if (!updatedEntry) {
        // If no entry is found in either collection, return a 404 error
        return res.status(404).json({ error: 'Entry not found in both Verb and Lookup collections' });
      }
    }

    res.json(updatedEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update or create entry' });
  }
};
