import express, { Router } from "express";
import { addVerbEntry } from "../contollers/entry.controller.js";
import { addLookupEntry } from "../contollers/entry.controller.js";
import { viewEntry } from "../contollers/view.controller.js"
import { updateEntry } from "../contollers/update.controller.js";
import { ViewOneEntry } from "../contollers/view.one.entry.js";
import { ViewLookup } from "../contollers/view.lookup.controller.js";


const router = express.Router();

router.post("/addverb", addVerbEntry);
router.post("/addlookup", addLookupEntry);
router.get("/view", viewEntry);
router.get("/view/lookup",ViewLookup)
router.get("/:id",ViewOneEntry)
router.put("/update/:id",updateEntry)



export default router;
