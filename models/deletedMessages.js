const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guild: Object,
    user: Object,
    channel: Object,
    messages: Array
});

module.exports = mongoose.model("deleted-messages", reportSchema);