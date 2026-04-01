const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const { default: mongoose } = require("mongoose");

const isValidEmail = (email) => {
  return emailRegex.test(email);
};

const isValidId = (ids) => {
  for (const id of ids) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return true;
    } else {
      return false;
    }
  }
};

module.exports = { isValidEmail, isValidId };
