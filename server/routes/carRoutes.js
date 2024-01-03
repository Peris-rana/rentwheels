import express from "express";
import { addCarController } from "../controllers/carController.js";
const router = express.Router();
router.post("/add-car", addCarController);
export default router;
