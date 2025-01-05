export interface EnergyPayload {
  sensor: string;
  date: string;
}

export interface EnergyData {
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  name: string;
  date: string;
  calculated_energy: number;
  predicted_energy: number;
  predicted_power?: number[];
}

export interface PowerPredictionData {
  id: string;
  energy_id: string;
  power: number;
}
