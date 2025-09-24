import { Vehicle } from "../models/vehicle.model.js";
import { isVehicleAvailable } from "../utils/isVehicleAvailable.js";
import { getRideSpan } from "../utils/rideTime.js";

export const addVehicle = async (req, res) => {
  try {
    const { name, capacityKg, tyres } = req.body;
    if (!name || !capacityKg || !tyres)
      return res.status(400).json({ message: "All fields are required" });

    const vehicle = await Vehicle.create({ name, capacityKg, tyres });
    return res.status(201).json(vehicle);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getAvailableVehicle = async (req, res) => {
  try {
    const { capacityRequired, fromPincode, toPincode, startTime } =
      await req.query;

    if (!capacityRequired || !fromPincode || !toPincode || !startTime)
      return res.status(400).json({ message: "Missing query parameters" });

    const { start, end, estimatedRideDurationHours } = getRideSpan(
      fromPincode,
      toPincode,
      startTime
    );

    const vehicles = await Vehicle.find({
      capacityKg: { $gte: capacityRequired },
    });

    const availableVehicles = [];
    for (const v of vehicles) {
      const available = await isVehicleAvailable(v._id, start, end);

      if (available) {
        availableVehicles.push({
          ...v.toObject(),
          estimatedRideDurationHours,
        });
      }
    }

    return res.status(200).json(availableVehicles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
