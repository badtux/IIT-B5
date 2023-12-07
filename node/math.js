const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const math = require('./arith');

const n1 = 10;
const n2 = 20;

//console.log(`Sum is ${math.add(n1, n2)}`);

const mydb = new sqlite3.Database('campus.db', (err) => {
    if(err){
        console.error('Error starting db '+err.message);
    }
    else {
        mydb.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                country TEXT
            )`
        );
    }
});

const myapp = express();

myapp.set('view engine', 'ejs');
myapp.set('views', 'views');
myapp.use(express.static('public'));
myapp.use(bodyParser.urlencoded({ extended: true }));

myapp.post('/calc/add', (req,res) => {
    res.json({
        'msg' : 'This is post route'
    });
});

myapp.get('/', (req,res) =>{
    res.send('<html><body><h1>Hello '+req.query.name+'!</h1></body></html>');
});
 
myapp.get('/students/199', (req,res) => {
    res.render('student', { 
        fullName: 'Barak Obama',
        country: 'US',
        status: 'Retired'
    });
});

myapp.get('/register', (req,res) => {
    res.render('signup');
});

myapp.post('/signup', (req,res) => {
    //console.log(req.body); 
   const { name, country } = req.body;
   const regeion = country;
   function insertData(err){
        if (err) {
            // console.error('Error inserting data into the database:', err.message);
            res.send('Error submitting the form. '+err.message);
        } else {
            // console.log('Data inserted successfully');
            // res.send('Form submitted successfully!');
            console.log(country + ' ' +regeion);
            var nextForm = 'europe.html'; 
            if(country == 'China') { 
                nextForm = 'asia.html'; 
            }

            res.json({
                status: true,
                message : 'Registration is confirmed!',
                redirect : nextForm
            });
        }
   }

   mydb.run('INSERT INTO users (name, country) VALUES (?, ?)', [name,country], insertData);
});

myapp.delete('/calc/add', (req,res) => {
    res.json({
        'msg' : 'This is del route'
    });
});

myapp.get('/list-registrations', (req, res) => {
    mydb.all('SELECT id, name, country FROM users WHERE name IS NOT NULL', [], (err, data) => {
        // if (err) {
        //     throw err;
        // }
        console.log(data);

        res.render('registrations', {
            registrations: data
        });
    });
});

myapp.get('/calc/add', (req, res) => {
    //console.log(req);
    res.json({
        'out': math.add(parseFloat(req.query.a), parseFloat(req.query.b))
    });
});

const port = 3030;
myapp.listen(port, () => {
    console.log('Calc serve started');
});