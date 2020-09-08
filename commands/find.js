module.exports = {
    name: 'find',
    description: 'returns full list of commands for this bot',
    execute: async function(message, args, variables, config, embed, mongoose, capstone) {

        capstone.find({ message: '!mongO test'}).exec().then(data => console.log(data)).catch(err => {
            console.log('error')
        });

        // console.log(capstone.find('messages'))

    }
}