// src/app.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./User');

const app = express();
const PORT = 3000;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// --- MONGODB CONNECTION ---
mongoose.connect('mongodb+srv://Ramakrishna:kittu1234@cluster0.j355vvr.mongodb.net/User?retryWrites=true&w=majority')
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// --- ROUTES ---

// Render login page as the default
app.get('/', (req, res) => {
  res.render('login');
});

// Render signup page explicitly
app.get('/signup', (req, res) => {
  res.render('signup');
});

// Handle signup form
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (await User.findOne({ email })) {
      return res.status(400).render('signup', { error: 'User already exists' });
    }
    await new User({ email, password }).save();
    // after signup, redirect to login
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).render('signup', { error: 'Failed to register' });
  }
});

// Render login page
app.get('/login', (req, res) => {
  res.render('login');
});

// Handle login form
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).render('login', { error: 'Invalid credentials' });
    }
    // after login, redirect to the main page
    res.redirect('/index.html');
  } catch (err) {
    console.error(err);
    res.status(500).render('login', { error: 'Login failed' });
  }
});

// API: serve match data from data/ folder
app.get('/api/matches', (req, res) => {
  const dataFolder = path.join(__dirname, '..', 'data');
  fs.readdir(dataFolder, (err, files) => {
    if (err) return res.status(500).json({ message: 'Failed to load match data' });

    const jsonFiles = files.filter(f => f.endsWith('.json'));
    const matches = jsonFiles.map(f => require(path.join(dataFolder, f)));
    res.json(matches);
  });
});

// --- STATIC FILES (served only after all routes above) ---
app.use(express.static(path.join(__dirname, '..', 'public')));

// --- 404 HANDLER ---
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

module.exports = app;
