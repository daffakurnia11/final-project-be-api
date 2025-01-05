-- CreateTable
CREATE TABLE "energies" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "name" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "calculated_energy" DOUBLE PRECISION,
    "predicted_energy" DOUBLE PRECISION,

    CONSTRAINT "energies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "power_predictions" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "energy_id" UUID NOT NULL,
    "power" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "power_predictions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "energies_name_idx" ON "energies"("name");

-- CreateIndex
CREATE INDEX "energies_date_idx" ON "energies"("date");

-- CreateIndex
CREATE INDEX "power_predictions_energy_id_idx" ON "power_predictions"("energy_id");

-- AddForeignKey
ALTER TABLE "power_predictions" ADD CONSTRAINT "power_predictions_energy_id_fkey" FOREIGN KEY ("energy_id") REFERENCES "energies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
