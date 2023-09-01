const jwt = require("jsonwebtoken");
function verifyJWT(secret, token) {
  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (error) {
    throw error;
  }
}
module.exports = verifyJWT;
