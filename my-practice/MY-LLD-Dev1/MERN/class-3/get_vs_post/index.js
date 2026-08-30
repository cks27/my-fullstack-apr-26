const express = require('express');
const path = require('node:path');

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// console.log(__dirname)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname , 'index.html'));
});

app.get('/users', (req, res) => {
    console.log(req.query)
    res.send(`GET - Username: ${req.query.username}, Age: ${req.query.age}`);
    // res.send('you made a reques to get end point');
})

app.post('/users', (req, res) => {
    console.log(req.body)
    res.send(`POST - Username: ${req.body?.username}, Age: ${req.body?.age}`);
    // res.send('you made a reques to get end point');
})



app.listen(3000, () => {
    console.log('Server started at port 3000');
})