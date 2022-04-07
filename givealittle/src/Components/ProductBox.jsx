import './Product.css'
import React from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ProductBox(props) {
  return (
    <Card className="box">
      <Card.Title>{props.title}</Card.Title>
      <Card.Img variant="top" src={`${props.image}`} alt={props.title} />
      <Card.Body>
        <ListGroup>
          <ListGroup.Item>Category: {props.cat}</ListGroup.Item>
          <ListGroup.Item>{props.price}</ListGroup.Item>
          <ListGroup.Item>
            <Link to={`/product/${props.id}`}>
              <Button className='productBox-button'>Order Now</Button>
            </Link>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
      {' '}
    </Card>
  )
}

export default ProductBox