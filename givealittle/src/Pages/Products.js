import './Product.css'
import React from 'react'
import { Container, Row, Col, Button, Card, ListGroup } from 'react-bootstrap'
import mockAPI from './mockAPI'
import { Link } from 'react-router-dom'

function Products() {
  const renderProduct = (product, index) => {
    return (
      <div id='products'>
        <div class='a-container' key={index}>
        <Card className="box">
            <Card.Title>{product.title}</Card.Title>
            <Card.Img variant="top" src={`${product.url}`} alt={product.title} />
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>Category: {product.cat}</ListGroup.Item>
                <ListGroup.Item>{product.price}</ListGroup.Item>
                <ListGroup.Item>
                  <Link to={`/product/${product.id}`}>
                    <Button className='productBox-button'>Order Now</Button>
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
            {' '}
          </Card>
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