import { body } from "express-validator";

class EnergyValidator {
  public create = [
    body("date").exists().withMessage("Date is required"),
    body("sensor")
      .exists()
      .withMessage("Sensor filter is required")
      .isIn(["all", "Sensor 1", "Sensor 2", "Sensor 3"])
      .withMessage("Sensor filter must be one of the following: all, Sensor 1, Sensor 2, Sensor 3")
    ,
  ];
}

export default EnergyValidator;
