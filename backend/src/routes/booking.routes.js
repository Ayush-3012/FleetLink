import { Router } from "express";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
} from "../controllers/booking.controller.js";
const bookingRouter = Router();

bookingRouter.route("/").post(createBooking);
bookingRouter.route("/").get(getAllBookings);
bookingRouter.route("/:id").delete(deleteBooking);

export default bookingRouter;
