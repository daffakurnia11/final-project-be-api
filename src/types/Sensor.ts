export interface SensorData {
  id?: string;
  name: string;
  voltage: number;
  current: number;
  power: number;
  power_factor: number;
  frequency: number;
  energy: number;
  apparent_power: number;
  reactive_power: number;
}

export interface BulkSensorData {
  se: SensorData[];
}
