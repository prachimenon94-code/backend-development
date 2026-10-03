const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs'); app.set('views', path.join(__dirname, 'views')); app.use(express.static('public')); app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => res.render('index', { title: 'Express and EJS', message: 'Server-side rendered with Express and EJS.' }));
app.post('/greet', (req, res) => res.render('index', { title: 'Express and EJS', message: `Hello, ${req.body.name || 'Student'}!` }));
app.listen(PORT, () => console.log(`Experiment 12A running at http://localhost:${PORT}`));
