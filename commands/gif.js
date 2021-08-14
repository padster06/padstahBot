const fetch = require('node-fetch');
const Discord = require('discord.js');

async function getMeme(msg, args) {
   const url = 'https://g.tenor.com/v1/search?key="85H3XUEM8B8X"&q="meme"';
   const res = await fetch(url);
   const meme = await res.json();
   msg.channel.send(
      meme.results[Math.floor(Math.random() * meme.results.length)].url
   );
}

async function getGif(msg, args) {
   const search = args.join(' ');
   const url = `https://g.tenor.com/v1/search?key="85H3XUEM8B8X"&q=${search}`;
   const res = await fetch(url);
   const gif = await res.json();
   const index = Math.floor(Math.random() * gif.results.length);
   const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(gif.results[index].h1_title)
      .setURL(gif.results[index].url)
      .setAuthor('Padstah Bot', 'https://i.imgur.com/Tn0Rbbj.png')
      .setDescription('Here is the gif you requested');
   // .setImage(gif.results[index].url);
   msg.channel.send(embed);
   msg.channel.send(gif.results[index].url);
   // console.log(gif.results[index]);
}

module.exports.getMeme = getMeme;
module.exports.gif = getGif;
