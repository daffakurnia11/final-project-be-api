import SensorModel from "../models/SensorModel";
import { prisma } from "../config/database";
import { Sensor } from "@prisma/client";
import { SensorData } from "../types/Sensor";
import { subHours, subMinutes } from "date-fns";

class SensorRepository {
  async findLastSensor(): Promise<Sensor[] | null> {
    return await prisma.$queryRaw<Sensor[]>`
      SELECT * FROM sensor_electrics 
      ORDER BY created_at 
      DESC LIMIT 3;
    `;
  }
  
  async findSensorsSince(value: number, filter: "hour" | "minute" | "second"): Promise<Sensor[]> {
    let date: Date;
    if (filter === "hour") {
      date = subHours(new Date(), value);
    } else if (filter === "minute") {
      date = subMinutes(new Date(), value);
    } else {
      date = subMinutes(new Date(), value / 60);
    }

    return await prisma.$queryRaw<Sensor[]>`
      WITH RankedSensors AS (
        SELECT *,
          ROW_NUMBER() OVER (PARTITION BY date_trunc(${filter}, created_at) ORDER BY created_at ASC) AS rn
        FROM sensor_electrics
        WHERE created_at >= ${date}
      )
      SELECT 
        id, created_at, updated_at, deleted_at, name, voltage, current, power, power_factor, frequency, energy, apparent_power, reactive_power
      FROM RankedSensors
      WHERE rn <= 3
      ORDER BY created_at ASC;
    `;
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
