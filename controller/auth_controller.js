
const passport = require("../middleware/passport");
let userData = require("../userInfo")

let authController = {
  login: (req, res) => {
    console.log("log in page")
    res.render("auth/login");
  },

  register: (req, res) => {
    console.log("register page ")
    res.render("auth/register");
  },

  loginSubmit:
      passport.authenticate("local",{
        successRedirect : "/reminders",
        failureRedirect : "/login",
}),

  registerSubmit: (req, res) => {
    // implement
    console.log("register is pressed")
    userInput = req.body;
    console.log(userInput)
    let nextID= Object.keys(userData).length + 1
    console.log(nextID)
    userData.push({
      id: nextID,
      name: userInput.email,
      email : userInput.email,
      password: userInput.password,
    });
    res.redirect("/login");
  },
  logout: (req,res) => {
    req.logout();
    res.redirect("/login");
  }
  ,
  gitLogin: passport.authenticate("github"),
  gitLoginCB: passport.authenticate("github",  { failureRedirect: '/auth/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/reminders');
  }


};

module.exports = authController,userData;
