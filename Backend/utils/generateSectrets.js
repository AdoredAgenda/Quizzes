const crypto = require("crypto");
function generateRandomHexBytes(length) {
  length = 32;
  if (length <= 0) {
    throw new Error("Invalid length");
  }

  const buffer = crypto.randomBytes(length);
  const hexString = buffer.toString("hex");
  console.log(hexString);
}
generateRandomHexBytes();
