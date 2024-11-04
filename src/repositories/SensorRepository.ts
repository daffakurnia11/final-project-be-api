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

  async findSensorsSince(date: Date): Promise<Sensor[]> {
    return await SensorModel.findMany({
      where: {
        created_at: {
          gte: date,
        },
      },
    });
  }
}

export default SensorRepository;
