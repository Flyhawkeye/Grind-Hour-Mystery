const Discord = require('discord.js');
const mongoose = require('mongoose');
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('Error connecting to MongoDB:', err);
});

client.on('ready', () => {
  console.log('Bot is online!');
});

client.on('message', (message) => {
  if (message.author.bot) return;

  const prefix = process.env.PREFIX;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  try {
    switch (command) {
      case 'ping':
        message.channel.send('Pong!');
        break;
      default:
        break;
    }
  } catch (err) {
    console.log('Error executing command:', err);
  }
});

client.login(process.env.DISCORD_TOKEN).then(() => {
  console.log('Bot logged in successfully');
}).catch((err) => {
  console.log('Error logging in bot:', err);
});