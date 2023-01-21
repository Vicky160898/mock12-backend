const Usermodel = require("../models/user");
const argon2 = require("argon2");
const express = require("express");
const app = express.Router();

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await argon2.hash(password);
  try {
    let newUser = new Usermodel({
      name,
      email,
      password: hash,
    });
    await newUser.save();
    return res.status(200).send(newUser);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await Usermodel.findOne({ email: email });
  try {
    if (await argon2.verify(user.password, password)) {
      return res
        .status(201)
        .json({ message: "login successful", email: email , name:user.name });
    } else {
      res.status(401).send("INVALID CREDENTIALS");
    }
  } catch (err) {
    res.status(401).send("INVALID CREDENTIALS");
  }
});

app.get("/getProfile/:id", async (req, res) => {
    const { id } = req.params;
  try {
    const data = await Usermodel.findById({ _id:id });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = app;
