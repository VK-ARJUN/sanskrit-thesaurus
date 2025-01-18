
import Verb from "../schema/verb.schema.js";
export const viewEntry = async (req, res) => {
    try {
        const entries = await Verb.find(); 
       
        res.status(200).json(entries);        // Sending fetched entries as JSON
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred while fetching data" });
    }
};
