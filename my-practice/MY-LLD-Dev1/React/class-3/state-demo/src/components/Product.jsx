import React from 'react'

const Product = (props) => {
  return (
    <article>
        <h4>Name: {props.name}</h4>
        <h5>Price: {props.price}</h5>
        <p>This is product details</p>
    </article>
  )
}

export default Product;