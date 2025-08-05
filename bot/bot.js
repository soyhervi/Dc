const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const cron = require('node-cron');

const config = JSON.parse(fs.readFileSync('./data/config.json', 'utf8'));
const messages = JSON.parse(fs.readFileSync('./data/messages.json', 'utf8'));

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log(`✅ Bot connected as ${client.user.tag}`);

    messages.forEach(msg => {
        const cronTime = convertToCron(msg.day, msg.time);
        cron.schedule(cronTime, async () => {
            try {
                const channel = await client.channels.fetch(config.channelId);
                await channel.send(msg.content);
                console.log(`📤 Sent scheduled message: ${msg.content}`);
            } catch (err) {
                console.error('❌ Error sending scheduled message:', err);
            }
        });
    });
});

client.login(config.token);

function convertToCron(day, time) {
    const days = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };
    const [hour, minute] = time.split(':');
    return `${minute} ${hour} * * ${days[day]}`;
}
