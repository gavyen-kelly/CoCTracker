const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: ['http://100.94.102.104:3000', 'http://localhost:5173']
}));
app.use(express.json());

app.get('/api/clans', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }
    try {
        const response = await axios.get('https://api.clashofclans.com/v1/clans', {
            headers: { Authorization: `Bearer ${process.env.CLASH_API_KEY}` },
            params: { name: query, limit: 10 }
        });
        console.log('Clan Search Response:', JSON.stringify(response.data, null, 2));
        fs.writeFileSync('server.log', JSON.stringify(response.data, null, 2) + '\n', { flag: 'a' });
        res.json(response.data);
    } catch (error) {
        console.error('Clan Search Error:', error.response?.data || error.message);
        fs.writeFileSync('server.log', JSON.stringify(error.response?.data || error.message, null, 2) + '\n', { flag: 'a' });
        res.status(500).json({ error: 'Failed to fetch clans' });
    }
});

app.get('/api/:clanTag/warlog', async (req, res) => {
    const { clanTag } = req.params;
    try {
        const response = await axios.get(`https://api.clashofclans.com/v1/clans/%23${clanTag}/warlog?limit=30`, {
            headers: { Authorization: `Bearer ${process.env.CLASH_API_KEY}` }
        });
        fs.writeFileSync('server.log', JSON.stringify(response.data, null, 2) + '\n', { flag: 'a' });
        res.json(response.data);
    } catch (error) {
        console.error('Clan Warlog Error:', error.response?.data || error.message);
        fs.writeFileSync('server.log', JSON.stringify(error.response?.data || error.message, null, 2) + '\n', { flag: 'a' });
        res.status(error.response?.status || 500).json({ error: 'Failed to fetch clan war log data' });
    }
});

app.get('/api/clans/:clanTag', async (req, res) => {
    const { clanTag } = req.params;
    try {
        const response = await axios.get(`https://api.clashofclans.com/v1/clans/%23${clanTag}`, {
            headers: { Authorization: `Bearer ${process.env.CLASH_API_KEY}` }
        });
        console.log('Clan Details Response:', JSON.stringify(response.data, null, 2));
        fs.writeFileSync('server.log', JSON.stringify(response.data, null, 2) + '\n', { flag: 'a' });
        res.json(response.data);
    } catch (error) {
        console.error('Clan Details Error:', error.response?.data || error.message);
        fs.writeFileSync('server.log', JSON.stringify(error.response?.data || error.message, null, 2) + '\n', { flag: 'a' });
        res.status(500).json({ error: 'Failed to fetch clan data' });
    }
});

app.get('/api/players/:playerTag', async (req, res) => {
    const { playerTag } = req.params;
    try {
        const response = await axios.get(`https://api.clashofclans.com/v1/players/%23${playerTag}`, {
            headers: { Authorization: `Bearer ${process.env.CLASH_API_KEY}` }
        });
        console.log('Player Details Response:', JSON.stringify(response.data, null, 2));
        fs.writeFileSync('server.log', JSON.stringify(response.data, null, 2) + '\n', { flag: 'a' });
        res.json(response.data);
    } catch (error) {
        console.error('Player Details Error:', error.response?.data || error.message);
        fs.writeFileSync('server.log', JSON.stringify(error.response?.data || error.message, null, 2) + '\n', { flag: 'a' });
        res.status(500).json({ error: 'Failed to fetch player data' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));