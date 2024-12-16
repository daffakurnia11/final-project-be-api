import PredictionRepository from "../repositories/PredictionRepository";
import { SensorPredictionData } from "../types/SensorPrediction";

class PredictionService {
  private repository: PredictionRepository;

  constructor() {
    this.repository = new PredictionRepository();
  }

  async getPrediction(sensor?: string | null): Promise<SensorPredictionData[]> {
    return await this.repository.findAll(sensor);
  }

  async getPredictionById(id: string): Promise<SensorPredictionData | null> {
    return await this.repository.findById(id);
  }
}

export default PredictionService;
