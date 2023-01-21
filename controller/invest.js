const express = require("express");
const InvestmentModel = require("../models/investor");
const app = express.Router();

app.post("/calculate", async (req, res) => {
  const { Amount, Rate, Years } = req.body;
  //let F = Total Maturity Value;
  let P = Amount;
  let i = Rate / 100;
  let n = Years;
  let F = P * (1 + i) ** n;
  let M = Math.floor(F - 1 / i);
  let total = P * n;
  let Gain = Math.abs(M - total);
//   console.log(M);
//   console.log(total);
//   console.log(Gain);
  try {
    return res.status(200).send({ M: M, total: total, Gain: Gain });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

app.get("/", async (req, res) => {
  let user = await InvestmentModel.find();
  res, send(user);
});

module.exports = app;
