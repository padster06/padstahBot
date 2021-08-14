function stop(msg, queues) {
   if (!msg.member.voice.channel) {
      return msg.channel.send(
         'you must be in a voice channel to use this command'
      );
   } else if (!queues[msg.guild.id] || !queues[msg.guild.id].songs) {
      return msg.channel.send('there are no songs');
   }
   queues[msg.guild.id].songs = [];
   queues[msg.guild.id].connection.dispatcher.end();
}

module.exports = stop;
