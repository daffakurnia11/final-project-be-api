import express, { Router } from "express";
import PowerController from "../controllers/PowerController";

class PowerRoute {
  public router: Router;
  private controller: PowerController;

  constructor() {
    this.router = express.Router();
    this.controller = new PowerController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/predicted", this.controller.findPredictedByDateAndSensor);
    this.router.get("/measured", this.controller.findMeasuredByDateAndSensor);
  }
}

export default PowerRoute;