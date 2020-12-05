import express from "express";
import { createPayment, getPayment } from "./../controllers/paymentsController";
import {
  currentUser,
  runValidation,
  validateAddPayment,
  validateEditPayment,
} from "@arzuckertickets/common";

const router = express.Router();

// TODO: ADD auth
router.post(
  "/create",
  currentUser,
  validateAddPayment,
  runValidation,
  createPayment
);
router.get("/:id", currentUser, getPayment);

module.exports = router;
