import { Router } from "express";
import {
  addVehicle,
  getAvailableVehicle,
  getAllVehicles
} from "../controllers/vehicle.controller.js";

const vehicleRouter = Router();

vehicleRouter.route("/").get(getAllVehicles)
vehicleRouter.route("/").post(addVehicle);
vehicleRouter.route("/available").get(getAvailableVehicle);

export default vehicleRouter;
