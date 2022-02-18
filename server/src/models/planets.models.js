const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");
const planets = require("./planets.mongo");

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
          upsertOnePlanet(data);
        }
      })
      .on("error", (error) => {
        rej(error);
        console.log(error);
      })
      .on("end", async () => {
        const countPlannetsFount = (await getAllPlanets()).length;
        console.log(`${countPlannetsFount} habitable planets fount!`);
        res();
      });
  });
}

async function getAllPlanets() {
  return await planets.find({});
}

async function upsertOnePlanet(data) {
  try {
    await planets.updateOne(
      { keplerName: data.kepler_name },
      { keplerName: data.kepler_name },
      { upsert: true }
    );
  } catch (error) {
    console.log("unable to upsert planet" + error);
  }
}

module.exports = { loadPlanetsData, getAllPlanets };
