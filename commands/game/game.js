const Discord = require('discord.js');

function createGame(msg) {
   let game = new Game();
   game.createPanel();
   game.sendGame(msg);
}

class Game {
   constructor() {
      this.gamePanel = [];
   }

   createPanel() {
      for (var y = 0; y < 11; y++) {
         this.gamePanel.push([]);
         for (var x = 0; x < 18; x++) {
            this.gamePanel[y].push('⬛');
         }
         this.gamePanel[y].push('\r');
      }
      console.log(this.gamePanel);
   }

   sendGame(msg) {
      let sendString = '';
      for (let y = 0; y < this.gamePanel.length; y++) {
         for (let x = 0; x < this.gamePanel[y].length; x++) {
            sendString += this.gamePanel[y][x];
         }
      }
      console.log(sendString);
      const embed = new Discord.MessageEmbed()
         .setColor('#0099ff')
         .setDescription(sendString)
         .setTitle('Game');
      msg.channel.send(embed);
   }
}

module.exports = createGame;
