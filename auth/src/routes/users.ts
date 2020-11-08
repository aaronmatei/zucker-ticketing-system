import express from "express";
const router = express.Router();

import { getCurrentUser, signUpUser, signInUser, signOutUser } from "../controllers/userController";
import { runValidation } from "./../middlewares/validation/index";
import { validateUserSignUp, validateUserSignIn } from "./../middlewares/validation/validateUser"
import { currentUser } from "./../middlewares/currentUser"


router.get("/currentuser", currentUser, getCurrentUser);
router.post("/signup", validateUserSignUp, runValidation, signUpUser);
router.post("/signin", validateUserSignIn, runValidation, signInUser);
router.post("/signout", signOutUser);


module.exports = router