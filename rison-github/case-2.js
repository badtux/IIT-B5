//
// NOTE: VERY IMPORTANT INSTRUCTION 
// *** 
// Use postman app to send two parameteres named "age" and "gender" to the POST route '/submit'
// ***
//
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Bug 1: Missing body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Bug 2: 
app.get('/submit', (req, res) => {
    // Bug 3: 
    const { param1, param2 } = req.body;

    // Bug 4: 
    if (param1 && param2 === 'success') {
        // Bug 5: 
        res.send(`Success: ${param1} and ${param2}`);
    } else {
        res.send('Fail: Missing parameters or incorrect values');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});