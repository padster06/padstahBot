const Discord = require('discord.js');

function list(msg, queues) {
   const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Listing Queue')
      .setAuthor('Padstah Bot', 'https://i.imgur.com/Tn0Rbbj.png')
      .setDescription('Some description here');

   for (var i = 0; i < queues[msg.guild.id].songs.length; i++) {
      embed.addFields({
         name: queues[msg.guild.id].songs[i].title,
         value: `${queues[msg.guild.id].songs[i].duration} --- ${
            queues[msg.guild.id].songs[i].url
         }`,
      });
   }
   msg.channel.send(embed);
}

module.exports = list;
