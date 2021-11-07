const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");


const localLogin = new LocalStrategy(
  {
    //
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {//done function is given to you by password
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

//also created req.user = user
//now we can use req.user for all the users in ejs pages
passport.serializeUser(function (user, done) {
  done(null, user.id);//store userID inside the session
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});


//const gitLogin = new GitHubStrategy(
// need to find documentation
//)


module.exports = passport.use(localLogin);
