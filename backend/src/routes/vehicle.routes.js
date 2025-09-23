import { Router } from "express";
import {
  addVehicle,
  getAvailableVehicle,
} from "../controllers/vehicle.controller.js";

const vehicleRouter = Router();

vehicleRouter.route("/").post(addVehicle);
vehicleRouter.route("/available").get(getAvailableVehicle);

export default vehicleRouter;
