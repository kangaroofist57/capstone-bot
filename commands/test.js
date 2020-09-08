module.exports = {
    name: 'test',
    description: 'says !test used to test the bot',
    execute: async function(message, args, variables, config, embed, mongoose, capstone) {

        // await message.channel.send(`${variables.variables.test} and ${variables.functions.run()} you ran command ${args[0]} check console for final test`);
        // await console.log(`your bot token is ${config.token}`); // delete this line as you never want to show your bot token. this for testing
        const Tickets = require('../models/tickets');
        const newTicket = new Tickets({
            _id: mongoose.Types.ObjectId(),
            username: 'test'
        });

        newTicket.save().then(result => {
            console.log(result);
        }).catch(err => {
            console.log('err');
        });

    }
}