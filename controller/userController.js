const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  console.log(user,"HEY HEY");
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

const findOrAppend = (profile) =>{
  let thisuser = userModel.findOrAppendGithub(profile);
  if (thisuser){
    return thisuser
  }else{
    return null;
  }
};

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  findOrAppend,
};
