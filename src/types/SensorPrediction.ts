export interface SensorPredictionData {
  id?: string;
  name: string;
  prediction_date: Date;
  prediction_power: number;
  prediction_data?: number[]
}