import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "../src/routes/user.routes.js";
// now here you app.use because you are making kindda middleware for it
// in app.get what you were doing was you were  creating router and controller in a single file
app.use("api/v1/user", userRouter);
//http://localhost:1234/api/v1/user/register

