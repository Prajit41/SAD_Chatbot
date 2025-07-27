const express = require('express');
const fs = require('fs');
const path = require('path');
const responses = require('./responses');
const app = express();
const PORT = process.env.PORT || 3000;

const moodsPath = path.join(__dirname, 'moods.json');
const publicPath = path.join(__dirname, 'public');

// Middleware
app.use(express.json());
app.use(express.static(publicPath));

// API: Moods
app.get('/api/moods', (req, res) => {
  fs.readFile(moodsPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read mood data.' });
    try { res.json(JSON.parse(data)); } catch { res.json([]); }
  });
});

app.post('/api/moods', (req, res) => {
  const { date, mood } = req.body;
  if (!date || typeof mood !== 'number') {
    return res.status(400).json({ error: 'Invalid payload.' });
  }
  fs.readFile(moodsPath, 'utf8', (err, data) => {
    let moods = [];
    if (!err && data) {
      try { moods = JSON.parse(data); } catch {}
    }
    moods.push({ date, mood });
    fs.writeFile(moodsPath, JSON.stringify(moods, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Failed to save mood.' });
      res.json({ success: true });
    });
  });
});

// API: Chatbot
app.post('/api/chat', (req, res) => {
  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages array required.' });
  }
  const reply = responses.generateReply(messages);
  res.json({ reply });
});

// Fallback: Serve index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Spring SAD Companion backend running on http://localhost:${PORT}`);
});