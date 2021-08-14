const functions = {
   play: require('./commands/play.js'),
   getMeme: require('./commands/gif').getMeme,
   gif: require('./commands/gif').gif,
   stop: require('./commands/stop'),
   skip: require('./commands/skip'),
   list: require('./commands/list'),
   createGame: require('./commands/game/game'),
};

let queues = {};

async function comandHandler(msg) {
   const prefix = '-';
   if (msg.content[0] != prefix) {
      return;
   }
   const args = msg.content.split(' ');
   const command = args.shift().slice(prefix.length);

   if (command === 'play' || command === 'p') {
      queueInfo = await functions.play(msg, msg.guild.id, args, queues);
   }

   if (command === 'meme') {
      functions.getMeme(msg, args);
   }

   if (command == 'gif') {
      functions.gif(msg, args);
   }

   if (command === 'skip') {
      functions.skip(msg, queues);
   }

   if (command === 'stop') {
      functions.stop(msg, queues);
      // console.log(queueInfo.queues);
   }

   if (command === 'list') {
      functions.list(msg, queues, false);
   }

   // if (command === 'game') {
   //    functions.createGame(msg);
   // }
   if (command === 'setDomains') {
   }
}

module.exports = comandHandler;
