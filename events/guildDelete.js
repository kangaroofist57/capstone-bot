module.exports = {
    name: 'guildDelete',
    description: 'the event of the bot leaving a guild',
    execute: async function(guild, bot, Discord, config, cmds, variables, embed) {

        console.log(`bot left guild ${guild.name}`);

    }
}