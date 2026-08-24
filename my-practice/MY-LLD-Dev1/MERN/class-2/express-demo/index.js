const express = require('express');

const app = express();

// console.log(app);

// express will execue this app.use for any incoming request
// app.use((req, res) => {
//     console.log('inside my app use');
//     res.send('Hello from server');
// })

app.get('/', (req, res) => {
    res.send('home route')
});

app.get('/cat', (req, res) => {
    res.send('cat route')
});

app.get('/login', (req, res) => {
    res.send('login route')
});

app.get('/users', (req, res) => {
    res.send('GET - users route')
});

app.post('/users', (req, res) => {
    res.send('post - users route')
});

app.get('/r/:subredit', (req, res) => {
    const {subredit} = req.params;
    res.send(`subredit: ${subredit}`);
})

app.get('/products', (req, res) => {
    const { sort ='ASC' } = req.query;
    res.send(`Listing products : ${sort}`);
})


app.listen(3000, () => {
    console.log('server started on port 3000')
})