import React, { useState } from 'react'
import { Button, Col, Container,ListGroup, Row } from 'react-bootstrap'
import mockAPI from './mockAPI'
import { useParams } from 'react-router-dom'

function ProductView(props) {
    const {id} = useParams()
    
    //authentication
    const [userName, setUsername] = useState('')
    const [loggedIn, setLLoggedIn] = useState(false)
    //add authentication verification here
    
    const productObj = mockAPI.filter(product => product.id === id)
    console.log(productObj[0].menu)
    // ingredients
    const menuItems = productObj[0].menu
    const ingredients = menuItems.map((ingredient) => <ListGroup.Item>{ingredient}</ListGroup.Item>)
    return (
        <Container fluid>
            {productObj.map(product => (
                <Row>
                <h1>{product.name}</h1>
                {console.log}
                    <Col md={5}>
                        <div className='side a-box'>
                            <div className='a-b-img'>
                                <img src={`${product.url}`} alt='' />
                            </div>

                            <div className='a-b-text'>
                                <h2>{props.title}</h2>
                                <Button variant = "warning" className='productBox-button'>Add to Cart</Button>
                            </div>
                        </div>
                    </Col>
                    {/* nothing here, just to give space */}
                    <Col md = {3}></Col>
                    <Col md={4}>
                        <h3>Ingredients</h3>
                        {ingredients}
                    </Col>
                </Row>
            ))}
        </Container>
    )
}

export default ProductView