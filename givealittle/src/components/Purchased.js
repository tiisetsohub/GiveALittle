import React from 'react'
/**
 * Shows data about a product in sellers inventory. 
 *  
 * Picture, Name, Price, Delivery
 * 
 */

function Purchased(product) {
  return (
    <div>

        <div className='card-container'>

            <div className='image-container'>
                <img className='card-image' alt='' src={product.image}></img>
                {/*<button className='edit-button'>edit</button> */}
            </div>
            

            <div className='card-details-container'>
                
                <h4 className='card-name'>{product.name}</h4>
                <h5 className='card-price'> R {product.price}</h5>

                <div>
                    <h6 className='card-delivery'>Current Location: {product.location} </h6>
                </div>

            </div>

        </div>

    </div>
  )
}

export default Purchased