import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { errorHandler } from "./middlewares/errorHandler";
import { responseHandler } from "./middlewares/responseHandler";
import SensorRoute from "./routes/SensorRoute";
import path from "path";

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../')));

// Route for index.html
app.get('/', (req, res) => {
  console.log("test")
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Import routes here
app.use(responseHandler);
app.use("/api/v1/sensors", new SensorRoute().router); // Pass the service to SensorRoute
app.use(errorHandler);

export { app };
