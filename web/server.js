// File: web/server.js const express = require('express'); const fs = require('fs'); const path = require('path'); const bodyParser = require('body-parser');

const app = express(); const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true })); app.use(bodyParser.json()); app.use(express.static(path.join(__dirname, 'public')));

const configPath = path.join(__dirname, '../data/config.json'); const messagesPath = path.join(__dirname, '../data/messages.json');

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'views/index.html')); });

app.post('/save-config', (req, res) => { const { token, channelId } = req.body; if (!token || !channelId) return res.status(400).send('Token and Channel ID are required.'); fs.writeFileSync(configPath, JSON.stringify({ token, channelId }, null, 4)); res.send('✅ Configuration Saved Successfully. Please restart the bot.'); });

app.post('/add-message', (req, res) => { const { content, day, time } = req.body; if (!content || !day || !time) return res.status(400).send('All fields are required.');

let messages = [];
if (fs.existsSync(messagesPath)) {
    messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
}

messages.push({ content, day, time });
fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 4));

res.send('✅ Message Scheduled Successfully.');

});

app.listen(PORT, () => { console.log(🌐 Web Panel running at http://localhost:${PORT}); });

