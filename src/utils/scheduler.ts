import cron from "node-cron";
import axios from "axios";
import { config } from "../config";

export const hitPredictionEndpoint = async (
  sensor: string,
  predicted_date?: string | null
) => {
  try {
    console.log("Prediction endpoint hit for sensor:", sensor);
    const response = await axios.post(
      `${config.modelUrl}/api/sensors/energy_prediction/`,
      {
        sensor,
        predicted_date,
      }
    );
    console.log("Prediction endpoint hit successfully:", response.status);
    return response.data;
  } catch (error: any) {
    console.error("Error hitting the prediction endpoint:", error);
    return error;
  }
};

cron.schedule(
  "0 0 * * *",
  async () => {
    await hitPredictionEndpoint("Sensor 1");
    await hitPredictionEndpoint("Sensor 2");
    await hitPredictionEndpoint("Sensor 3");
  },
  {
    timezone: "UTC",
  }
);

console.log("Scheduler running...");
