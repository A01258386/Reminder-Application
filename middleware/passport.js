const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");
<<<<<<< HEAD
const localLogin = new LocalStrategy( // the strategy being used (eg. twitter, facebook)
  

// const localLogin = new LocalStrategy((username, password, done) => {
// console.log(username, password) // going to be the email and password that the user submitted
//})

  {
    usernameField: "email", // tells passport that we are using email instead of username
=======
const GitHubStrategy  = require('passport-github2').Strategy
const process = require('process')
const localLogin = new LocalStrategy(
  {
    usernameField: "email",
>>>>>>> 91488d967bb83688fb2a03c1c6b846e3f2cd3f56
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
<<<<<<< HEAD
    // if user is found in database then user will be returned as a user or as false
    return user
      ? done(null, user) // no errors (null), user found
      : done(null, false, { // no errors (null), user not found
=======
    return user
      ? done(null, user)
      : done(null, false, {
>>>>>>> 91488d967bb83688fb2a03c1c6b846e3f2cd3f56
          message: "Your login details are not valid. Please try again",
        });
  }
);

<<<<<<< HEAD
// creates session                user will create new variable req.user = user
passport.serializeUser(function (user, done) { // user from above will be used
  console.log("yes")
  done(null, user.id); // store user id in session
});

passport.deserializeUser(function (id, done) { // id from user.id from the session
  let user = userController.getUserById(id); // if user is found (var is assigned)
  if (user) {
    done(null, user); // re assign req.user = user
=======


let GITHUB_CLIENT_ID = "a956801e4b8324294c55";
let GITHUB_CLIENT_SECRET = "3e512ca1fb7eb0e615e8d71a2a4b087468486d89";

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.

const githubLogin = new GitHubStrategy(
  {
    //clientID: process.env.GITHUB_CLIENT_ID,
    //clientSecret: process.env.GITHUB_CLIENT_SECRET,
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/github/callback"
  },

function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
    const user = userController.findOrAppend(profile);
    console.log(profile)
    if (user){
      done(null,user)
    }else{
      done(null,false,{
        message:"Your login details are not valid, please try again"
      })
    }
  }
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
>>>>>>> 91488d967bb83688fb2a03c1c6b846e3f2cd3f56
  } else {
    done({ message: "User not found" }, null);
  }
});

<<<<<<< HEAD
module.exports = passport.use(localLogin); // add more .use(twitter).use(github) if we want more strategies
=======
module.exports = passport.use(localLogin).use(githubLogin);
>>>>>>> 91488d967bb83688fb2a03c1c6b846e3f2cd3f56
