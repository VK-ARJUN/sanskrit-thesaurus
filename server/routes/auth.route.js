import express from "express";
import { LoginCheck } from "../controllers/auth.controller.js";
import { LogoutUser } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/login", LoginCheck);
router.post("/logout", LogoutUser);

export default router;
