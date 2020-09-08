module.exports = {
    name: 'mongo',
    description: 'returns full list of commands for this bot',
    execute: async function(message, args, variables, config, embed, mongoose, capstone) {

        const report = new capstone({
        _id: mongoose.Types.ObjectId(),
        username: message.author.tag,
        userID: message.author.id,
        guildName: message.guild,
        guildID: message.guild.id,
        channel: message.channel.id,
        channelName: message.channel.name,
        message: message.content,
        messageID: message.id,
        time: message.createdAt
        });

        report.save().then( result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        });

        message.reply('saved to database');

    }
}