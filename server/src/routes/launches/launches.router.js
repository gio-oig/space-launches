const launchesRouter = require("express").Router();

const {
  httpGetAllLaunches,
  httpAddNewlaunch,
  httpAbortLaunch,
} = require("./launches.controller");

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewlaunch);
launchesRouter.delete("/:id", httpAbortLaunch);

module.exports = launchesRouter;
