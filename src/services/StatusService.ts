import axios from "axios";
import { config } from "../config";
import { Request } from "express";

class StatusService {
  async checkPredictionStatus(req: Request): Promise<any> {
    const io = req.app.get("socketio");

    const res: any = await axios.get(
      `${config.modelUrl}/api/energy/prediction/status/`
    );

    io.emit("prediction-status", res.data.is_prediction_running);

    return res.data;
  }

  async checkCalculationStatus(req: Request): Promise<any> {
    const io = req.app.get("socketio");

    const res: any = await axios.get(
      `${config.modelUrl}/api/energy/calculation/status/`
    );

    io.emit("calculation-status", res.data.is_calculation_running);

    return res.data;
  }
}

export default StatusService;
