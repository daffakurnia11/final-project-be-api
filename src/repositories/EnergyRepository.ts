import { prisma } from "../config/database";
import { EnergyData, PowerPredictionData } from "../types/Energy";

class EnergyRepository {
  async getEnergies(): Promise<EnergyData[]> {
    return await prisma.$queryRaw<EnergyData[]>`
      SELECT * FROM energies
      ORDER BY "date" ASC, "name" ASC;
    `;
  }

  async findEnergyBySensor(sensor: string): Promise<EnergyData[]> {
    return await prisma.$queryRaw<EnergyData[]>`
      SELECT * FROM energies
      WHERE "name" = ${sensor}
      ORDER BY "date" ASC;
    `;
  }

  async findEnergyById(id: string): Promise<EnergyData | null> {
    const energyData = await prisma.$queryRaw<EnergyData[]>`
      SELECT * FROM energies
      WHERE "id" = CAST(${id} AS UUID);
    `;

    return energyData[0] || null;
  }
}

export default EnergyRepository;
