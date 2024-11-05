import SensorRepository from "../repositories/SensorRepository";
import { Sensor } from "@prisma/client";
import { v7 as uuidv7 } from "uuid";
import { BulkSensorData, SensorData } from "../types/Sensor";
import { Request } from "express";
import { subHours } from "date-fns";

class SensorService {
  private repository: SensorRepository;

  constructor() {
    this.repository = new SensorRepository();
    this.create = this.create.bind(this);
    this.bulkCreate = this.bulkCreate.bind(this);
  }

  async create(sensorData: SensorData): Promise<Sensor> {
    const id = uuidv7();
    return await this.repository.create({ id, ...sensorData });
  }

  async bulkCreate(
    req: Request,
    sensorsData: BulkSensorData
  ): Promise<Sensor[]> {
    const sensors: SensorData[] = sensorsData.se.map((sensor) => ({
      id: uuidv7(),
      ...sensor,
    }));
    const response = await this.repository.bulkCreate(sensors);
    const getSensor = await this.repository.findSensorsSince(
      subHours(new Date(), 1)
    );
    const io = req.app.get("socketio");
    io.emit("sensor-data-updated", getSensor);
    io.emit("sensor-data-current", response);

    return response;
  }
}

export default SensorService;
