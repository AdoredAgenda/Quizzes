const { Error } = require("mongoose");
const adminSchema = require("../../models/adminSchema");
const Response = require("../../utils/utilityFunctions/response");
const callBack = require("../subFunctions/callBack");
const generateJWT = require("../../utils/security/generateJwt");
const joinRoom = require("../../utils/utilityFunctions/joinRoom");

const loginAdmin = async (socket, data, cb) => {
  try {
    const admin = await adminSchema.findOne({ username: data.username });
    if (admin) {
      console.log(data.password);
      if (admin.password === data.password) {
        const adminJwt = await generateJWT(process.env.ADMIN_JWT_SECRET, {
          username: admin.username,
          role: "admin",
        });
        const response = new Response(
          "success",
          true,
          { admin, adminJwt },
          null
        );
        callBack(response, cb);
      } else {
        throw new Error("invalidCrediantials");
      }
    } else {
      throw new Error("invalidCrediantials");
    }
  } catch (err) {
    console.log("syxsyxtcvsvxs");
    const response = new Response("fail", false, null, err.message);
    console.log(response);
    callBack(response, cb);
  }
  joinRoom(socket);
};
module.exports = loginAdmin;
