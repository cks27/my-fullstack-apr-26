import React, {useState} from 'react'

const Product = (props) => {
  const [name, setName] = useState(props.name);
  const productClickHandler = () => {
    setName('Anonymous');
    console.log(name)
  }
  return (  
    <article onClick={productClickHandler}>
        <h4>Name: {name}</h4>
        <h5>Price: {props.price}</h5>
        <p>This is product details</p>
    </article>
  )
}

export default Product;