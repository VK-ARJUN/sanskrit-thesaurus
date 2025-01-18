import express from "express";
import { LoginCheck } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/login", LoginCheck);

export default router;
