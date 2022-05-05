import React from 'react'
import { MdDelete, MdEdit, MdExpandMore, MdExpandLess } from 'react-icons/md';
import { useState } from "react"

/**
 * Shows data about a product in sellers inventory. 
 *  
 * Picture, Name, Price, In Stock items
 * 
 */

function ProductInsightsCard(product) {

    const [collapse, setCollapse] = useState(true);

    const handleCollapse = () => {
        if (collapse) {
            setCollapse(false);
        }else{
            setCollapse(true);
        }
    }


    return (

    <li className='card'>

        
        <img className='card-image' alt='' src={product.image}></img>

        <div>
            {collapse ? 
            <div>
                <MdExpandLess style={{height: "40px", width: "40px"}} onClick={handleCollapse}/>
            </div>
            : <div>
                <MdExpandMore style={{height: "40px", width: "40px"}} onClick={handleCollapse}/>
            </div>
        }
        </div>

        <div className='numbers-container'>
            <h5 className='name'>{product.name}</h5>
            <h6>Price:
                <h5 className='price'> R{product.price}</h5>
            </h6>
            <h6>In Stock:
                <h5 className='stock'>{product.quantity}</h5>
            </h6>
            {/*<h5 className='sold'>Sold: 00</h5>*/}
        </div>

        
            
            <button className='delete-button'>
                <MdDelete style={{width: "30px", height: "30px"}}/>
            </button>

            <button className='edit-button'>
                <MdEdit style={{width: "30px", height: "30px"}}/>
            </button>

                {!collapse ?
                    <div className='info-container'>
                        <h6 className='description'>{product.description}</h6>

                {product.specs != undefined ?
                    <h4 className='table-title' style={{textAlign: "center"}}>Product Specifications</h4>
                    : <h4></h4>
                    }
                    
                    
                {product.specs != undefined ? 
                        
                product.specs.map((spec, index) => {
                    return (
                        <div className='spec-container' style={{marginBottom: "0"}} key={index}>
                            <h6 className='spec-name' style={{marginBottom: "0"}}>{spec.spec}</h6>
                            <h6 className="spec-detail" style={{marginBottom: "0"}}>{spec.detail}</h6>
                        </div>
                    )
                })

                : <h1></h1>}
            </div>
                : <h1></h1>
            }
           
        
        
        
        
    </li>
    )
  
  
}

export default ProductInsightsCard