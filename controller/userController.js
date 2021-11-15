const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
<<<<<<< HEAD
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
=======
  try {
    let user = userModel.findOne(email);
    if (user) {
      if (isUserValid(user, password)) {
        return user;
      }
    }
    return null; 
  } catch (error) {
    return null; 
  }
>>>>>>> 91488d967bb83688fb2a03c1c6b846e3f2cd3f56
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

<<<<<<< HEAD
module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
=======
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
>>>>>>> 91488d967bb83688fb2a03c1c6b846e3f2cd3f56
};
