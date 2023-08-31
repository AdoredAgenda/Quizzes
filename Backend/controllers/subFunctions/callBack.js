const callBack = async (response, cb) => {
  const secret = process.env.USER_JWT_SECRET;

  cb(response);
};
module.exports = callBack;
