import './Product.css'
import React from 'react'
import ProductBox from './ProductBox'
import mockAPI from './mockAPI'

function Products() {
  const renderProduct = (product, index) => {
    return (
      <div id='products'>
        <div class='a-container' key={index}>
          <ProductBox
            image={product.url}
            title={product.name}
            cat={product.cat}
            price={product.price}
            id={product.id} />
        </div>
      </div>
    )
  }
  return (
    <div>
      <h1>CHOOSE & ENJOY</h1>
      <p>Life is hard enough already. Let us make it a little easier. Online shopping. Simple</p>
      <div className="grid">{mockAPI.map(renderProduct)}</div>
    </div>
  )
}

export default Products