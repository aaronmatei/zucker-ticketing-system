import express from "express";
import { json } from "body-parser";
import "express-async-errors";
const logger = require("morgan");
const cors = require("cors");
import cookieSession from "cookie-session"

import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found";


const app = express();
const usersRoutes = require("./routes/users");

app.set("trust proxy", 1)
app.use(logger("combined"));
app.use(json());
app.use(cors());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}))

app.use("/api/v1/users", usersRoutes);

// not found errors
app.all("*", async (req, res) => {
    throw new NotFoundError();
});

// error handlers
app.use(errorHandler);


export { app }



