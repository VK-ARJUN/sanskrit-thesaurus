import Verb from "../schema/verb.schema.js";
import Lookup from "../schema/lookup.schema.js";
import Root from "../schema/root.schema.js";

export const deleteVerbEntry = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the entry by ID
    const entry = await Verb.findByIdAndDelete(id);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json({ message: "Entry deleted successfully." });
  } catch (error) {
    console.error("Delete failed", error);
    res.status(500).json({ message: "Failed to delete entry" });
  }
};

export const deleteLookupEntry = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the entry by ID
    const entry = await Lookup.findByIdAndDelete(id);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json({ message: "Entry deleted successfully." });
  } catch (error) {
    console.error("Delete failed", error);
    res.status(500).json({ message: "Failed to delete entry" });
  }
};

export const deleteRootEntry = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the entry by ID
    const entry = await Root.findByIdAndDelete(id);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json({ message: "Entry deleted successfully." });
  } catch (error) {
    console.error("Delete failed", error);
    res.status(500).json({ message: "Failed to delete entry" });
  }
};
