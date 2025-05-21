import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import http from "http";
import sequelize from "./config/Database.js";
import "./models/Association.js";
import Route from "./route/Route.js";

// Initialize server
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;
const server = http.createServer(app);

// Static & Route
app.use("/audios", express.static("audios"));
app.use("/api/conversia", Route);

// Start server
if (!port) {
  console.error("Critical Error: PORT not defined in environment variables.");
  process.exit(1);
}

(async () => {
  try {
    await sequelize.sync({ alter: false });
    server.listen(port, () => {
      console.log(`✅ Server operational at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed starting server or syncing database:", err);
    process.exit(1);
  }
})();
