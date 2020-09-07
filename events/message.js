module.exports = {
    name: 'message',
    description: 'the event of a message',
    execute: async function(message, bot, Discord, config, cmds, variables, embed) {

        const fs = require('fs');
        const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
        const args = message.content.substring(config.PREFIX.length).split(" ");

        bot.commands = new Discord.Collection();
        
        for(const file of commandFiles) {

            const command = require(`../commands/${file}`);
        
            bot.commands.set(command.name, command);
        }

        if(message.author.id === bot.user.id) return;

        if(message.content.startsWith(config.PREFIX) & cmds.includes(args[0])) {
    
            await bot.commands.get(args[0]).execute(message, args, variables, config, embed);
    
        }
    }
}