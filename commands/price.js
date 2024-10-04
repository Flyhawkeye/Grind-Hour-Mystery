const Discord = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'price',
  aliases: ['cost'],
  description: 'View the ticket price',
  execute: async (client, message, args, config) => {
    message.reply(`Ticket price: ${config.currency}${config.ticketPrice}`);
  }
};