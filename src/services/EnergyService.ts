import { Request } from "express";
import { startPredict } from "../utils/prediction";
import { startCalculate } from "../utils/calculation";
import { EnergyPayload } from "../types/Energy";
import EnergyRepository from "../repositories/EnergyRepository";
import { BadRequestError, InternalServerError } from "../middlewares/errorHandler";

class EnergyService {
  private repository: EnergyRepository;

  constructor() {
    this.repository = new EnergyRepository();
  }

  async getEnergies(): Promise<any> {
    return await this.repository.getEnergies();
  }

  async findEnergyBySensor(sensor: string): Promise<any> {
    return await this.repository.findEnergyBySensor(sensor);
  }

  async findEnergyById(id: string): Promise<any> {
    return await this.repository.findEnergyById(id);
  }

  async predictByDate(req: Request, data: EnergyPayload): Promise<any> {
    const io = req.app.get("socketio");

    io.emit("prediction-status", true);

    try {
      let response;
      if (data.sensor !== "all") {
        response = await startPredict(data.sensor, data.date);
      } else {
        response = await startPredict("Sensor 1", data.date);
        response = await startPredict("Sensor 2", data.date);
        response = await startPredict("Sensor 3", data.date);
      }
      io.emit("prediction-status", false);
    } catch (error: any) {
      io.emit("prediction-status", false);
      if (error.response) {
        if (error.response.status === 400) {
          throw new BadRequestError(error.response.data.error);
        }
      }
      throw new InternalServerError(`Failed to predict data: ${error}`);
    }
  }

  async calculateByDate(req: Request, data: EnergyPayload): Promise<any> {
    const io = req.app.get("socketio");

    io.emit("calculation-status", true);

    try {
      let response;
      if (data.sensor !== "all") {
        response = await startCalculate(data.sensor, data.date);
      } else {
        response = await startCalculate("Sensor 1", data.date);
        response = await startCalculate("Sensor 2", data.date);
        response = await startCalculate("Sensor 3", data.date);
      }
      io.emit("calculation-status", false);
    } catch (error: any) {
      io.emit("calculation-status", false);
      if (error.response) {
        if (error.response.status === 400) {
          throw new BadRequestError(error.response.data.error);
        }
      }
      throw new InternalServerError(`Failed to calculate data: ${error}`);
    }
  }
}

export default EnergyService;
