import express from "express";
import type { Application } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./Route/userRoute.js";

dotenv.config();

const app: Application = express();

app.use(bodyParser.json());

const PORT: number = Number(process.env.PORT) || 3000;
const MONGOURL: string = process.env.MONGO_URL as string;

mongoose.connect(MONGOURL).then(() => {
    console.log("Database Connected Successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection error:", error);
  });
app.use("/api/user", route);

