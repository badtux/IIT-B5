// Import required modules
const express = require('express');
const path = require('path');

// Create an Express application
const app = express();
const port = 3000;

// Bug 1: 
app.get('/', (req, res) => {
    res.send('Hello, this is the root route!');
});

// Bug 2: 
app.use(express.static(__dirname + '/public'));

// Bug 3: 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Bug 4: 
// Remove the following line:
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });