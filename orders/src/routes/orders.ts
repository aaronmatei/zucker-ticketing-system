import express from "express";
const router = express.Router();

import {
  getOrder,
  createOrder,
  getOrders,
  deleteOrder,
} from "./../controllers/ordersController";

import {
  auth,
  runValidation,
  validateAddOrder,
  currentUser,
} from "@arzuckertickets/common";

// TODO: ADD auth
router.post(
  "/create",
  validateAddOrder,
  runValidation,
  currentUser,
  createOrder
);
router.get("/:orderId", currentUser, getOrder);
router.get("/", currentUser, getOrders);
// router.put("/edit/:id", validateEditTicket, runValidation, currentUser, editTicket);
router.delete("/delete/:orderId", currentUser, deleteOrder);

module.exports = router;
