import express from "express";
const router = express.Router();
import { auth } from "./../middlewares/auth";

import { currentUser, signUpUser, signInUser, signOutUser } from "../controllers/userController";
import { runValidation } from "./../middlewares/validation/index";
import { validateUserSignUp, validateUserSignIn } from "./../middlewares/validation/validateUser"


router.get("/currentuser", auth, currentUser);
router.post("/signup", validateUserSignUp, runValidation, signUpUser);
router.post("/signin", validateUserSignIn, runValidation, signInUser);
router.post("/signout", signOutUser);


module.exports = router