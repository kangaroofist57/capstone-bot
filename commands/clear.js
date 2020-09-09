module.exports = {
    name: 'clear',
    description: 'says !test used to test the bot',
    execute: async function(message, args, variables, config, embed, mongoose, capstone) {

        let num = args[1];

        if(!num) return message.channel.send('Please provide amount to delete');
        if(isNaN(num)) return message.channel.send(`${num} is not a number`);
        num = parseInt(num);
        if(num < 1) return message.channel.send('cannot delete that amount becuase amount is less than 1');
        // return console.log(num);

        message.channel.bulkDelete(num).then(async deleted => {

            let messages = await deleted.map(msg => {

                return {
                    userID: msg.author.id,
                    userName: msg.author.username,
                    messageID: msg.id,
                    message: msg.content,
                    date: msg.createdAt.toString()
                }

            });

            const messageDB =  new capstone.deletedMessages({
                _id: mongoose.Types.ObjectId(),
                guild: {
                    name: message.guild.name,
                    id: message.guild.id
                },
                user: {
                    name: message.author.username,
                    id: message.author.id
                },
                channel: {
                    name: message.channel.name,
                    id: message.channel.id
                },
                messages
            });

            messageDB.save().then(() => {
                message.channel.send(`deleted ${deleted.size} message(s)`).then(msg => setTimeout(() => msg.delete(), 2000));
            }).catch(err => {
                console.log('monog err', err);
            })


            // console.log(messages);

        })

    }
}