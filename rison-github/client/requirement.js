const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const requirement = express();
const port = 3000;
requirement.use(bodyParser.urlencoded(
    {
        extended: true
    }
));
function createConnection()
    {
        return new sqlite3.Database('back.db');
    }
function createTable()
    {
        const connection = createConnection();
        connection.run(
            `
                CREATE TABLE IF NOT EXISTS users
                    (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        username TEXT NOT NULL,
                        password TEXT NOT NULL
                    )

            `
        );
        connection.close();
    }
createTable();
requirement.get('/', 
    (req, res) =>
        {
            res.render('sign');
        });
requirement.post('/submit', 
    (req, res) =>
        {
            const 
                {
                    username, password
                }
            = req.body;
            const connection = createConnection();
            connection.run('INSERT INTO users (username, password) VALUES (?, ?)', 
                            [username, password],
                            function(err)
                            {
                                if (err)
                                    {
                                        console.error(err.message);
                                        res.status(500).send('Internal Server Error');
                                    }
                                else
                                    {
                                        res.redirect('/');
                                    }
                            });
            connection.close();
        });
requirement.set('view engine', 'ejs');
requirement.set('constant', 'constant');
requirement.use(express.static('public'));
requirement.listen(port, () =>
    {
        console.log(`Server is running on http://localhost:${port}`);
    });