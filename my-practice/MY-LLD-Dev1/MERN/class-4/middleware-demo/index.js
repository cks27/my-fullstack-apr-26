const express = require('express');
const app = express();

/*
    In Express.js, app.use() registers middleware that runs for incoming requests.

    app.use(express.json());        // Parse JSON request bodies
    app.use('/api', apiRoutes);     // Apply routes under /api
    app.use(cors());                // Enable CORS
    app.use(express.static('public')); // Serve static files

    Middleware can inspect or modify req/res, end the response, or call next() to continue to the next handler.
*/
app.use((req, res, next) => {
    //console.log(req.method)
   // console.log('inside my first middleware');
    next();
});

app.get('/', (req, res) => {
    res.send('hello from server')
})

app.listen(3000, () => {
    console.log('Server started at 3000');
});