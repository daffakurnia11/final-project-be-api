import cron from "node-cron";
import { startPredict } from "./prediction";
import { startCalculate } from "./calculation";

cron.schedule(
  "0 0 * * *",
  async () => {
    await startPredict("Sensor 1");
    await startCalculate("Sensor 1");
    await startPredict("Sensor 2");
    await startCalculate("Sensor 2");
    await startPredict("Sensor 3");
    await startCalculate("Sensor 3");
  },
  {
    timezone: "UTC",
  }
);

console.log("Scheduler running...");
