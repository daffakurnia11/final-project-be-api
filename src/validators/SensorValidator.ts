import { body } from "express-validator";

class SensorValidator {
  public create = [
    body("name").exists().withMessage("Sensor name is required"),
    body("voltage").exists().withMessage("Sensor voltage is required"),
    body("current").exists().withMessage("Sensor current is required"),
    body("power").exists().withMessage("Sensor power is required"),
    body("power_factor")
      .exists()
      .withMessage("Sensor power factor is required"),
    body("frequency").exists().withMessage("Sensor frequency is required"),
    body("energy").exists().withMessage("Sensor energy is required"),
    body("apparent_power")
      .exists()
      .withMessage("Sensor apparent power is required"),
    body("reactive_power")
      .exists()
      .withMessage("Sensor reactive power is required"),
  ];

  public bulkCreate = [
    body("se")
      .exists()
      .withMessage("Sensor data is required")
      .isArray()
      .withMessage("Sensor data must be an array of objects")
      .custom((value) => (value.length < 3 ? false : true))
      .withMessage("Sensor data must have at least 3 objects"),
    body("se.*.name").exists().withMessage("Sensor name is required"),
    body("se.*.voltage")
      .exists()
      .withMessage("Sensor voltage is required"),
    body("se.*.current")
      .exists()
      .withMessage("Sensor current is required"),
    body("se.*.power").exists().withMessage("Sensor power is required"),
    body("se.*.power_factor")
      .exists()
      .withMessage("Sensor power factor is required"),
    body("se.*.frequency")
      .exists()
      .withMessage("Sensor frequency is required"),
    body("se.*.energy").exists().withMessage("Sensor energy is required"),
    body("se.*.apparent_power")
      .exists()
      .withMessage("Sensor apparent power is required"),
    body("se.*.reactive_power")
      .exists()
      .withMessage("Sensor reactive power is required"),
  ];
}

export default SensorValidator;
