const {
  launches,
  getAllLaunches,
  addNewlaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewlaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.target ||
    !launch.launchDate
  ) {
    return res.status(400).json({ error: "Missing required launch property" });
  }

  launch.launchDate = new Date(launch.launchDate);
  /**
   * dateObject.valueOf(): number || NaN
   * isNaN(dateObject.valueOf())
   */
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ error: "Inavlid launch date" });
  }

  addNewlaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({ error: "Lounch not found" });
  }

  const aborted = abortLaunchById(launchId);

  return res.status(201).json(aborted);
}

module.exports = { httpGetAllLaunches, httpAddNewlaunch, httpAbortLaunch };
