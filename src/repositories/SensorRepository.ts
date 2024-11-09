import SensorModel from "../models/SensorModel";
import { Sensor } from "@prisma/client";
import { SensorData } from "../types/Sensor";

class SensorRepository {
  async findLastSensor(): Promise<Sensor[] | null> {
    return await SensorModel.findMany({
      take: 3,
      orderBy: {
        created_at: "desc",
      },
    });
  }

  async findSensorsSince(date: Date): Promise<Sensor[]> {
    return await SensorModel.findMany({
      where: {
        created_at: {
          gte: date,
        },
      },
      orderBy: {
        created_at: "asc",
      }
    });
  }

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
