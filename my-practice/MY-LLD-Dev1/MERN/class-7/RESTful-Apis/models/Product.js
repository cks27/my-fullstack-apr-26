const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: String,
    price: Float16Array,
    description: String
})