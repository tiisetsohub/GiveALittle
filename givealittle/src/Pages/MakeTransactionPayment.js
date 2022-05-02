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
import { Bars } from 'react-loading-icons';

export default function MakeTransactionPayment() {
    const [cartitems, setCartItems] = useState([])
    const [show, setShow] = useState(false);
    const [text, setText] = useState("hey");
    const [Inventory, setItems] = useState([]);
    const itemRef = collection(db, "Inventory");
    const { cart, setCart } = useContext(CartContext)


  return (
      <div>
           <Navbar />
      <Payment />
      <Bars />


      </div>
  )
}

function varified() {
      alert('Card details varified');
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
            <input className="input" id="input" placeholder="123" />
            <br />
            <div className='center-add-card '>
            <button className="buyttonin-add-card" onClick={varified} >Add card</button>
            </div>
            
            <br />

            <Link to='/payment'>
                <button className="buyttonin-cont-pay" >Continue to Check out</button>
            </Link> 

  

          </div>


    )
}






function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  return (
    <div className="navbar">
      <div className="leftside">
        <div className="links" id={showLinks ? "hidden" : ""}>
          <Link className="navlink" to="/landing">
            <p>Home</p>
          </Link>
          <Link className="navlink" to="/login">
            <p>About</p>
          </Link>
          <Link className="navlink" to="/login">
            <p>Contact</p>
          </Link>
        </div>
        <button onClick={() => setShowLinks(!showLinks)} className="btnthings">
          ≡
        </button>
      </div>
    </div>
  );
}