const express = require('express');

const app = express();

app.get('/hello', (req, res) => {
    if (true) {
        throw new Error('This is delibrate error');
    }
    res.send('Hello from server')
})

app.listen(3000, () => {
    console.log('server running on 3000');
})