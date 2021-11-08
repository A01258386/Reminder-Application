const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const authController = require("../controller/auth_controller");
const router = express.Router();

//inputs have to be named on the ejs file
router.get("/login", forwardAuthenticated, (req, res) => res.render("auth/login"));

router.post("/login",
// <- jimmy123@mail.com, jimmy123!

//giving this request to passwpord to handle authentication
//in this case, we are using local strategy
  passport.authenticate("local", {
    successRedirect: "/reminders",//a hidden step from passport call 
    //passport.login -> serialize user
    //that user will receive a session 
    failureRedirect: "/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});
router.get('/github', authController.gitLogin);
router.get('/github/callback', authController.gitLoginCB);
module.exports = router;
