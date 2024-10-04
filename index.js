require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
  ],
});
const config = require('./config');
const database = require('./utils/database');
const api = require('./api');

client.commands = new Discord.Collection();

fs.readdirSync('./commands').forEach(file => {
  if (!file.endsWith('.js')) return;
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
});

client.login(config.botToken);

client.on('ready', () => {
  console.log('Bot is online!');
});

client.on('messageCreate', message => {
  if (!message.content.startsWith(config.prefix)) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (!client.commands.has(command)) return;
  try {
    client.commands.get(command).execute(client, message, args, config, database);
  } catch (error) {
    console.error(error);
    message.reply('Error executing command!');
  }
});