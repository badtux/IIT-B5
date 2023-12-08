//
// NOTE: VERY IMPORTANT INSTRUCTION 
// *** 
// Use postman app to send the DELETE request. 
// Path should contain the record id. ex: /records/12  <- to delete record with id 12
// Use correct HTTP Method DELETE when using PPostman
// 
// ***
//
const express = require('express');
const sqlite3 = require('sqlite3');
const uuid = require('uuid');

const app = express();
const port = 3000;

// Connect to SQLite database (create a new one if not exists)
const db = new sqlite3.Database('sample.db');

// Create a table named 'records' if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS records (
    id TEXT PRIMARY KEY,
    data TEXT
  )
`);

// Populate the database with 100 random records
for (let i = 0; i < 100; i++) {
  const id = uuid();
  const data = `Sample Data ${i + 1}`;
  
  // Bug 1: 
  db.run('INSERT INTO records (id, values) VALUES (?, ?)', [id, data]);
}

// DELETE route to delete a record by ID
app.post('/records/:recordId', (req, res) => {
  const { recordId } = req.params;

  // Bug 2: 
  db.run('DELETE FROM records', function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    } else {
      // Bug 3: 
      res.status(204).send(`Record with ID ${recordId} deleted successfully`);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});