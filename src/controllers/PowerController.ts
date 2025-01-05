import { NextFunction, Request, Response } from "express";
import PowerService from "../services/PowerService";

class PowerController {
  private service: PowerService;

  constructor() {
    this.service = new PowerService();
    this.findPredictedByDateAndSensor = this.findPredictedByDateAndSensor.bind(this);
    this.findMeasuredByDateAndSensor = this.findMeasuredByDateAndSensor.bind(this);
  }

  async findPredictedByDateAndSensor(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.service.findPredictedByDateAndSensor(
        req.query.date as string,
        req.query.sensor as string
      );
      res.success("Success", response);
    } catch (error) {
      next(error);
    }
  }

  async findMeasuredByDateAndSensor(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.service.findMeasuredByDateAndSensor(
        req.query.date as string,
        req.query.sensor as string
      );
      res.success("Success", response);
    } catch (error) {
      next(error);
    }
  }
}

export default PowerController;