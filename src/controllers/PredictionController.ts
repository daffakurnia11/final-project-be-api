import { NextFunction, Request, Response } from "express";
import PredictionService from "../services/PredictionService";
import { hitPredictionEndpoint } from "../utils/scheduler";

class PredictionController {
  private service: PredictionService;

  constructor() {
    this.service = new PredictionService();
    this.getAllPrediction = this.getAllPrediction.bind(this);
    this.getPredictionById = this.getPredictionById.bind(this);
    this.predictByDate = this.predictByDate.bind(this);
    this.checkPrediction = this.checkPrediction.bind(this);
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

  async predictByDate(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.service.predictByDate(req, req.body);
      if (response.status == 400) {
        res.error(response.response.data.error);
      }
      res.success("Prediction success", response);
    } catch (error) {
      next(error);
    }
  }

  async checkPrediction(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.service.checkPrediction(req);
      res.success("Success", response);
    } catch (error) {
      next(error);
    }
  }
}

export default PredictionController;
