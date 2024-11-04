import {app} from "./app";
import { config } from "./config";

const API_PORT = config.apiPort || 8000;

app.listen(API_PORT, () => {
  console.log(`Server running in ${config.env} mode on port ${API_PORT}`);
});
