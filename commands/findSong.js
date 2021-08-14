const { YTSearcher } = require('ytsearcher');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');

const searcher = new YTSearcher({
   key: process.env.YT_APIKEY,
   revealed: true,
});

async function getSong(msg, id, args) {
   let result = await searcher.search(args.join(' '), { type: 'audio' });
   let songInfo = await ytdl.getInfo(result.first.url);
   let secs = songInfo.videoDetails.lengthSeconds;

   let song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
      channelName: songInfo.videoDetails.ownerChannelName,
      thumbNail: songInfo.videoDetails.thumbnails[1],
      duration: `${Math.floor(secs / 60)}:${Math.floor(secs % 60)}`,
   };

   sendEmbed(song, msg);
   return song;
}

function sendEmbed(song, msg) {
   msg.channel.send(
      new Discord.MessageEmbed()
         .setColor('#0099ff')
         .setTitle('Found A Song')
         .setURL(song.url)
         .setAuthor('Padstah Bot', 'https://i.imgur.com/Tn0Rbbj.png')
         .setDescription('Here is the song')
         .setThumbnail(song.thumbNail.url)
         .addFields(
            {
               name: 'Song Title',
               value: song.title,
               inline: true,
            },
            {
               name: 'Duration',
               value: song.duration,
               inline: true,
            },
            {
               name: 'Link',
               value: song.url,
               inline: true,
            },
            {
               name: 'Channel Name',
               value: song.channelName,
               inline: true,
            }
         )
         .setTimestamp()
   );
}

module.exports = getSong;
