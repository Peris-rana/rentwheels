import express from "express";
import {
  addCarController,
  getCarController,
  updateCarController,
} from "../controllers/carController.js";
const router = express.Router();
router.post("/add-car", addCarController);
router.get("/get-car", getCarController);
router.put("/update-car", updateCarController);
export default router;
