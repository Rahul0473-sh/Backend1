//require("dotenv").config({ path: "./env" });
import express from "express";
import ConnectDb from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

ConnectDb()
  .then(() => {
    app.on("error", (error) => {
      console.log("Db not connected because of this :", error);
  
    });
    app.listen(process.env.PORT  || 1234, () => {
      console.log(`App is running on this server ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`DB did'nt connect because of this error : ${error}`);
  
  });

//const app = express();
/*
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`);
    app.on("error", (error) => {
      console.log(`App is not working due to this reason ${error}`);
    
    });
    app.listen(process.env.PORT, () => {
      console.log(`App is working on this ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Error :", error);
  }
})();
*/
