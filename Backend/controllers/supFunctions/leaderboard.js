const User = require("../../models/userSchema");
const Leaderboard = require("../../models/leaderboardSchema"); // Import your leaderboard model

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

    // Create a new Leaderboard document with the updated leaderboard data
    const leaderboardData = leaderboard.map((user) => ({
      username: user.username,
      rollNo: user.rollNo,
      totalScore: user.totalScore,
      rank: user.rank,
    }));

    const newLeaderboard = new Leaderboard({
      leaderboard: leaderboardData,
    });

    // Save the new leaderboard document to the collection
    await newLeaderboard.save();

    // Return the array of leaderboard
    return leaderboard;
  } catch (error) {
    console.error(
      "Error preparing leaderboard and updating collection:",
      error
    );
    throw error;
  }
}

module.exports = prepareLeaderboard;
