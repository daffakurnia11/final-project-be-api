import cron from "node-cron";
import { startPredict } from "./prediction";
import { startCalculate } from "./calculation";

cron.schedule(
  "0 0 * * *",
  async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDate = yesterday.toISOString().split("T")[0];

    await startPredict("Sensor 1", yesterdayDate);
    await startCalculate("Sensor 1", yesterdayDate);
    await startPredict("Sensor 2", yesterdayDate);
    await startCalculate("Sensor 2", yesterdayDate);
    await startPredict("Sensor 3", yesterdayDate);
    await startCalculate("Sensor 3", yesterdayDate);
  },
  {
    timezone: "UTC",
  }
);

console.log("Scheduler running...");
