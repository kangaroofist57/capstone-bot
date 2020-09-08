module.exports = {
    name: 'ready',
    description: 'the event of the bot being online and ready',
    execute: async function(event, bot, Discord, config, cmds, variables, embed) {

        console.log(`this bot is online as ${bot.user.tag}`);
        bot.user.setActivity(`${bot.guilds.cache.size} servers`, { type: 'WATCHING'}).catch(console.error);

    }
}