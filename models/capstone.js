const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guild: Object,
    ticket: Object
});

module.exports = mongoose.model("guilds", reportSchema);

// username: String,
// userID: String,
// guildName: String,
// guildID: String,
// channelName: String,
// channelID: String,
// message: String,
// messageID: String,
// createdRoleID: String,
// createdCategoryID: String,
// time: String