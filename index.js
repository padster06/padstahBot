// require("dotenv").config();
// const Discord = require("discord.js");
// const { search } = require("ffmpeg-static");
// const fs = require("fs");
// const { disconnect } = require("process");
// const ytdl = require("ytdl-core");
// const app = require("express")();
// const { YTSearcher } = require("ytsearcher");
// const commandHandler = require("./commandHandler.js");
// // const mongoose = require('mongoose');

// const Intents = Discord.Intents;

const { Collection, Client, MessageEmbed, Intents } = require("discord.js");

const client = new Client({
  disableMentions: "everyone",
  partials: ["CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION"],
  intents: Intents.ALL,
});

// const client = new Discord.Client({
//   disableMentions: "everyone",
//   partials: ["CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION"],
//   intents: Intents.ALL,
// });
// const searcher = new YTSearcher({
//   key: process.env.YT_APIKEY,
//   revealed: true,
// });

// app.get("/", (req, res) => {
// res.send("Bot Online");
// });

// app.listen(process.env.PORT || 5000);

// const dbURI = `mongodb+srv://paddy:${process.env.DB_PASSWORD}@cluster0.dhehs.mongodb.net/padstahBot?retryWrites=true&w=majority`;
// mongoose
//    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//    .then((res) => {
//       console.log('db connected');
//    })
//    .catch((err) => {
//       console.error(err);
//    });

// const queue = new Map();
// let playlists = JSON.parse(fs.readFileSync("playlist.json"));

// client.login(process.env.DJS_LOGIN);
// client.on("ready", () => {
//   console.log("bot online");
// });

// client.on('message', async (msg) => {
//    const prefix = '-';
//    const serverQueue = queue.get(msg.guild.id);
//    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
//    const command = args.shift().toLowerCase();
//    // console.log(msg);
//    // console.log(msg.indexOf(prefix));
//    if (msg.content.includes(prefix)) {
//       // console.log(args);
//       switch (command) {
//          case 'play':
//             findSong(msg, serverQueue);
//             break;
//          case 'stop':
//             stop(msg, serverQueue);
//             break;
//          case 'skip':
//             skip(msg, serverQueue);
//             break;
//          case 'list':
//             list(args, serverQueue);
//             break;
//          case 'listpl':
//             listPl(args);
//             break;
//          case 'cp':
//             createPlaylist(args);
//             break;
//          case 'help':
//             intro();
//             break;
//       }
//    } else {
//       console.log(msg);
//    }
//    // }

//    async function findSong(msg, serverQueue) {
//       let vc = msg.member.voice.channel;

//       if (!vc) {
//          return msg.channel.send('please join a vc to use this bot');
//       }

//       if (playlists[args.join(' ')]) {
//          playlist = playlists[args.join(' ')];
//          if (!serverQueue) {
//             let queueConstructor = {
//                textChannel: msg.channel,
//                vChannel: vc,
//                connection: null,
//                songs: [],
//                volume: 10,
//                playing: true,
//             };
//             queue.set(msg.guild.id, queueConstructor);

//             for (var i = 0; i < playlist.length; i++) {
//                queueConstructor.songs.push(playlist[i]);
//                msg.channel.send(`Adding ${playlist[i].title}`);
//             }

//             msg.channel.send(
//                `I found a playlist called ${args.join(
//                   ' '
//                )} and I am currently adding songs`
//             );

//             try {
//                let connection = await vc.join();
//                queueConstructor.connection = connection;
//                play(msg.guild, queueConstructor.songs[0]);
//             } catch (err) {
//                console.log('ooops ', err);
//                queue.delete(msg.guild.id);
//                return msg.channel.send(`unable to choin chat ${err}`);
//             }
//          } else {
//             for (var i = 0; i < playlist.length; i++) {
//                serverQueue.songs.push(playlist[i]);
//             }
//             return msg.channel.send(
//                `I have found the playlist ${args.join(
//                   ' '
//                )} and I am adding them to your queue`
//             );
//          }
//       } else {
//          let result = await searcher.search(args.join(' '), { type: 'audio' });
//          let songInfo = await ytdl.getInfo(result.first.url);

//          let song = {
//             title: songInfo.videoDetails.title,
//             url: songInfo.videoDetails.video_url,
//          };

//          if (!serverQueue) {
//             let queueConstructor = {
//                textChannel: msg.channel,
//                vChannel: vc,
//                connection: null,
//                songs: [],
//                volume: 10,
//                playing: true,
//             };
//             queue.set(msg.guild.id, queueConstructor);

