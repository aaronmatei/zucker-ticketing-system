import express from "express";
import { json } from "body-parser";
import proxy from 'http-proxy-middleware';
import "express-async-errors";
require("dotenv").config();
const logger = require("morgan");
const cors = require("cors");
import cookieSession from "cookie-session";

import { errorHandler, NotFoundError, currentUser } from "@arzuckertickets/common";


const app = express();
const ticketsRoutes = require("./routes/tickets");

app.set("trust proxy", 1);
app.use(logger("combined"));
app.use(json());
app.use(cors());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== "test",
    })
);

// app.use(currentUser)

app.use("/api/v1/tickets", ticketsRoutes);

// not found errors
app.all("*", async (req, res) => {
    throw new NotFoundError();
});

// error handlers
app.use(errorHandler);

export { app };
