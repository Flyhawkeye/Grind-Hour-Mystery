const Discord = require('discord.js');
const database = require('../utils/database');

module.exports = {
  name: 'viewticket',
  aliases: ['vticket'],
  description: 'View a specific ticket',
  execute: async (client, message, args, config, database) => {
    if (args.length < 1) {
      return message.reply('Please provide a ticket ID.');
    }

    const ticketId = args[0];
    const ticket = await database.getTicket(ticketId);
    if (ticket) {
      message.reply(`Ticket ${ticketId}: Numbers - ${ticket.numbers.join(', ')}`);
    } else {
      message.reply(`Ticket ${ticketId} not found.`);
    }
  }
};