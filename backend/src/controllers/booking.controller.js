import { Booking } from "../models/bookings.model.js";
import { Vehicle } from "../models/vehicle.model.js";
import { isVehicleAvailable } from "../utils/isVehicleAvailable.js";
import { getRideSpan } from "../utils/rideTime.js";

export const createBooking = async (req, res) => {
  try {
    const { vehicleId, fromPincode, toPincode, startTime, customerId } =
      req.body;

    if (!vehicleId || !fromPincode || !toPincode || !startTime || !customerId)
      return res.status(400).json({ message: "All fields are required" });

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    const { start, end, estimatedRideDurationHours } = getRideSpan(
      fromPincode,
      toPincode,
      startTime
    );

    const available = await isVehicleAvailable(vehicleId, start, end);
    if (!available) {
      return res
        .status(409)
        .json({ message: "Vehicle already booked in this time window" });
    }

    const booking = await Booking.create({
      vehicleId,
      fromPincode,
      toPincode,
      startTime: start,
      endTime: end,
      customerId,
    });

    return res.status(201).json({ booking, estimatedRideDurationHours });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("vehicleId");
    return res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    await Booking.findByIdAndDelete(id);
    return res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
