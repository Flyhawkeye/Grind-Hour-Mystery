const Discord = require('discord.js');

module.exports = {
  name: 'help',
  aliases: ['h'],
  description: 'View available commands',
  execute: async (client, message, args, config) => {
    const helpMessage = `Available commands: /info - View drawing information /buy - Purchase a ticket /price - Check ticket price /tickets - View your tickets /viewtickets - View all purchased tickets /viewticket [ticket_id] - View ticket details /cancelticket [ticket_id] - Cancel a ticket /draw - Start the drawing /winner - View the winner /help - View this help menu`;
    message.reply(helpMessage);
  }
};