const User = require("../../models/userSchema"); // Import your user model

async function prepareLeaderboard() {
  try {
    // Sort the users by totalScore in descending order
    const leaderboard = await User.find({}).sort({ totalScore: -1 }).exec();

    // Update the rank for each user based on their position in the sorted array
    leaderboard.forEach((user, index) => {
      user.rank = index + 1;
    });

    // Save the updated user documents with ranks
    const promises = leaderboard.map((user) => user.save());
    await Promise.all(promises);

    // Return the array of leaderboard
    return leaderboard;
  } catch (error) {
    console.error("Error preparing leaderboard:", error);
    throw error;
  }
}
module.exports = prepareLeaderboard;
