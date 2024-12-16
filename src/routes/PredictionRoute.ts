import express, { Router } from "express";
import PredictionController from "../controllers/PredictionController";

class PredictionRoute {
  public router: Router;
  private controller: PredictionController

  constructor() {
    this.router = express.Router();
    this.controller = new PredictionController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.controller.getAllPrediction);
    this.router.get("/:id", this.controller.getPredictionById);
  }
}

export default PredictionRoute