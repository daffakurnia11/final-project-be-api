import { NextFunction, Request, Response } from "express";
import EnergyService from "../services/EnergyService";

class EnergyController {
  private service: EnergyService;

  constructor() {
    this.service = new EnergyService();
    this.findAllEnergy = this.findAllEnergy.bind(this);
    this.findEnergyById = this.findEnergyById.bind(this);
    this.predictByDate = this.predictByDate.bind(this);
    this.calculateByDate = this.calculateByDate.bind(this);
  }

  async findAllEnergy(req: Request, res: Response, next: NextFunction) {
    try {
      let response;
      if (req.query.sensor) {
        response = await this.service.findEnergyBySensor(
          req.query.sensor as string,
          Number(req.query.page),
          Number(req.query.limit)
        );
      } else {
        response = await this.service.getEnergies(
          Number(req.query.page),
          Number(req.query.limit)
        );
      }

      if (req.query.page) {
        const totalData = await this.service.countEnergy(
          req.query.sensor as string
        );
        res.paginated(
          "Success",
          response,
          response.length,
          totalData,
          Number(req.query.page),
          Number(req.query.limit) || 10
        );
      } else {
        res.success("Success", response);
      }
    } catch (error) {
      next(error);
    }
  }

  async findEnergyById(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.service.findEnergyById(
        req.params.id as string
      );
      res.success("Success", response);
    } catch (error) {
      next(error);
    }
  }

  async predictByDate(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.predictByDate(req, req.body);
      res.created("Prediction success");
    } catch (error) {
      next(error);
    }
  }

  async calculateByDate(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.calculateByDate(req, req.body);
      res.created("Calculation success");
    } catch (error) {
      next(error);
    }
  }
}

export default EnergyController;
