
const Userdata = require("../userInfo")
//const Userdata = require("../controller/auth_controller")

const userModel = {
    findOne: (email) => {
      console.log("current user data:",Userdata)
      const user = Userdata.find((user) => user.email === email);
      if (user) {
        return user;
      }else {
        console.log("not existing user ")
        return null;
      }
      //throw new Error(`Couldn't find user with email: ${email}`);
    },
    
    findById: (id) => {
      const user = Userdata.find((user) => user.id === id);
      if (user) {
        return user;
      }
      throw new Error(`Couldn't find user with id: ${id}`);
    },
  };


  module.exports = userModel