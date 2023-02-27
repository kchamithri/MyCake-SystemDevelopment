import express from "express";
import { Report } from "../controllers/reportController.js";

const router = express.Router();

router.post("/", Report);

export default router;
