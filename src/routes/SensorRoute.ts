import express, { Router } from "express";
import SensorController from "../controllers/SensorController";
import SensorValidator from "../validators/SensorValidator";
import { handleValidation } from "../middlewares/validate";

class SensorRoute {
  public router: Router;
  private controller: SensorController;
  private validator: SensorValidator;

  constructor() {
    this.router = express.Router();
    this.controller = new SensorController();
    this.validator = new SensorValidator();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/single",
      this.validator.create,
      handleValidation,
      this.controller.create
    );
    this.router.post(
      "/",
      this.validator.bulkCreate,
      handleValidation,
      this.controller.bulkCreate
    );
  }
}

export default SensorRoute;
