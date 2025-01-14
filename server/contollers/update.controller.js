import Verb from "../schema/verb.schema.js";

// Update an existing entry by id
export const updateEntry = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedEntry = await Verb.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedEntry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    res.json(updatedEntry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update entry' });
  }
};
