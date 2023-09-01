const userSchema = require("../../models/userSchema");

const attachUser = (socket, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await userSchema.findOne({ rollNo: payload.rollNo });
      if (user) {
        socket.user = user;
        resolve(user);
      } else {
        throw new Error("noSuchUserYetSignUpPlease");
      }
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = attachUser;
