import { NextFunction, Request, Response } from "express";
import { SENSOR_MESSAGE } from "../utils/message";
import SensorService from "../services/SensorService";

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
      const value: number | null = Number(req.query.value) as number | null;
      const filter: "hour" | "minute" | "second" | null = req.query.filter as
        | "hour"
        | "minute"
        | "second"
        | null;

      let response;
      if (value && filter) {
        response = await this.service.findSensorsSince(value, filter);
      } else {
        response = await this.service.findLastSensor();
      }
      const totalData = response?.length;

      res.success(SENSOR_MESSAGE.SUCCESS, response, totalData);
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
