import { NextFunction, Request, Response } from "express";
import { SENSOR_MESSAGE } from "../utils/message";
import SensorService from "../services/SensorService";

class SensorController {
  private service: SensorService;
  
  constructor() {
    this.service = new SensorService();
    this.create = this.create.bind(this);
    this.bulkCreate = this.bulkCreate.bind(this);
  }
  
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.service.create(req.body);
      res.created(SENSOR_MESSAGE.CREATED, response);
    } catch (error) {
      next(error);
    }
  }

  async bulkCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.service.bulkCreate(req.body);
      res.created(SENSOR_MESSAGE.BULK_CREATED, response);
    } catch (error) {
      next(error);
    }
  }
}

export default SensorController;
