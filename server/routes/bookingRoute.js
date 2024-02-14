import express from "express";
import {
  addBookingController,
  getBookingController,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/add-booking", addBookingController);
router.get("/get-booking", getBookingController);
export default router;
