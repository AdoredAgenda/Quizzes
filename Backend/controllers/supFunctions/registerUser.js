const saveUser = require("../subFunctions/saveUser");

const registerUser = (socket, data, cb) => {
  saveUser(socket, data, cb);
};
module.exports = registerUser;
