import Root from "../schema/root.schema.js";

export const ViewRoot = async (req, res) => {
  try {
    const entries = await Root.find();
    res.status(200).json({ entries }); // Sending entries within an object
  } catch (error) {
    console.error("Failed to fetch lroot data:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching root entries" });
  }
};
