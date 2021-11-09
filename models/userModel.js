const database = [
    {
      id: 1,
      name: "Jimmy Smith",
      email: "jimmy123@gmail.com",
      password: "jimmy123!",
      reminders: [{id: 1, title: "abc", description: "abcabc", completed: false}]
    },
    {
      id: 2,
      name: "Johnny Doe",
      email: "johnny123@gmail.com",
      password: "johnny123!",
      reminders: [{id: 1, title: "abc", description: "abcabc", completed: false}]
    },
    {
      id: 3,
      name: "Jonathan Chen",
      email: "jonathan123@gmail.com",
      password: "jonathan123!",
      reminders: []
    },
    {
      id: 4,
      name: "Jenny Doe",
      email: "selo@a",
      password: "selo",
      reminders: []
    },
  ];
  
  const userModel = {
    findOne: (email) => {
      console.log("current user data:",database)
      const user = database.find((user) => user.email === email);
      if (user) {
        return user;
      }else {
        console.log("not existing user ")
        return null;
      }
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
    findOrAppendGithub:(profile)=>{
      if (profile){
        let thisuser = database.find((user)=>user.githubID === profile.id)
        if (thisuser){
          return thisuser;
        }else{
          thisuser = { id:database.length + 1, name:profile["displayName"],githubID:profile.id,role:"user",reminders: []}
          database.push(thisuser)
          return thisuser
        }
      }
    }
  };
  
  module.exports = { database, userModel };
  