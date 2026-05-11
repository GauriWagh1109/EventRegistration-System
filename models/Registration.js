const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  college: String,
  event: String,
});

module.exports = mongoose.model("Registration", RegistrationSchema);