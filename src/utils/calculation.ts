import axios from "axios";
import { config } from "../config";

export const startCalculate = async (sensor: string, date?: string | null) => {
  try {
    const response = await axios.post(
      `${config.modelUrl}/api/energy/calculation/`,
      {
        sensor,
        date,
      }
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
