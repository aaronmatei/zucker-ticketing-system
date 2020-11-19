import express from "express";
const router = express.Router();

import {
    getOrder,
    createOrder,
    getOrders,
    deleteOrder,
} from "./../controllers/ordersController";

import { auth, runValidation, validateAddOrder } from "@arzuckertickets/common";




// TODO: ADD auth
router.post("/create", validateAddOrder, runValidation, auth, createOrder);
router.get("/:orderId", auth, getOrder);
router.get("/", auth, getOrders);
// router.put("/edit/:id", validateEditTicket, runValidation, auth, editTicket);
router.delete("/delete/:orderId", auth, deleteOrder);

module.exports = router;


