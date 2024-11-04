import SensorRepository from "../repositories/SensorRepository";
import { Sensor } from "@prisma/client";
import { v7 as uuidv7 } from "uuid";
import { BulkSensorData, SensorData } from "../types/Sensor";

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

  async bulkCreate(sensorsData: BulkSensorData): Promise<Sensor[]> {
    const sensors: SensorData[] = sensorsData.sensors.map((sensor) => ({
      id: uuidv7(),
      ...sensor,
    }));
    return await this.repository.bulkCreate(sensors);
  }
}

export default SensorService;
