const mongoose = require('mongoose');

const tickets = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userID: String,
    guildName: String,
    guildID: String,
    channelName: String,
    channelID: String,
    createdChannelID: String,
    categoryID: String,
    message: String,
    messageID: String,
    guildDB: String,
    time: String
});

module.exports = mongoose.model("tickets", tickets);