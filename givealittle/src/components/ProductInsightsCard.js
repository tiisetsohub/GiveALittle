import React from 'react'
import { MdDelete, MdEdit, MdExpandMore, MdExpandLess } from 'react-icons/md';
import { useState, useEffect } from "react"
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebase-config';


/**
 * Shows data about a product in sellers inventory. 
 *  
 * Picture, Name, Price, In Stock items
 * 
 */

function ProductInsightsCard(product) {

    const [collapse, setCollapse] = useState(true);
    const [randNum, setRandNum] = useState(0);

    const deleteProduct = async () => {
        await deleteDoc(
            doc(db, "Inventory", product.productId),
            alert(product.name + " Deleted"),
            setRandNum(randNum + 1)
        )
        
      }
      

      useEffect(() => {       //loads data from database
        const getItems = async () => {
            const data = await getDocs(collection(db, "Inventory"));
            product.setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getItems()
    }, [randNum]);

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
            <button className="collapse-button" onClick={handleCollapse}>
                <MdExpandLess className='expand-less' style={{height: "30px", width: "30px"}} onClick={handleCollapse}/>
                <h5 className='more-info' onClick={handleCollapse}>more information</h5>
            </button>
            : <button className="collapse-button" onClick={handleCollapse}>
                <MdExpandMore className='expand-more' style={{height: "30px", width: "30px"}} onClick={handleCollapse}/>
                <h5 className='more-info' onClick={handleCollapse}>collapse</h5>
            </button>
        }
        </div>

        <div className='numbers-container'>
            <h5 className='name'>{product.name}</h5>
            <h6>Price:
                <h5 className='price'> R{product.price}</h5>
            </h6>
            <h6>
                {product.quantity == "0" ? 
                <h5 className='stock' style={{marginLeft: "0", color: "#C25450"}}>Out of Stock</h5>
                : 
                <h6>In Stock:
                  <h5 className='stock'>{product.quantity}</h5>
                </h6>

                }
            </h6>
            {/*<h5 className='sold'>Sold: 00</h5>*/}
        </div>

        
            
            <button className='delete-button' onClick={deleteProduct}>
                <MdDelete style={{width: "25px", height: "25px"}}/>
            </button>

            {/*<button className='edit-button'>
                <MdEdit style={{width: "25px", height: "25px"}}/>
            </button>*/}

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