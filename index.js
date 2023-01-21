require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connect = require("./config/db");
const UserModel = require("./controller/userRoute");
const InvestmentModel = require("./controller/invest");
const PORT = process.env.PORT;
const app = express();
app.use(express.urlencoded({ extended: true }));
mongoose.set("strictQuery", false);
app.use(express.json());
app.use(cors());

app.use("/user", UserModel);
app.use("/invest", InvestmentModel);

app.listen(PORT, async (req, res) => {
  await connect();
  console.log("server started");
});
