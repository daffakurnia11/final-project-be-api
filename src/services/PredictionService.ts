import axios from "axios";
import { config } from "../config";
import PredictionRepository from "../repositories/PredictionRepository";
import {
  PredictionPayload,
  SensorPredictionData,
} from "../types/SensorPrediction";
import { hitPredictionEndpoint } from "../utils/scheduler";
import { Request } from "express";

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

  async predictByDate(req: Request, data: PredictionPayload): Promise<any> {
    const io = req.app.get("socketio");

    io.emit("prediction-status", true);

    let response;
    if (data.sensor !== "all") {
      response = await hitPredictionEndpoint(data.sensor, data.predicted_date);
    } else {
      response = await hitPredictionEndpoint("Sensor 1", data.predicted_date);
      response = await hitPredictionEndpoint("Sensor 2", data.predicted_date);
      response = await hitPredictionEndpoint("Sensor 3", data.predicted_date);
    }

    io.emit("prediction-status", false);
    return response;
  }

  async checkPrediction(req: Request): Promise<any> {
    const io = req.app.get("socketio");

    const res: any = await axios.get(
      `${config.modelUrl}/api/sensors/prediction_status/`
    );

    io.emit("prediction-status", res.data.is_prediction_running);

    return res.data;
  }
}

export default PredictionService;
