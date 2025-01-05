import PowerRepository from "../repositories/PowerRepository";

class PowerService {
  private repository: PowerRepository;

  constructor() {
    this.repository = new PowerRepository();
  }

  async findPredictedByDateAndSensor(date: string, sensor: string): Promise<any[]> {
    return await this.repository.findPredictedByDateAndSensor(date, sensor);
  }

  async findMeasuredByDateAndSensor(date: string, sensor: string): Promise<any[]> {
    return await this.repository.findMeasuredByDateAndSensor(date, sensor);
  }
}

export default PowerService;