import cron from "node-cron";
import axios from "axios";
import { config } from "../config";

const hitPredictionEndpoint = async (sensor: string) => {
  try {
    console.log("Prediction endpoint hit for sensor:", sensor);
    const response = await axios.post(
      `${config.modelUrl}/api/sensors/energy_prediction/`,
      {
        sensor,
      }
    );
    console.log("Prediction endpoint hit successfully:", response.status);
  } catch (error) {
    console.error("Error hitting the prediction endpoint:", error);
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
