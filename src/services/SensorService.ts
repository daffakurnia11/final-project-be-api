import SensorRepository from "../repositories/SensorRepository";
import { Sensor } from "@prisma/client";
import { v7 as uuidv7 } from "uuid";
import { BulkSensorData, SensorData } from "../types/Sensor";
import { Request } from "express";

class SensorService {
  private repository: SensorRepository;

  constructor() {
    this.repository = new SensorRepository();
    this.findLastSensor = this.findLastSensor.bind(this);
    this.create = this.create.bind(this);
    this.bulkCreate = this.bulkCreate.bind(this);
  }

  async findLastSensor(): Promise<Sensor[] | null> {
    return await this.repository.findLastSensor();
  }

  async findSensorsSince(value: number, filter: "hour" | "minute" | "second"): Promise<Sensor[]> {
    return await this.repository.findSensorsSince(value, filter);
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

    this.socket(req, response);

    return response;
  }

  async socket(req: Request, sensors: Sensor[]): Promise<void> {
    const io = req.app.get("socketio");

    io.emit("update-data", {
      status: true,
    })
    
    io.emit("realtime-sensor-data", sensors);
  }
}

export default SensorService;
