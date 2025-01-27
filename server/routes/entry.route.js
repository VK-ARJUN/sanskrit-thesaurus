import express, { Router } from "express";
import { addVerbEntry } from "../controllers/entry.controller.js";
import { addLookupEntry } from "../controllers/entry.controller.js";
import { addRootEntry } from "../controllers/entry.controller.js";
import { viewEntry } from "../controllers/view.controller.js";
import { updateEntry } from "../controllers/update.controller.js";
import { ViewOneEntry } from "../controllers/view.one.entry.js";
import { ViewLookup } from "../controllers/view.lookup.controller.js";
import { ViewRoot } from "../controllers/view.root.controller.js";

const router = express.Router();

router.post("/addverb", addVerbEntry);
router.post("/addlookup", addLookupEntry);
router.post("/addroot", addRootEntry);
router.get("/view", viewEntry);
router.get("/view/lookup", ViewLookup);
router.get("/view/root", ViewRoot);
router.get("/:id", ViewOneEntry);
router.put("/update/:id", updateEntry);

export default router;
