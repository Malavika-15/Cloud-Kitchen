const express = require('express');
const app = express();
const path = require('path');

// Sample working API route (remove or modify as needed)
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// Serve static files from Vite's build output (dist)
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route for React Router (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});