import { NextFunction, Request, Response } from "express";
import StatusService from "../services/StatusService";

class StatusController {
  private service: StatusService;

  constructor() {
    this.service = new StatusService();
    this.checkPredictionStatus = this.checkPredictionStatus.bind(this);
    this.checkCalculationStatus = this.checkCalculationStatus.bind(this);
  }

  async checkPredictionStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.service.checkPredictionStatus(req);
      res.success("Success", response);
    } catch (error) {
      next(error);
    }
  }

  async checkCalculationStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.service.checkCalculationStatus(req);
      res.success("Success", response);
    } catch (error) {
      next(error);
    }
  }
}

export default StatusController;
