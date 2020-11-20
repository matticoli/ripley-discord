require('dotenv').config();
const Discord = require('discord.js');
const axios = require('axios');
const bot = new Discord.Client();

const TOKEN = process.env.TOKEN;
const KEY = process.env.KEY;

bot.login(TOKEN);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity(`Why are we here, just to suffer?`, {type: 2}).then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
    console.log("Activity");
});

bot.on('message', msg => {
    let text = msg.content.toLowerCase();
    if (text.includes('ripley') || text.includes('@ripley')) {
      msg.reply('Bork bork!');
    }
    if (text.includes('fetch')) {

      axios.get(`https://sheets.googleapis.com/v4/spreadsheets/1cWbL5jW5QyGfssRjV1GRVd5LDTEvQ178wLHpSAhhoz0/values/Sheet1!A:A?key=${KEY}`).then(resp => {
              const photos = resp.data.values;

              let imgLink = photos[Math.floor(Math.random() * photos.length)][0];
              let embed = new Discord.MessageEmbed().setImage(imgLink).setURL(imgLink);

              msg.channel.send(embed);
      }).catch(err => {
        msg.channel.send("Bork bork! Nah. Blame Google");
        console.log(err);
      });
    }
    if (text.includes('attacc')) {
      msg.channel.send("*I will destroy you instantly*", {tts: true}).then(() => {}, err => {console.log(err)});
      msg.channel.send("CRONCH");
    }
  });