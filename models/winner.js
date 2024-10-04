const Discord = require('discord.js');
const database = require('../utils/database');

module.exports.execute = async (client, message, args, config, database) => {
  const winner = await database.getLatestWinner();
  if (winner) {
    message.reply(`Latest winner: ${winner.username}, Ticket number: ${winner.ticketNumber}, Prize: ${config.currency}${config.prizeAmount}`);
  } else {
    message.reply('No winner yet.');
  }
};