const Discord = require('discord.js');
const { pickWinner, updateDrawingResults, resetDrawing } = require('../utils/database');
const config = require('../config');

module.exports = {
  name: 'drawwinner',
  aliases: ['draw'],
  description: 'Draw a winner from the balls',
  async execute(client, message, args, config) {
    try {
      const drawnBalls = await pickWinner();
      const prizeAmount = config.prizeAmount;
      const updatedWinner = await updateDrawingResults(drawnBalls, prizeAmount);
      await resetDrawing();
      const embed = new Discord.MessageEmbed()
        .setTitle('Giveaway Winner!')
        .setDescription(`Congratulations, the winning balls are: ${drawnBalls.join(', ')}`)
        .addField('Winning Balls', drawnBalls.join(', '))
        .addField('Prize Amount', `${config.currency}${updatedWinner.prizeAmount}`)
        .setColor('#FFD700');
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Error drawing winner:', error);
      message.channel.send('Error drawing winner. Please contact an admin.');
    }
  }
};