import { prisma } from "../config/database";
import { SensorPredictionData } from "../types/SensorPrediction";

class PredictionRepository {
  async findAll(sensor?: string | null): Promise<SensorPredictionData[]> {
    if (sensor) {
      return await prisma.$queryRaw<SensorPredictionData[]>`
        SELECT 
          id, 
          name, 
          prediction_date::date AS prediction_date, 
          prediction_power
        FROM sensor_predictions 
        WHERE name = ${sensor};
      `;
    }

    return await prisma.$queryRaw<SensorPredictionData[]>`
      SELECT 
        id, 
        name, 
        prediction_date::date AS prediction_date, 
        prediction_power
      FROM sensor_predictions;
    `;
  }

  async findById(id: string): Promise<SensorPredictionData | null> {
    const result = await prisma.$queryRaw<SensorPredictionData[]>`
      SELECT 
        sp.id,
        sp.name,
        sp.prediction_date::date AS prediction_date,
        sp.prediction_power,
        ARRAY_AGG(pp.power) AS prediction_data
      FROM
        sensor_predictions sp
      LEFT JOIN
        power_predictions pp ON sp.id = pp.sensor_prediction_id
      WHERE
        sp.id = ${id}::uuid
      GROUP BY
        sp.id;
    `;

    if (result && result.length > 0) {
      return result[0];
    }
    return null;
  }
}

export default PredictionRepository;
