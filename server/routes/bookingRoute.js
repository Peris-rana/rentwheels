import express from "express";
import {
  addBookingController,
  deleteBookingController,
  getBookingController,
  acceptBookingController,
  notificationController,
} from "../controllers/bookingController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add-booking", addBookingController);
router.post("/accept-booking", acceptBookingController);
router.get("/get-booking", getBookingController);
router.delete("/delete-booking", deleteBookingController);
router.get("/get-notification", requireSignIn, notificationController);
export default router;
