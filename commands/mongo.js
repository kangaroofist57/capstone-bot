module.exports = {
    name: 'mongo',
    description: 'returns full list of commands for this bot',
    execute: async function(message, args, variables, config, embed, mongoose, capstone) {

        const report = new capstone({
        _id: mongoose.Types.ObjectId(),
        username: message.author.tag,
        guildID: message.guild.id,
        time: message.createAt
        });

        report.save().then( result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        });

        message.reply('saved to database');

    }
}