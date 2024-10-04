const Discord = require('discord.js');
const config = require('../config');
const database = require('../utils/database');

module.exports = {
  name: 'buy',
  aliases: ['purchase'],
  description: 'Buy a ticket',
  async execute(client, message, args, config) {
    const ticket = await database.buyTicket(message.author.id);
    message.reply(`Ticket purchased! Your ticket number is ${ticket.number}`);
  }
};