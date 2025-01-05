import { prisma } from "../config/database";

class PowerRepository {
  async findPredictedByDateAndSensor(
    date: string,
    sensor: string
  ): Promise<any[]> {
    return await prisma.$queryRaw<any[]>`
      SELECT
        date, name, power
      FROM
        power_predictions AS pp
        JOIN energies ON pp.energy_id = energies.id
      WHERE
        energies.date = ${date}
        AND energies.name = ${sensor};
    `;
  }

  async findMeasuredByDateAndSensor(date: string, sensor: string): Promise<any[]> {
    return await prisma.$queryRaw<any[]>`
      SELECT
        TO_CHAR("created_at", 'HH24:MI:SS') AS created_at,
        name,
        power      
      FROM
        sensor_electrics
      WHERE
        name = ${sensor}
        AND "created_at"::DATE = CAST(${date} AS DATE)
      ORDER BY "created_at" ASC;
    `;
  }
}

export default PowerRepository;
