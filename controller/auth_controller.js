let User = require("../models/userModel");

let authController = {
  logout: (req, res) => {
    req.logout();
    res.redirect("/auth/login");
  },
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    // implement
  },

  registerSubmit: async (req, res) => {
    const { name, email, password } = req.body;
    let newUser =await  User.userModel.create({ name, email, password })
    req.user = newUser;
    req.login(newUser, (err) => {
      if (err) {
        console.log(err);
        return res.redirect("/auth/register");
      }
      res.redirect("/reminder");
    });
  },
};

module.exports = authController;
