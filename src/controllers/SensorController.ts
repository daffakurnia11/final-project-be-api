import { NextFunction, Request, Response } from "express";
import { SENSOR_MESSAGE } from "../utils/message";
import SensorService from "../services/SensorService";
import { subHours, subMinutes } from "date-fns";

class SensorController {
  private service: SensorService;

  constructor() {
    this.service = new SensorService();
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.bulkCreate = this.bulkCreate.bind(this);
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const minutes = req.query.minutes;

      let response;
      if (minutes) {
        response = await this.service.findSensorsSince(subMinutes(new Date(), Number(minutes)));
      } else {
        response = await this.service.findLastSensor();
      }
      res.success(SENSOR_MESSAGE.SUCCESS, response);
    } catch (error) {
      next(error);
    }
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
      const response = await this.service.bulkCreate(req, req.body);
      res.created(SENSOR_MESSAGE.BULK_CREATED, response);
    } catch (error) {
      next(error);
    }
  }
}

export default SensorController;
