let queues = {};
const yts = require('yt-search');
async function getTestSong() {
   let r = await yts('lol');
   let vids = await r.videos;
   console.log(await vids[0]);
}
getTestSong();
async function getSong(msg) {
   const args = msg.content.split(' ');

   let prefix = args.shift();

   let r = await yts(args);
   let result = awaitr.videos[0];
   let result = await searcher.search(args.join(' '), { type: 'audio' });
   let songInfo = await ytdl.getInfo(result.url);
   let secs = songInfo.videoDetails.lengthSeconds;

   let song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
      channelName: songInfo.videoDetails.ownerChannelName,
      thumbNail: songInfo.videoDetails.thumbnails[1],
      duration: `${Math.floor(secs / 60)}:${Math.floor(secs % 60)}`,
   };

   // sendEmbed(song, msg);
   msg.channel.send('found the song');
   return song;
}

async function play(msg) {
   const vc = msg.member.voice.channel;
   if (!vc) {
      return msg.channel.send('U need to join a vc');
   }

   if (!queues[msg.guild.id]) {
      try {
         queues[msg.guild.id] = {
            songs: [],
            vc,
            connection: undefined,
         };

         queues[msg.guild.id].songs.push(getSong(msg));
         queues[msg.guild.id].connection = await vc.join();

         playSong();
      } catch {
         console.log('ooops ', err);
         delete queues[msg.guild.id];
         return msg.channel.send(`unable to choin chat ${err}`);
      }
   }
}

async function playSong(msg) {
   let song = queues[msg.guild.id].songs[0];
   if (!song) {
      msg.vc.leave();
      delete queues[msg.guild.id];
      return;
   }

   queues[msg.guild.id].connection.dispatcher = queues[msg.guild.id]
      .play(ytdl(queue.songs[0].url, { filter: 'audioonly' }))
      .on('finish', () => {
         queue.songs.shift();
         playSong(guild, queue);
      });
}
