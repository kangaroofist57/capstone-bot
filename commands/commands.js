module.exports = {
    name: 'commands',
    description: 'returns full list of commands for this bot',
    execute: async function(message, args, variables, config, embed) {

        const fs = require('fs');
        const commandFiles = await fs.readdirSync('./commands').filter(file => file.endsWith('.js')).map(cmd => {
            let File = require(`../commands/${cmd}`);
            return {
                name: File.name,
                description: File.description
            };
        });
        (embed).setColor(0xF70B5D)

        await commandFiles.forEach(cmds => embed.addField(`__${cmds.name}__`, cmds.description));
        await message.channel.send(embed);

    }
}