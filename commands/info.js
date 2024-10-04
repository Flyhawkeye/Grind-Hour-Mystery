const Discord = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'info',
  aliases: ['information'],
  description: 'View drawing information',
  execute: async (client, message, args, config) => {
    const infoMessage = `Drawing Information: Ball Count: ${config.ballCount} Winner Count: ${config.winnerCount} Prize Amount: ${config.currency}${config.prizeAmount} Ticket Price: ${config.currency}${config.ticketPrice}`;
    message.reply(infoMessage);
  }
};