import './Product.css'
import React from 'react'
import ProductBox from './ProductBox'
import mockAPI from './mockAPI'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Container,
  Row,
  Col
} from 'reactstrap'


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
      {/* <div className="grid">{mockAPI.map(renderProduct)}</div> */}
      
      <Container>
        <Row xs = {3}>
          {mockAPI.map(renderProduct)}
        </Row>
      </Container>

    </div>
  )
}

export default Products