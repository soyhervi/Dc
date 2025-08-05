const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./data/config.json', 'utf8'));

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log(`✅ Bot connected as ${client.user.tag}`);
});

client.login(config.token);
