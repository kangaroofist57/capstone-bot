const Discord = require('discord.js');
const embed = new Discord.MessageEmbed();
const config = require('./configs/config.json');
const bot = new Discord.Client();
const token = require('./configs/token.json').token;
const fs = require('fs');
const cmds = fs.readdirSync('./commands').filter(f => f.endsWith('.js')).map(cmd => cmd.replace('.js', ''));
const eventFolder = fs.readdirSync('./events');
const varFolder = fs.readdirSync('./variables').filter(f => f.endsWith('.js'));
const mongoose = require('mongoose');
const capstone = require('./models/capstone');

mongoose.connect('mongodb://localhost/capstone', { useNewUrlParser: true, useUnifiedTopology: true });

function variables() {

    let varObj = {};

    varFolder.forEach(file => {

        varObj[file.replace('.js', '')] = require(`./variables/${file}`);

    });

    return varObj;
    
}

for(let file of eventFolder) {

    const eventFile = require(`./events/${file}`);
    const eventType = file.replace('.js', '');

    bot.on(eventType, event => eventFile.execute(event, bot, Discord, config, cmds, variables(), embed, mongoose, capstone));

}

bot.login(token);