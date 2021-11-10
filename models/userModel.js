const defaultImage = "https://i.imgur.com/9pNffkj.png"
const { generatePictureUrl } = require("../helpers/unsplash")
const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    image: defaultImage,
    password: "jimmy123!",
    reminders: [{ id: 1, title: "abc", description: "abcabc", completed: false }]
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    image: defaultImage,
    password: "johnny123!",
    reminders: [{ id: 1, title: "abc", description: "abcabc", completed: false }]
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    image: defaultImage,
    password: "jonathan123!",
    reminders: []
  },
  {
    id: 4,
    name: "Jenny Doe",
    email: "selo@a",
    image: defaultImage,
    password: "selo",
    reminders: []
  }
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },

  create: async (user) => {
    const newUser = {
      id: database.length + 1,
      name: user.name,
      email: user.email,
      image: '',
      password: user.password,
      reminders: []
    };
    let url = await generatePictureUrl();
    newUser.image = url;
    database.push(newUser);
    return newUser;
  },
};

module.exports = { database, userModel };
