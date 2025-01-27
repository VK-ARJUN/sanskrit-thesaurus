import Verb from "../schema/verb.schema.js";
import Lookup from "../schema/lookup.schema.js";
import Root from "../schema/root.schema.js";

export const addVerbEntry = async (req, res) => {
  try {
    const {
      verb,
      lookup,
      root,
      ganam,
      ganamIndex,
      transVerb,
      ItAgma,
      derivation,
      example,
      reverseWord,
      seeAlso,
    } = req.body;

    if (!verb || !root || !ganam || !ganamIndex || !transVerb || !ItAgma) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Handle reverseWord logic
    if (reverseWord === "Yes") {
      const reversedVerb = verb.split("-").reverse().join("-");

      // Create new entry for reversed verb
      const reversedEntry = new Verb({
        verb: reversedVerb, // You may need to adjust meaning if needed for the reversed word
        lookup,
        root,
        ganam,
        ganamIndex,
        transVerb,
        ItAgma,
        derivation,
        example,
        reverseWord,
        seeAlso,
      });

      // Save reversed verb entry into the database
      await reversedEntry.save();
    }

    // Create normal verb entry
    const newEntry = new Verb({
      verb,
      lookup,
      root,
      ganam,
      ganamIndex,
      transVerb,
      ItAgma,
      derivation,
      example,
      reverseWord,
      seeAlso,
    });

    // Save the normal verb entry into the database
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

export const addRootEntry = async (req, res) => {
  try {
    const { root, ganam, ganamIndex } = req.body;

    if (!root || !ganam || !ganamIndex) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newEntry = new Root({
      root,
      ganam,
      ganamIndex,
    });
    await newEntry.save();

    res.status(201).send("Entry added successfully");
  } catch (error) {
    console.error("Error adding entry:", error);
    res.status(500).send("An error occurred while adding the entry");
  }
};
