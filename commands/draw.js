const Discord = require('discord.js');
const config = require('../config');
const database = require('../utils/database');

module.exports = {
  name: 'draw',
  aliases: ['d'],
  description: 'Start the drawing',
  async execute(client, message, args, config) {
    const winner = await database.pickWinner(config.ballCount, config.winnerCount);
    const drawingMessage = `**Drawing Time!** Winner: ${winner.username} Prize: ${config.currency}${config.prizeAmount}`;
    client.channels.cache.get(config.channelId).send(drawingMessage);
    await database.updateDrawingResults(winner, config.prizeAmount);
  }
};