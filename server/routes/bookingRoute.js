import express from "express";
import {
  addBookingController,
  deleteBookingController,
  getBookingController,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/add-booking", addBookingController);
router.get("/get-booking", getBookingController);
router.delete("/delete-booking/:bookingId", deleteBookingController);
export default router;
