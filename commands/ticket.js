module.exports = {
    name: 'ticket',
    description: 'says !test used to test the bot',
    execute: async function(message, args, variables, config, embed, mongoose, capstone) {

        const Ticket = require('../models/tickets');

        let ticketCon = {};
        let ticketData = {};
        
        await capstone.findOne({ "guild.guildID": message.guild.id }).then(data => ticketCon = data);
        await Ticket.findOne({ guildID: message.guild.id, createdChannelID: message.channel.id }).then(data => {
            ticketData = data;
        }).catch(err => {
            console.log(err);
        });
        // return console.log(ticketData);

        if(args[1] === 'close') {

            let userFetch = await message.client.users.cache.get(ticketData.userID);
            let channelFetch = await message.client.channels.cache.get(ticketData.createdChannelID);

            if(channelFetch) {
                await channelFetch.delete();
            }

            if(userFetch) {
                await userFetch.send('Your ticket has been closed. If you have any other problems feel free to use the ticket command again in the future.');
            }

            await Ticket.findOneAndDelete({ guildID: message.guild.id, createdChannelID: message.channel.id }).then(data => {
                console.log('data delete', data);
            })

            return;

        }

        message.guild.channels.create(`${message.author.username}-ticket`, {
            type: 'text',
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL']
                },
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                },
                {
                    id: ticketCon.ticket.createdRoleID,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                }
            ]
        }).then(createdChannel => {
            createdChannel.setParent(ticketCon.ticket.createdCategoryID);

            const newTicket = new Ticket({
                _id: mongoose.Types.ObjectId(),
                username: message.author.username,
                userID: message.author.id,
                guildName: message.guild.name,
                guildID: message.guild.id,
                channelName: message.channel.name,
                channelID: message.channel.id,
                createdChannelID: createdChannel.id,
                categoryID: message.channel.parentID,
                message: message.content,
                messageID: message.id,
                guildDB: ticketCon._id,
                time: message.createdAt
            });
    
            newTicket.save().then(result => {

                (embed)
                .setTitle(message.author.username)
                .setDescription('This is the start of your new ticket. Please type and explain the problem that you are having and wait patiently for an admin to respond.')
                .setColor(config.embedColor)

                createdChannel.send(message.author, embed);

            }).catch(err => {
                console.log('err');
            });
        })

    }
}