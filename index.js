const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts")

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

app.set("view engine", "ejs");
//this line does not do anything 
// Routes start here
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized:false,
    cookie: {
      httpOnly:true,
      secure:false,
      maxAge: 60 * 60 * 24, //(one day)
    }
  })

)

const passport = require("./middleware/passport");
const authRoute = require ("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");
const reminderRoute = require("./routes/reminderRoute");
const { ensureAuthenticated } = require("./middleware/checkAuth");
// Middleware for express
app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   console.log(`User details are: `);
//   console.log(req.user);

//   console.log("Entire session object:");
//   console.log(req.session);

//   console.log(`Session details are: `);
//   console.log(req.session.passport);
//   next();
// });

app.use("/", indexRoute);
app.use("/auth", authRoute);
//can refactor codes from index to here 
//app.use("/reminder",reminderRoute);
//app.use("/reminders",reminderRoute);

app.get("/reminders",ensureAuthenticated, reminderController.list);

app.get("/reminder/new",ensureAuthenticated, reminderController.new);

app.get("/reminder/:id", ensureAuthenticated,reminderController.listOne);

app.get("/reminder/:id/edit", ensureAuthenticated,reminderController.edit);

app.post("/reminder/",ensureAuthenticated, reminderController.create);

// Implement this yourself
app.post("/reminder/update/:id", ensureAuthenticated,reminderController.update);

// Implement this yourself
app.post("/reminder/delete/:id",ensureAuthenticated, reminderController.delete);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
app.get("/register", authController.register);
app.get("/login", authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
