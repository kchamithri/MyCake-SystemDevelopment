import express from "express";
import { SignIn, signUp, AdminLogout } from "../controllers/adminController.js";

const router = express.Router();

router.post("/register", signUp);
router.post("/login", SignIn);
router.post("/adminLogout", AdminLogout);

export default router;
