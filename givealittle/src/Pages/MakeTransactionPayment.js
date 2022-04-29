import React from 'react';
import { useContext } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Home.css';
import './MakeTransaction.css';
import { CartContext } from '../Context'
import { connectFirestoreEmulator } from 'firebase/firestore';


export default function MakeTransactionPayment() {
    const [cartitems, setCartItems] = useState([])
    const [show, setShow] = useState(false);
    const [text, setText] = useState("hey");
    const [Inventory, setItems] = useState([]);
    const itemRef = collection(db, "Inventory");
    const { cart, setCart } = useContext(CartContext)


  return (
      <div>
  
          <div className="navbar">
              <div className="leftside">
                  <div className="links">
                      <Link className="navlink" to='/'>
                          <p>Home</p>
                      </Link>
                      <Link className="navlink" to='/about'>
                          <p>About</p>
                      </Link>
                      <Link className="navlink" to='/login'>
                          <p>Contact</p>
                      </Link>
                  </div>
              </div>
          </div>
          <Payment />


      </div>
  )
}

function Pay() {
    return (
        <div>

        </div>
      )
}






function Payment() {

    return (
          <div className='container'>      {/*form containing all inputs for user*/}
            <text className="itemname" > Add Card</text>
            <br />
            
            <text className='payement-text-cardno' >Card No.</text>
            <input className="input" id="input" placeholder="Card" />
            <br />
                
              
            <br />
            <text   className='payement-text-expdate'>Exp.Date </text>
            <input className="input" id="input"  placeholder="MM/YY" />
            <br />
             
            <br />
            <text  className='payement-text-cvv'>CVV</text>
            <input className="input" id="input"  placeholder="123" />
            <br />
            <br />
            <br />

            <Link to='/payment'>
                <button className="buyttonin-cont-pay" >Continue to Check out</button>
            </Link> 

  

          </div>


    )
}