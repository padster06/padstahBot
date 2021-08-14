const ytdl = require('ytdl-core');
const getSong = require('./findSong');

async function playSong(guild, queue) {
   if (!queue.songs[0]) {
      queue.vc.leave();
      delete queue;
      return;
   }
   queue.connection.dispatcher = queue.connection
      .play(ytdl(queue.songs[0].url, { filter: 'audioonly' }))
      .on('finish', () => {
         queue.songs.shift();
         playSong(guild, queue);
      });
}

async function play(msg, id, args, queues) {
   const vc = msg.member.voice.channel;
   if (!vc) {
      msg.channel.send('please join a vc to use this bot');
      return;
   }

   if (!queues[msg.guild.id]) {
      try {
         queues[msg.guild.id] = {
            vc: vc,
            songs: [{ ...(await getSong(msg, id, args)) }],
            connection: null,
         };
         queues[msg.guild.id].connection = await queues[msg.guild.id].vc.join();
         playSong(msg.guild, queues[msg.guild.id]);
      } catch (err) {
         console.log('ooops ', err);
         delete queues[msg.guild.id];
         return msg.channel.send(`unable to choin chat ${err}`);
      }
   } else {
      queues[msg.guild.id].songs.push(await getSong(msg, id, args));
   }
   // return { connection: connection, queues: queues };
}

module.exports = play;
