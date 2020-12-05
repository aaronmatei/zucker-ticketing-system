import express from "express";
const router = express.Router();

import {
    getCurrentUser,
    signUpUser,
    signInUser,
    signOutUser,
} from "../controllers/userController";
import { currentUser, runValidation, validateUserSignUp, validateUserSignIn } from "@arzuckertickets/common";




router.get("/currentuser", currentUser, getCurrentUser);
router.post("/signup", validateUserSignUp, runValidation, signUpUser);
router.post("/signin", validateUserSignIn, runValidation, signInUser);
router.post("/signout", signOutUser);

module.exports = router;
