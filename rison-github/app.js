const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Set up SQLite database
const db = new sqlite3.Database('calculator.db');

// Create table if not exists with an auto-incrementing id field
db.run('CREATE TABLE IF NOT EXISTS history (id INTEGER PRIMARY KEY AUTOINCREMENT, expression TEXT, result REAL)');

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  // Fetch history from the database
  db.all('SELECT * FROM history ORDER BY id DESC', (err, rows) => {
    res.render('index', { history: rows });
  });
});

app.post('/calculate', (req, res) => {
  const expression = req.body.expression;
  let result;

  try {
    result = eval(expression);
  } catch (error) {
    console.error(error);
    res.status(400).send('Invalid expression');
    return;
  }

  // Save the expression and result to the database
  db.run('INSERT INTO history (expression, result) VALUES (?, ?)', [expression, result]);

  res.redirect('/');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});