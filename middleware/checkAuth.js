module.exports = {
  ensureAuthenticated: function (req, res, next) { // check if user is logged in
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login");
  },
  forwardAuthenticated: function (req, res, next) { // if user is already logged in
    if (!req.isAuthenticated()) { // if not already logged in, go to login
      return next();
    }
    res.redirect("/dashboard"); // if logged in already, go to dashboard
  },
};
