import express, { Router } from "express";
import EnergyController from "../controllers/EnergyController";
import EnergyValidator from "../validators/EnergyValidator";
import { handleValidation } from "../middlewares/validate";

class EnergyRoute {
  public router: Router;
  private controller: EnergyController;
  private validator: EnergyValidator;

  constructor() {
    this.router = express.Router();
    this.controller = new EnergyController();
    this.validator = new EnergyValidator();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.controller.findAllEnergy);
    this.router.get("/:id", this.controller.findEnergyById);
    this.router.post(
      "/predict",
      this.validator.create,
      handleValidation,
      this.controller.predictByDate
    );
    this.router.post(
      "/calculate",
      this.validator.create,
      handleValidation,
      this.controller.calculateByDate
    );
  }
}

export default EnergyRoute;
