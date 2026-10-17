require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Middleware ----------

// Bonus: custom middleware that logs every request
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${Date.now() - start}ms)`
    );
  });
  next();
});

// JSON parsing
app.use(express.json());

// ---------- Routes ----------

// GET /  -> browsers get the static HTML page, curl/Postman get the text message
app.get('/', (req, res) => {
  const wantsHtml = (req.headers.accept || '').includes('text/html');
  if (wantsHtml) {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
  res.send('My Week 2 API!');
});

// Other static files (css, js, images) from /public
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// POST /user -> accepts { name, email }
app.post('/user', (req, res) => {
  const { name, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Both name and email are required.' });
  }

  res.send(`Hello, ${name}!`);
});

// GET /user/:id -> "User [id] profile"
app.get('/user/:id', (req, res) => {
  res.send(`User ${req.params.id} profile`);
});

// ---------- Error handling ----------

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Central error handler (also catches invalid JSON bodies)
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON in request body.' });
  }
  console.error(err);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