//             queueConstructor.songs.push(song);

//             msg.channel.send(
//                `I found a song called ${result.first.title} at ${result.first.url}`
//             );

//             try {
//                let connection = await vc.join();
//                queueConstructor.connection = connection;
//                play(msg.guild, queueConstructor.songs[0]);
//             } catch (err) {
//                console.log('ooops ', err);
//                queue.delete(msg.guild.id);
//                return msg.channel.send(`unable to choin chat ${err}`);
//             }
//          } else {
//             serverQueue.songs.push(song);
//             return msg.channel.send(
//                `The song ${song.title} has been added to your queue -- ${song.url}`
//             );
//          }
//       }
//    }
// function play(guild, song) {
//    const serverQueue = queue.get(guild.id);
//    if (!song) {
//       serverQueue.vChannel.leave();
//       queue.delete(guild.id);
//       return;
//    }
//    serverQueue.connection.dispatcher = serverQueue.connection
//       .play(ytdl(song.url, { filter: 'audioonly' }))
//       .on('finish', () => {
//          serverQueue.songs.shift();
//          play(guild, serverQueue.songs[0]);
//       });
// }

//    function stop(msg, serverQueue) {
//       if (!msg.member.voice.channel) {
//          return msg.channel.send(
//             'you must be in a voice channel to use this command'
//          );
//       } else if (!serverQueue || !serverQueue.songs) {
//          return msg.channel.send('there are no songs');
//       }
//       serverQueue.songs = [];
//       serverQueue.connection.dispatcher.end();
//    }

//    function skip(msg, serverQueue) {
//       if (!msg.member.voice.channel) {
//          return msg.channel.send(
//             'you must be in a voice channel to use this command'
//          );
//       }
//       if (!serverQueue) {
//          return msg.channel.send('there is nothing to skip');
//       }
//       serverQueue.connection.dispatcher.end();
//    }

//    function list(args, serverQueue) {
//       if (!queue.get(msg.guild.id).songs) {
//          return msg.channel.send('there is nothing to list');
//       }
//       let queueL = queue.get(msg.guild.id).songs;
//       if (args.includes('w/links')) {
//          for (var i = 0; i < queueL.length; i++) {
//             msg.channel.send(
//                `${i + 1}) ${queueL[i].title} -- ${queueL[i].url}`
//             );
//          }
//       } else {
//          for (var i = 0; i < queueL.length; i++) {
//             msg.channel.send(`${i + 1}) ${queueL[i].title}`);
//          }
//       }
//    }

//    function listPl(args) {
//       args = args.join(' ').split(', ');
//       if (!playlists[args[0]]) {
//          return msg.channel.send('❌I cannot find the playlist');
//       }
//       let queueL = playlists[args[0]];
//       if (args.includes('w/links')) {
//          for (var i = 0; i < queueL.length; i++) {
//             msg.channel.send(
//                `${i + 1}) ${queueL[i].title} -- ${queueL[i].url}`
//             );
//          }
//       } else {
//          for (var i = 0; i < queueL.length; i++) {
//             msg.channel.send(`${i + 1}) ${queueL[i].title}`);
//          }
//       }
//    }

//    function intro() {
//       //const introText = fs.readFileSync("./intro.txt");
//       msg.channel.send(`
// 		Welcome to Padstah Bot! -- Here's how to use it:
// 		use ? to prefix all of my commands, they are listed bellow ⬇
// 		list -- lists everything in the queue,
// 		list w/links -- lists everything in the queue with links atatched (from youtube),
// 		play <name of playlist> -- plays playlist if I cant find the playlist then 👇,
// 		play <name of song> -- plays the first song from youtube from puting that into a search,
// 		listpl <name of playlist> -- lists songs in that playlist,
// 			`);
//    }
//    async function createPlaylist(args) {
//       args = args.join(' ').split(', ');
//       let playlistName = args[0];
//       args.shift();
//       let playlistArr = [];
//       for (var i = 0; i < args.length; i++) {
//          let result = await searcher.search(args[i], { type: 'audio' });
//          let songInfo = await ytdl.getInfo(result.first.url);

//          let song = {
//             title: songInfo.videoDetails.title,
//             url: songInfo.videoDetails.video_url,
//          };
//          playlistArr.push(song);
//       }
//       playlists[playlistName] = playlistArr;
//       console.log(playlists);
//       msg.channel.send('Your new playlist has been created');
//       msg.channel.send('!listpl ' + playlistName);
//       msg.channel.send('!listpl ' + playlistName + ', w/links');
//    }
// });

client.on("message", commandHandler);
