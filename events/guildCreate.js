module.exports = {
    name: 'guildCreate',
    description: 'the event of the bot joining a guild',
    execute: async function(guild, bot, Discord, config, cmds, variables, embed) {

        console.log(`bot connected to ${guild.name}`);

    }
}