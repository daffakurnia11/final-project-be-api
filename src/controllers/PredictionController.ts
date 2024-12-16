import { NextFunction, Request, Response } from "express";
import PredictionService from "../services/PredictionService";

class PredictionController {
  private service: PredictionService;

  constructor() {
    this.service = new PredictionService();
    this.getAllPrediction = this.getAllPrediction.bind(this);
    this.getPredictionById = this.getPredictionById.bind(this);
  }

  async getAllPrediction(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.service.getPrediction(
        (req.query.sensor as string) || null
      );
      res.success("Success", response);
    } catch (error) {
      next(error);
    }
  }

  async getPredictionById(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.service.getPredictionById(req.params.id);
      res.success("Success", response);
    } catch (error) {
      next(error);
    }
  }
}

export default PredictionController;
