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
    // implement this code
    let { title, description, completed } = req.body;
    let { id } = req.params;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == id;
    });
    
    searchResult.title = title
    searchResult.description = description
    searchResult.completed = stringToBloo(completed)
    
    res.redirect(`/reminder/${id}`)

  },

  delete: (req, res) => {
    // Implement this code
    let { id } = req.params;//let id = req.params.id;
    let reminderToDelete = database.cindy.reminders.findIndex(function (reminder) {
      return reminder.id == id;
    });
    database.cindy.reminders.splice(reminderToDelete, 1);
    res.redirect("/reminders");
  },
};

module.exports = remindersController;

function stringToBloo(mystring){
  if (mystring == 'true'){
    return true
  }else{
    if (mystring == 'false'){
      return false
    }
    else{
      return undefined
    }
  }
}