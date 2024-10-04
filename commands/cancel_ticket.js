const Discord = require('discord.js');
const database = require('../utils/database');

module.exports = {
  name: 'cancelticket',
  aliases: ['cancel'],
  description: 'Cancel a ticket',
  async execute(client, message, args, config) {
    const ticketNumber = args[0];
    const result = await database.cancelTicket(message.author.id, ticketNumber);
    if (result) {
      message.reply(`Ticket ${ticketNumber} cancelled.`);
    } else {
      message.reply(`You do not own ticket ${ticketNumber}.`);
    }
  }
};