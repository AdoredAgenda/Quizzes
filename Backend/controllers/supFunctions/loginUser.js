const Response = require("../../utils/utilityFunctions/response");
const verifyJWT = require("../../utils/security/verifyJwt");
const attachUser = require("../../utils/utilityFunctions/attachUser");
const callBack = require("../subFunctions/callBack");
const joinRoom = require("../../utils/utilityFunctions/joinRoom");

const loginUser = async (socket, data, cb) => {
  try {
    const payload = verifyJWT(process.env.USER_JWT_SECRET, data.token);
    await attachUser(socket, payload);
    const response = new Response("success", true, { user: socket.user }, null);
    joinRoom(socket);

    callBack(response, cb);
  } catch (err) {
    const response = new Response("fail", false, null, err.message);
    callBack(response, cb);
  }
};
module.exports = loginUser;
