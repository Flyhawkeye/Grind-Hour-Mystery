const Discord = require('discord.js');
const database = require('../utils/database');

module.exports.execute = async (client, message, args, config, database) => {
  const tickets = await database.getTickets(message.author.id);
  if (tickets.length > 0) {
    message.reply(`Your tickets: ${tickets.map(ticket => ticket.number).join(', ')}`);
  } else {
    message.reply('You have no tickets.');
  }
};