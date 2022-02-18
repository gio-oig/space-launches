const {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");
const { getPagination } = require("../../services/query");

async function httpGetAllLaunches(req, res) {
  const { skip, limit } = getPagination(req.query);
  return res.status(200).json(await getAllLaunches(skip, limit));
}

async function httpAddNewlaunch(req, res) {
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

  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  const existingLauch = await existsLaunchWithId(launchId);

  if (!existingLauch) {
    return res.status(404).json({ error: "Lounch not found" });
  }

  const aborted = await abortLaunchById(launchId);
  if (!aborted) {
    return res.status(404).json({ error: "could not abort launch" });
  }

  return res.status(201).json({ ok: true });
}

module.exports = { httpGetAllLaunches, httpAddNewlaunch, httpAbortLaunch };
