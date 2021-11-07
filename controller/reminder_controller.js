const { log } = require("console");
let database = require("../database");
// const fs = require("fs").promises

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // app.post("/reminder/update/:id", reminderController.update);
    let id = parseInt(req.params.id) - 1;
    let reminderToFind = req.params.id;
    // let id = parseInt

    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    let updateTitle = req.body.title
    let updateDesc = req.body.description;
    let updateComplete = req.body.completed;
    if (updateComplete == "false") {
      updateComplete = false;
    } else if (updateComplete == "true") {
      updateComplete = true;
    }

    // console.log(database.cindy.reminders[id])

    // reminderToEdit = database.cindy.reminders[id];
    searchResult.title = updateTitle;
    searchResult.description = updateDesc;
    searchResult.completed = updateComplete;

    // let index = database.cindy.reminders.map(function(e) { return e.id; }).indexOf(1);
    // keys = Object.keys(database.cindy.reminders[index])
    // console.log(keys)

  
    res.redirect("/reminder/" + reminderToFind);
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;

    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });

    database.cindy.reminders.splice(searchResult, 1)
    res.redirect("/reminders");
  },
};

module.exports = remindersController;