const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const configPath = path.join(__dirname, '../data/config.json');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/save-config', (req, res) => {
    const { token, channelId } = req.body;

    if (!token || !channelId) {
        return res.status(400).send('Token and Channel ID are required.');
    }

    const newConfig = { token, channelId };
    fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 4));

    res.send('✅ Configuration Saved Successfully. Please restart the bot.');
});

app.listen(PORT, () => {
    console.log(`🌐 Web Panel running at http://localhost:${PORT}`);
});
