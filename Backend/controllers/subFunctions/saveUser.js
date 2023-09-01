const userSchema = require("../../models/userSchema");
const Response = require("../../utils/utilityFunctions/response");
const callBack = require("../subFunctions/callBack");
const generateJWT = require("../../utils/security/generateJwt");
const { join } = require("path");
const joinRoom = require("../../utils/utilityFunctions/joinRoom");
const saveUser = async (socket, data, cb) => {
  try {
    if (await userSchema.findOne({ rollNo: data.rollNo })) {
      throw new Error("userExists");
    } else {
      const user = await userSchema.create({
        username: data.username,
        rollNo: data.rollNo,
        role: "user",
      });
      const token = await generateJWT(process.env.USER_JWT_SECRET, {
        rollNo: user.rollNo,
      });
      const response = new Response("success", true, { user, token }, null);
      joinRoom(socket);
      callBack(response, cb);
    }
  } catch (err) {
    console.log(err);
    const response = new Response("fail", false, null, err.message);
    callBack(response, cb);
  }
};
module.exports = saveUser;
