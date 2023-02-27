import express from "express";
import {
  CelebrationCakes,
  Checkout,
  PartyPacks,
  SignIn,
  signUp,
  UserLogout,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/register", signUp);
router.post("/login", SignIn);
router.post("/userLogout", UserLogout);
router.post("/celebrationCakes", CelebrationCakes);
router.post("/partyPacks", PartyPacks);
router.post("/checkout", Checkout);

export default router;
