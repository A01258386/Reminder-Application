const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");
const localLogin = new LocalStrategy( // the strategy being used (eg. twitter, facebook)
  

// const localLogin = new LocalStrategy((username, password, done) => {
// console.log(username, password) // going to be the email and password that the user submitted
//})

  {
    usernameField: "email", // tells passport that we are using email instead of username
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    // if user is found in database then user will be returned as a user or as false
    return user
      ? done(null, user) // no errors (null), user found
      : done(null, false, { // no errors (null), user not found
          message: "Your login details are not valid. Please try again",
        });
  }
);

// creates session                user will create new variable req.user = user
passport.serializeUser(function (user, done) { // user from above will be used
  console.log("yes")
  done(null, user.id); // store user id in session
});

passport.deserializeUser(function (id, done) { // id from user.id from the session
  let user = userController.getUserById(id); // if user is found (var is assigned)
  if (user) {
    done(null, user); // re assign req.user = user
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin); // add more .use(twitter).use(github) if we want more strategies
