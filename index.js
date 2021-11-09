const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const path = require("path");
const port = process.env.port || 8000;
const fs = require("fs");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require("./middleware/passport");
const { authRouter, reminderRouter } = require("./routes")

const upload = require("./middleware/upload");
const checkAuth = require("./middleware/checkAuth");

// Middleware for express
app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log(req.session.passport);
  next();
});

app.use((req, res, next) => {
  res.locals = ({
    user: req.user || null,
  });
  next()
});

app.post("/upload",  upload.single("file"), async (req, res) => {
  try {
    const url = await require("imgur").uploadFile(`./uploads/${req.file.filename}`)
    res.json({ url: url.link });
    fs.unlinkSync(`./uploads/${req.file.filename}`);
  } catch (err) {
    console.log(err);
  }
});

app.use("/reminder", reminderRouter);

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`🚀 Server has started on port ${port}`);
});
