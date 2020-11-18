import express from "express";
const router = express.Router();

import {
    getTicket,
    createTicket,
    getTickets,
    editTicket,
    deleteTicket,
} from "./../controllers/ticketsController";
import { auth, runValidation, validateAddTicket, validateEditTicket } from "@arzuckertickets/common";




// TODO: ADD auth
router.post("/create", validateAddTicket, runValidation, auth, createTicket);
router.get("/:id", getTicket);
router.get("/", getTickets);
router.put("/edit/:id", validateEditTicket, runValidation, auth, editTicket);
router.delete("/delete/:id", auth, deleteTicket);

module.exports = router;
