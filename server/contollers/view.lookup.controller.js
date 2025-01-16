import Lookup from "../schema/lookup.schema.js";

export const ViewLookup = async (req, res) => {
  try {
    const entries = await Lookup.find();
    console.log(entries);
    res.status(200).json({ entries }); // Sending entries within an object
  } catch (error) {
    console.error("Failed to fetch lookup data:", error);
    res.status(500).json({ message: "An error occurred while fetching lookup entries" });
  }
};
