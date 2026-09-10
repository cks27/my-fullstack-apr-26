const express = require('express');
const ApiResponse = require('./core/ApiResponse');
const {ApiError, BadRequestError, NotFoundError} = require('./core/ApiError');
const mongoose = require('mongoose');
const Product = require('./models/Product')

const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/products-db')
    .then(() => console.log('connection open!'))
    .catch((err)=> console.log(err))

// Gist doc - https://docs.github.com/en/rest/gists/gists?apiVersion=2026-03-10

// Get All the products
app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.json(ApiResponse.build('success', 'all products', products));
});

// Create a Product
app.post('/products', async (req, res) => {
    const { title, price, description } = req.body;

    if (!title) {
        throw new BadRequestError('Title can not be empty.'); 
    }
    if(!price) {
        throw new BadRequestError('Price can not be empty.');
    }
    // create a new product
   const newProduct = await Product.create({ title, price, description });

    res.status(201).json(ApiResponse.build('success', "Product created successfully", newProduct));
});

// Get a single product
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if(!product) {
        throw new NotFoundError('Product with the id does not exist.')
    }

    // this will throw a reference error (sort of internal error, not an APi error)
    // if(true) {
    //     console.log(a);
    //     let a  =100;
    // }
    res.json(ApiResponse.build('success', 'Single Product', product));
});

// Update a product - Homework
app.patch('/products/:id', async (req, res) => {
    const { title, price, description } = req.body;
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, {title, price, description}, {new: true});

    res.json(ApiResponse.build('success', 'Product updated successfully', product));
});

// Delete a product
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
   await Product.findByIdAndDelete(id);

    res.json(ApiResponse.build('success', 'deleted the product successfully', null));
});

// custom error handler middleware
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        const {message = 'Something went wrong', status = 500} = err;
        return res.status(status).json(ApiResponse.build('failed', message, null));
    }

    // you can place some alerting mechanism, or may be loggin to datadog etc
    // alertClient.sentAlert({err})
    console.log(err)
    return res.status(500).json(ApiResponse.build('failed', 'Best minds woorking on it!', null));
    
});
app.listen(3000, () => {
    console.log('server started at port 3000');
});


