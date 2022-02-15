const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const habitablePlanets = [1, 2];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] > 1.6
  );
}

function loadPlanetsData() {
  return new Promise((res, rej) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on("error", (error) => {
        rej(error);
        console.log(error);
      })
      .on("end", () => {
        // console.log(`${habitablePlanets.length} habitable planets fount!`);
        res();
      });
  });
}

function getAllPlanets() {
  return habitablePlanets;
}

module.exports = { loadPlanetsData, getAllPlanets };
