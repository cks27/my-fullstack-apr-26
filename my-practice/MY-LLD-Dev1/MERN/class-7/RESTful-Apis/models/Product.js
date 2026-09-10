const mongoose = require('mongoose');

// Defines the shape and validation rules for product documents in MongoDB.
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    price: {
        type: Number,
        min:[0, 'Price cannot be less than 0']
    },
    description: {
        type: String,
        maxLength: 500
    }
}, {
    // Omits Mongoose's internal __v field and adds createdAt/updatedAt fields.
    versionKey: false,
    timestamps: true
});

// Registers the schema as the Product collection model.
const Product = mongoose.model('Product', productSchema);

// Makes the model available to route handlers and other application modules.
module.exports = Product;
