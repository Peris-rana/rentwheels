import express from "express";
import multer from "multer";
import {
  addCarController,
  deleteCarController,
  getCarController,
  updateCarController,
} from "../controllers/carController.js";
const uploadMiddleware = multer({ dest: "./uploads/carImages" });
const router = express.Router();
router.post("/add-car", uploadMiddleware.single("file"), addCarController);
router.get("/get-car", getCarController);
router.put("/update-car", uploadMiddleware.single("file"), updateCarController);
router.delete("/delete-car", deleteCarController);
export default router;
