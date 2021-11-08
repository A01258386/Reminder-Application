let database = require("../models/userModel").database;
let userModel = require("../models/userModel").userModel;

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    // implement
  },

  registerSubmit: (req, res) => {
    console.log(req.body.name, req.body.email, req.body.password)
    userModel.createUser(req.body.name, req.body.email, req.body.password)
    console.log(database)
    res.redirect("/reminders");
  }
};

module.exports = authController;
