const Discord = require('discord.js');
const database = require('../utils/database');

module.exports = {
name: 'viewtickets',
aliases: ['vt'],
description: 'View all tickets that have been purchased',
execute: async (client, message, args, config, database) => {
const tickets = await database.getAllTickets();
if (tickets.length > 0) {
message.reply(`All tickets: ${tickets.map(ticket => ticket.number).join(', ')}`);
} else {
message.reply('No tickets have been purchased yet.');
}
}
};