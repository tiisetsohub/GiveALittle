import React from 'react'

/**
 * Shows data about a product in sellers inventory. 
 *  
 * Picture, Name, Price, In Stock items
 * 
 */

function ProductInsightsCard(product) {

    return (

    <li className='card'>

        
        <img className='card-image' alt='' src={product.image}></img>
        

        <div className='info-container'>
            <h5 className='name'>{product.name}</h5>
            <button className='delete-button'>Delete</button>
            <button className='edit-button'> Edit</button>
            <h6 className='description'>{product.description}</h6>

            <div className='numbers-container'>
                <h5 className='price'>Price: R{product.price}</h5>
                <h5 className='stock'>In Stock: {product.quantity}</h5>
                <h5 className='sold'>Sold: 00</h5>
            </div>
            
        </div>
        
        
        
    </li>
    )
  
  
}

export default ProductInsightsCard