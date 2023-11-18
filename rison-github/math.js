const express = require('express');
const math = require('./arithmetic');
const n1 = 10;
const n2 = 20;
//console.log(`Sum is ${math.add(n1, n2)}`);
const myapp = express();
myapp.get('/calc/add', (req, res) =>
{
    //console.log(req);
    res.json(
        {
            'out': math.add(parseFloat(req.query.a), parseFloat(req.query.b))
        }
    );
});
const port = 3030;
myapp.listen(port, () =>
{
    console.log('Calc serve started');
});