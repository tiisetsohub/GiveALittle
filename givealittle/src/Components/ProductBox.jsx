import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ProductBox(props) {
  return (
    <div className='a-box'>
      <div className='a-b-img'>
        <h2>{props.title}</h2>
        <img src={`${props.image}`} alt='' />
      </div>
      <div className='a-b-text'>
        <Link to={`/product/${props.id}`}>
          <Button className='productBox-button'>Order Now</Button>
        </Link>
      </div>
      {' '}
    </div>
  )
}

export default ProductBox