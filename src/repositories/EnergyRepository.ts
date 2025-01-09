import { prisma } from "../config/database";
import { EnergyData, PowerPredictionData } from "../types/Energy";

class EnergyRepository {
  async getEnergies(page?: number, limit?: number): Promise<EnergyData[]> {
    if (page) {
      const limitQuery = limit || 10;
      return await prisma.$queryRaw<EnergyData[]>`
        SELECT * FROM energies
        ORDER BY "date" DESC, "name" ASC
        OFFSET ${(page - 1) * limitQuery} LIMIT ${limitQuery};
      `;
    }

    return await prisma.$queryRaw<EnergyData[]>`
      SELECT * FROM energies
      ORDER BY "date" DESC, "name" ASC;
    `;
  }

  async countEnergies(sensor?: string): Promise<number> {
    let data;
    if (sensor) {
      data = await prisma.$queryRaw<any>`
        SELECT COUNT(*)::bigint AS count FROM energies
        WHERE "name" = ${sensor};
      `;
    } else {
      data = await prisma.$queryRaw<any>`
        SELECT COUNT(*)::bigint AS count FROM energies;
      `;
    }
    const count = Number(data[0].count);
    return count;
  }

  async findEnergyBySensor(
    sensor: string,
    page?: number,
    limit?: number
  ): Promise<EnergyData[]> {
    if (page) {
      const limitQuery = limit || 10;
      return await prisma.$queryRaw<EnergyData[]>`
        SELECT * FROM energies
        WHERE "name" = ${sensor}
        ORDER BY "date" DESC
        OFFSET ${(page - 1) * limitQuery} LIMIT ${limitQuery};
      `;
    }

    return await prisma.$queryRaw<EnergyData[]>`
      SELECT * FROM energies
      WHERE "name" = ${sensor}
      ORDER BY "date" DESC;
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
