const express = require('express');
const ApiResponse = require('./core/ApiResponse');
const {ApiError, BadRequestError, NotFoundError} = require('./core/ApiError');

const app = express();

app.use(express.json());

// Gist doc - https://docs.github.com/en/rest/gists/gists?apiVersion=2026-03-10

const products = [
    {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    },
    {
        "id": 2,
        "title": "Mens Casual Premium Slim Fit T-Shirts ",
        "price": 22.3,
        "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    },
    {
        "id": 3,
        "title": "Mens Cotton Jacket",
        "price": 55.99,
        "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    },
    {
        "id": 4,
        "title": "Mens Casual Slim Fit",
        "price": 15.99,
        "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    },
    {
        "id": 5,
        "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        "price": 695,
        "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    }
];

// Get All the products
app.get('/products', (req, res) => {
    res.json(ApiResponse.build('success', 'all products', products));
});

// Create a Product
app.post('/products', (req, res) => {
    const { title, price, description } = req.body;

    if (!title) {
        throw new BadRequestError('Title can not be empty.'); 
    }
    if(!price) {
        throw new BadRequestError('Price can not be empty.');
    }
    // create a new product
    const newProduct = { title, price, description, id: products.length + 1 };
    products.push(newProduct);
    res.status(201).json(ApiResponse.build('success', "Product created successfully", newProduct));
});

// Get a single product
app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find((product) => product.id === parseInt(id));

    if(!product) {
        throw new NotFoundError('Product with the id does not exist.')
    }

    // this will throw a reference error (sort of internal error, not an APi error)
    if(true) {
        console.log(a);
        let a  =100;
    }
    res.json(ApiResponse.build('success', 'Single Product', product));
});

// Update a product - Homework
app.patch('/products/:id', (req, res) => {
    const { title, price, description } = req.body;
    const { id } = req.params;
    const product = products.find((product) => product.id === parseInt(id));

    // update
    product.title = title;
    product.price = price;
    product.description = description;

    res.json(ApiResponse.build('success', 'Product updated successfully', product));
});

// Delete a product
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const index = products.findIndex((product) => product.id === parseInt(id));
    products.splice(index, 1);
    res.json(ApiResponse.build('success', 'deleted the product successfully', null));
});

// custom error handler middleware
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        const {message = 'Something went wrong', status = 500} = err;
        res.status(status).json(ApiResponse.build('failed', message, null));
    }

    // you can place some alerting mechanism, or may be loggin to datadog etc
    // alertClient.sentAlert({err})
    return res.status(500).json(ApiResponse.build('failed', 'Best minds woorking on it!', null));
    
});
app.listen(3000, () => {
    console.log('server started at port 3000');
});


