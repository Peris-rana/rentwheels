import express from "express";
import {
  addCarController,
  getCarController,
} from "../controllers/carController.js";
const router = express.Router();
router.post("/add-car", addCarController);
router.get("/get-car", getCarController);
export default router;
