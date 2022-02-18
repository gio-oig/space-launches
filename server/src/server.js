const http = require("http");
require("dotenv").config();

const app = require("./app");

const { loadLaunchesData } = require("./models/launches.model");
const { loadPlanetsData } = require("./models/planets.models");
const { mongoConnect } = require("./services/mongo");

const PORT = process.env.port || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchesData();
  server.listen(PORT, () => {
    console.log("server has started on port " + PORT);
  });
}

startServer();
