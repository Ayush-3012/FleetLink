import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

import vehicleRouter from "./routes/vehicle.routes.js";
import bookingRouter from "./routes/booking.routes.js";

app.use("/api/v1/vehicles", vehicleRouter);
app.use("/api/v1/bookings", bookingRouter);

export default app;
