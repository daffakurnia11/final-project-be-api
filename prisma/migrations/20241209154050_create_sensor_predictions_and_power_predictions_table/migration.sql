-- CreateTable
CREATE TABLE "sensor_predictions" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "name" TEXT NOT NULL,
    "prediction_date" TIMESTAMPTZ(6) NOT NULL,
    "prediction_power" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "sensor_predictions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "power_predictions" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "sensor_prediction_id" UUID NOT NULL,
    "power" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "power_predictions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "sensor_predictions_name_idx" ON "sensor_predictions"("name");

-- CreateIndex
CREATE INDEX "sensor_predictions_prediction_date_idx" ON "sensor_predictions"("prediction_date");

-- CreateIndex
CREATE INDEX "power_predictions_sensor_prediction_id_idx" ON "power_predictions"("sensor_prediction_id");

-- AddForeignKey
ALTER TABLE "power_predictions" ADD CONSTRAINT "power_predictions_sensor_prediction_id_fkey" FOREIGN KEY ("sensor_prediction_id") REFERENCES "sensor_predictions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
