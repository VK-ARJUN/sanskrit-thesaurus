import Verb from "../schema/verb.schema.js";
import Lookup from "../schema/lookup.schema.js";

export const addVerbEntry = async (req, res) => {
  try {
    const {
      verb,
      englishMeaning,
      lookup,
      root,
      ganam,
      transVerb,
      ItAgma,
      derivation,
      example
    } = req.body;

    if (
      !verb ||
      !root ||
      !lookup.length ||
      !ganam ||
      !transVerb ||
      !ItAgma
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newEntry = new Verb({
      verb,
      englishMeaning,
      lookup,
      root,
      ganam,
      transVerb,
      ItAgma,
      derivation,
      example
    });
    await newEntry.save();

    res.status(201).send("Entry added successfully");
  } catch (error) {
    console.error("Error adding entry:", error);
    res.status(500).send("An error occurred while adding the entry");
  }
};

export const addLookupEntry = async (req, res) => {
  try {
    const { lookup, englishMeaning, reference } = req.body;

    if (!lookup || !englishMeaning || !reference) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newEntry = new Lookup({
      lookup,
      englishMeaning,
      reference,
    });
    await newEntry.save();

    res.status(201).send("Entry added successfully");
  } catch (error) {
    console.error("Error adding entry:", error);
    res.status(500).send("An error occurred while adding the entry");
  }
};
