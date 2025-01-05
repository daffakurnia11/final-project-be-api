import express, { Router } from "express";
import StatusController from "../controllers/StatusController";

class StatusRoute {
  public router: Router;
  private controller: StatusController;

  constructor() {
    this.router = express.Router();
    this.controller = new StatusController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/prediction", this.controller.checkPredictionStatus);
    this.router.get("/calculation", this.controller.checkCalculationStatus);
  }
}

export default StatusRoute;
