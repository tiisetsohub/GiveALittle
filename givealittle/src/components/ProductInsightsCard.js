import React from 'react'

/**
 * Shows data about a product in sellers inventory. 
 *  
 * Picture, Name, Price, In Stock items
 * 
 */

function ProductInsightsCard(product) {
  return (
    <div>

        <div className='card-container'>

            <div className='image-container'>
                <img className='card-image' alt='' src={product.image}></img>
                {/*<button className='edit-button'>edit</button>*/}
                {/*<button className='delete-button'>delete</button>*/}
            </div>
            

            <div className='card-details-container'>
                
                <h4 className='card-name'>{product.name}</h4>
                <h5 className='card-price'>R {product.price}</h5>

                <div>
                    <h6 className='card-quantity'>In Stock: {product.stock}</h6>
                    <h6 className='card-sold'>Sold: {product.sold}</h6>
                </div>

            </div>

        </div>

    </div>
  )
}

export default ProductInsightsCard