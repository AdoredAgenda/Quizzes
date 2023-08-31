const userSchema = require("../../models/userSchema");
const Response = require("../../utils/response");
const callBack = require("../subFunctions/callBack");
const generateJWT = require("../../utils/generateJwt");

const saveUser = async (socket, data, cb) => {
  try {
    console.log(await userSchema.findOne({ rollNo: data.rollNo }));
    if (await userSchema.findOne({ rollNo: data.rollNo })) {
      console.log("hello");
      throw new Error("userExists");
    } else {
      console.log("else worked");

      const user = await userSchema.create({
        username: data.username,
        rollNo: data.rollNo,
      });
      const token = await generateJWT(process.env.USER_JWT_SECRET, {
        rollNo: user.rollNo,
      });
      const response = new Response("success", true, { user, token }, null);
      callBack(response, cb);
    }
  } catch (err) {
    console.log(err);
    const response = new Response("fail", false, null, err.message);
    callBack(response, cb);
  }
};
module.exports = saveUser;
