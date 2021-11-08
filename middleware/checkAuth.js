module.exports = {
  ensureAuthenticated: function (req, res, next) {
    console.log("MIDDDLEWARE",req.user);
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
  },
};
