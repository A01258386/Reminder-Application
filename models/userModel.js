const database = [
    {
      id: 1,
      name: "Jimmy Smith",
      email: "jimmy123@gmail.com",
      password: "jimmy123!",
      reminders: [{id: 1, title: "abc", description: "abcabc", completed: false}],
      role: "admin"
    },
    {
      id: 2,
      name: "Johnny Doe",
      email: "johnny123@gmail.com",
      password: "johnny123!",
      reminders: [{id: 1, title: "abc", description: "abcabc", completed: false}],
      role: "user"
    },
    {
      id: 3,
      name: "Jonathan Chen",
      email: "jonathan123@gmail.com",
      password: "jonathan123!",
      reminders: [],
      role: "user"
    },
    {
      id: 4,
      name: "Jenny Doe",
      email: "selo@a",
      password: "selo",
      reminders: [],
      role: "user"
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
    create: (user) => {
      const newUser = {
        id: database.length + 1,
        name: user.name,
        email: user.email,
        password: user.password,
        reminders: []
      };
      database.push(newUser);
      return newUser;
    },
  };
  
  module.exports = { database, userModel };
  