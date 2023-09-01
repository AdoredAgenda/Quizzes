const verifyJWT = require("../../utils/security/verifyJwt");

const adminAuth = (token) => {
  try {
    if (!token) {
      throw new Error("notAuthorized");
    } else {
      const payload = verifyJWT(process.env.ADMIN_JWT_SECRET, token);
      if (payload.role != "admin") {
        throw new Error("notAuthorized");
      } else {
      }
    }
  } catch (err) {
    throw err;
  }
};
module.exports = adminAuth;
