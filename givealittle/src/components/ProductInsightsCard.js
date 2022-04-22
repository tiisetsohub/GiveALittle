import React from 'react'

/**
 * Shows data about a product in sellers inventory. 
 *  
 * Picture, Name, Price, In Stock items
 * 
 */

function ProductInsightsCard() {
  return (
    <div>

        <div className='card-container'>

            <div className='image-container'>
                <img className='card-image' alt='' src='https://t3.ftcdn.net/jpg/00/26/75/84/240_F_26758479_U7BAd8WtPxDze0lwC6HAr5a4RXm98npS.jpg'></img>
                {/*<button className='edit-button'>edit</button> */}
            </div>
            

            <div className='card-details-container'>
                
                <h2 className='card-name'>Product Name</h2>
                <h3 className='card-price'>R 500</h3>

                <div>
                    <h4 className='card-quantity'>In Stock: 45</h4>
                    <h4 className='card-sold'>Sold: 32</h4>
                </div>

            </div>

        </div>

    </div>
  )
}

export default ProductInsightsCard