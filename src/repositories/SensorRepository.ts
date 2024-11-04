import SensorModel from "../models/SensorModel";
import { Sensor } from "@prisma/client";
import { SensorData } from "../types/Sensor";

class SensorRepository {
  async create(sensorData: SensorData): Promise<Sensor> {
    return await SensorModel.create({
      data: sensorData,
    });
  }

  async bulkCreate(sensorsData: SensorData[]): Promise<Sensor[]> {
    return await SensorModel.createManyAndReturn({
      data: sensorsData,
    });
  }
}

export default SensorRepository;
