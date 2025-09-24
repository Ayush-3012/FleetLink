import { Router } from "express";
import { createBooking } from "../controllers/booking.controller.js";
const bookingRouter = Router();

bookingRouter.route("/").post(createBooking);

export default bookingRouter;