import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { errorHandler } from "./middlewares/errorHandler";
import { responseHandler } from "./middlewares/responseHandler";
import SensorRoute from "./routes/SensorRoute";

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes here
app.use(responseHandler);
app.use("/api/sensors", new SensorRoute().router); // Pass the service to SensorRoute
app.use(errorHandler);

export { app };
