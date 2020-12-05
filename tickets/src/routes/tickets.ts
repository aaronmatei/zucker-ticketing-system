import express from "express";
const router = express.Router();

import {
  getTicket,
  createTicket,
  getTickets,
  editTicket,
  deleteTicket,
} from "./../controllers/ticketsController";
import {
  auth,
  currentUser,
  runValidation,
  validateAddTicket,
  validateEditTicket,
} from "@arzuckertickets/common";

// TODO: ADD auth
router.post(
  "/create",
  validateAddTicket,
  runValidation,
  currentUser,
  createTicket
);
router.get("/:id", currentUser, getTicket);
router.get("/", currentUser, getTickets);
router.put(
  "/edit/:id",
  validateEditTicket,
  runValidation,
  currentUser,
  editTicket
);
router.delete("/delete/:id", currentUser, deleteTicket);

module.exports = router;
