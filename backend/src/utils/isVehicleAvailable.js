import { Booking } from "../models/bookings.model.js";

export const isVehicleAvailable = async (vehicleId, start, end) => {
  const overlapping = await Booking.findOne({
    vehicleId,
    $or: [{ startTime: { $lt: end }, endTime: { $gt: start } }],
  });

  return !overlapping;
};
