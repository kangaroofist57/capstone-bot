module.exports = {
    name: 'setup',
    description: 'returns full list of commands for this bot',
    execute: async function(message, args, variables, config, embed, mongoose, capstone) {

        if(args[1] === 'ticket') {

            let dataBase = {};

            await capstone.findOne({ 'guild.guildID': message.guild.id}).then(data => dataBase = data);

            // console.log(dataBase)

            if(dataBase !== null) {
                if(dataBase.ticket) return message.channel.send('Your ticket system is already set up.');
            }

            message.guild.channels.create('tickets', { type: 'category' }).then(createdCategory => {

                message.guild.roles.create({
                    data: {
                        name: 'Ticket Manager',
                        color: 'RED',
                    }
                }).then(createdRole => {

                    createdCategory.overwritePermissions([
                        {
                            id: createdRole.id,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                        },
                        {
                            id: message.guild.id,
                            deny: ['VIEW_CHANNEL']
                        }
                    ])

                    const tickets = new capstone({
                        _id: mongoose.Types.ObjectId(),
                        guild: {
                            guildName: message.guild.name,
                            guildID: message.guild.id,
                        },
                        ticket: {
                            username: message.author.tag,
                            userID: message.author.id,
                            channelName: message.channel.id,
                            channelID: message.channel.name,
                            message: message.content,
                            messageID: message.id,
                            createdRoleID: createdRole.id,
                            createdCategoryID: createdCategory.id,
                            time: message.createdAt
                        }
                    });

                    tickets.save().then(() => {
                        message.channel.send('Your ticket system is all setup!');
                    }).catch(err => {
                        console.log('mongo err', err);
                    });

                })
                
            })

        }

    }
}