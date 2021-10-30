const { log } = require("console");
let database = require("../database");

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
    // let updateTitle = searchResult.title;
    // let updateDesc = searchResult.description;
    // let updateComplete = searchResult.completed;
    let updateTitle = req.body.title;
    let updateDesc = req.body.description;
    let updateComplete = req.body.completed;

    // console.log(database.cindy.reminders[id])

    reminderToEdit = database.cindy.reminders[id];
    searchResult.title = updateTitle;
    searchResult.description = updateDesc;
    searchResult.completed = updateComplete;
    
    // console.log(database.cindy.reminders[id])
    console.log(searchResult)
  
    // res.redirect("/reminder/" + reminderToFind);

    // console.log(database.cindy.reminders[id])
    // console.log(reminderToUpdate)
    // console.log(updateTitle)
    // console.log(updateDesc)
    // console.log(updateComplete)
  },

  delete: (req, res) => {
    // Implement this code
  },
};

module.exports = remindersController;
