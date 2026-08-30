const express = require('express');
const ApiResponse = require('./core/ApiResponse');

const app = express();
app.use(express.json());

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

// list products
app.get('/products', (req, res) => {
    res.send(ApiResponse.build('success', 'All Products', products));
});

// add a product
app.post('/products', (req, res) => {
    const { title, price, description } = req.body;
    const newProduct = {
        id: products.length + 1,
        title,
        price,
        description
    }
    products.push(newProduct);

    res.status(201).json(ApiResponse.build('success', "Product created successfully", newProduct));
});

// get product by id
app.get('/products/:id', (req, res)=> {
  const { id } = req.params;
  const product = products.find(product => product.id === parseInt(id));
  res.json(ApiResponse.build('success', 'Single Product', product));
});

// update a product
app.patch('/products/:id', (req, res) => {
  const {id} = req.params;
  const {title, price, description} = req.body;
  const product = products.find(product => product.id === parseInt(id));

  product.title = title;
  product.price = price;
  product.description = description;

  res.json(ApiResponse.build('Success', 'Update successful', product));
})
// delete 
app.delete('/products/:id', (req, res) => {
  const {id} = req.params;
  const delIdx = products.findIndex(product => product.id === parseInt(id));
  products.splice(delIdx, 1);

  res.json(ApiResponse.build('Success', 'Deletion successful', null));
});

app.listen(3000, () => {
    console.log('Server started at port 3000');
})