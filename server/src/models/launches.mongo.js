const mongoose = require("mongoose");

const requiredNumber = { type: Number, required: true };
const requiredString = { type: String, required: true };
const requiredBoolean = { type: Boolean, required: true };

const launchesSchema = new mongoose.Schema({
  flightNumber: requiredNumber,
  mission: requiredString,
  rocket: requiredString,
  launchDate: { type: Date, required: true },
  target: requiredString,
  customers: [String],
  upcoming: requiredBoolean,
  success: requiredBoolean,
});

module.exports = mongoose.model("Launch", launchesSchema);
