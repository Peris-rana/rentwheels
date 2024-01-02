import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
const port = 5900;
const app = express();

dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("car-rental server");
});

app.listen(port, () => {
  console.log("Server is running ...");
});
