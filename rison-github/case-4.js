//
// NOTE: VERY IMPORTANT INSTRUCTION 
// *** 
// Make sure to have the following directory structure:
//
//      project-root
//      |-- public
//      |   |-- index.html
//      |   |-- page2.html
//      |   |-- styles.css
//      |   |-- script.js
//      |-- server.js
// 
// ***
//

const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Define the static path for static files (CSS, JS, HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to serve the linked HTML file (page2.html)
app.get('/page2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'page2.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});