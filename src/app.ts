import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { errorHandler } from "./middlewares/errorHandler";
import { responseHandler } from "./middlewares/responseHandler";
import SensorRoute from "./routes/SensorRoute";
import EnergyRoute from "./routes/EnergyRoute";
import StatusRoute from "./routes/StatusRoute";
import PowerRoute from "./routes/PowerRoute";
import path from "path";

// Cronjob Scheduler
import './utils/scheduler';

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../')));

// Import routes here
app.use(responseHandler);
app.use("/api/v1/sensors", new SensorRoute().router); 
app.use("/api/v1/energy", new EnergyRoute().router);
app.use("/api/v1/status", new StatusRoute().router);
app.use("/api/v1/power", new PowerRoute().router);
app.use(errorHandler);

export { app };
