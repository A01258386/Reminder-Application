module.exports = {
<<<<<<< HEAD
  ensureAuthenticated: function (req, res, next) { // check if user is logged in
=======
  ensureAuthenticated: function (req, res, next) {
    console.log("MIDDDLEWARE",req.user);
>>>>>>> 91488d967bb83688fb2a03c1c6b846e3f2cd3f56
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login");
  },
<<<<<<< HEAD
  forwardAuthenticated: function (req, res, next) { // if user is already logged in
    if (!req.isAuthenticated()) { // if not already logged in, go to login
      return next();
    }
    res.redirect("/dashboard"); // if logged in already, go to dashboard
=======
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
>>>>>>> 91488d967bb83688fb2a03c1c6b846e3f2cd3f56
  },
};
