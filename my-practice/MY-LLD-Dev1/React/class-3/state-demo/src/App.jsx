
import {v4 as uuid} from 'uuid';
import Product from './components/Product';
import './App.css';

const App = () => {
  const products = [
    {
      id: uuid(),
      name: "Macbook Pro",
      price: 100
    },{
      id: uuid(),
      name: "Macbook Air",
      price: 400
    },{
      id: uuid(),
      name: "Iphone",
      price: 200
    },{
      id: uuid(),
      name: "Airbuds",
      price: 150
    }
  ]

  
  return (
    <div>
      {
        products.map(product=> {
          return <Product 
            key={product.id}
            name={product.name}
            price={product.price}
          />
        })
      }
    </div>
  )
}

export default App