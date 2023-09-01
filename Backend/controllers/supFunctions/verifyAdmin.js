const Response = require("../../utils/utilityFunctions/response");
const verifyJWT = require("../../utils/security/verifyJwt");
const callBack = require("../subFunctions/callBack");
const joinRoom = require("../../utils/utilityFunctions/joinRoom");

const verifyAdmin = async (socket, data, cb) => {
  try {
    const payload = verifyJWT(process.env.ADMIN_JWT_SECRET, data.token);
    const response = new Response("success", true, { user: payload }, null);
    joinRoom(socket);

    callBack(response, cb);
  } catch (err) {
    const response = new Response("fail", false, null, err.message);
    callBack(response, cb);
  }
};
module.exports = verifyAdmin;
