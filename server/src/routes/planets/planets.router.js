const planetsRouter = require("express").Router();

const { getAllPlanets } = require("./planets.controller");

planetsRouter.get("/", getAllPlanets);

module.exports = planetsRouter;
