import { Vehicle } from "../models/vehicle.model.js";
import { Booking } from "../models/bookings.model.js";

export const addVehicle = async (req, res) => {
  try {
    const { name, capacityKg, tyres } = req.body;
    if (!name || !capacityKg || !tyres) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const vehicle = await Vehicle.create({ name, capacityKg, tyres });
    return res.status(201).json(vehicle);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getAvailableVehicle = async (req, res) => {
  try {
    const { capacityRequired, fromPincode, toPincode, startTime } = req.query;

    if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
      return res.status(400).json({ message: "Missing query parameters" });
    }

    const start = new Date(startTime);
    const estimatedRideDurationHours = calculateRideDuration(
      fromPincode,
      toPincode
    );
    const end = new Date(
      start.getTime() + estimatedRideDurationHours * 60 * 60 * 1000
    );

    // Find vehicles with enough capacity
    const vehicles = await Vehicle.find({
      capacityKg: { $gte: capacityRequired },
    });

    // Filter out vehicles with overlapping bookings
    const availableVehicles = [];
    for (const v of vehicles) {
      const overlapping = await Booking.findOne({
        vehicleId: v._id,
        $or: [{ startTime: { $lt: end }, endTime: { $gt: start } }],
      });

      if (!overlapping) {
        availableVehicles.push({
          ...v.toObject(),
          estimatedRideDurationHours,
        });
      }
    }

    res.status(200).json(availableVehicles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
