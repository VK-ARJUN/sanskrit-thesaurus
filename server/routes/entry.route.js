import express from "express";
import { addVerbEntry } from "../contollers/entry.controller.js";
import { addLookupEntry } from "../contollers/entry.controller.js";

const router = express.Router();

router.post("/addverb", addVerbEntry);
router.post("/addlookup", addLookupEntry);

export default router;
