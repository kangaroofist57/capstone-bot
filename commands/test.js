module.exports = {
    name: 'test',
    description: 'says !test used to test the bot',
    execute: async function(message, args, variables, config, embed, mongoose, capstone) {

        await message.channel.send(`${variables.variables.test} and ${variables.functions.run()} you ran command ${args[0]} check console for final test`);
        await console.log(`your bot token is ${config.token}`); // delete this line as you never want to show your bot token. this for testing

    }
}