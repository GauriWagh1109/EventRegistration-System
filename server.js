const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const Registration = require("./models/Registration");

const app = express();

app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));


// API Routes
app.get("/registrations", async (req, res) => {
  const data = await Registration.find();
  res.json(data);
});

app.post("/registrations", async (req, res) => {

  const newRegistration = new Registration(req.body);

  await newRegistration.save();

  res.json(newRegistration);
});


// Serve React Frontend
app.use(express.static(path.join(__dirname, "frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});