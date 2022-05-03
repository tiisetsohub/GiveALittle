import React from 'react';
import { useContext } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Home.css';
import './MakeTransaction.css';
import { CartContext } from '../Context'
import { NameContext, LoginContext ,CarddetailsContext} from '../Context'
import { connectFirestoreEmulator } from 'firebase/firestore';


export default function Payment() {
    const { cardno, setCardNo } = useContext(CarddetailsContext); 
    const [cartitems, setCartItems] = useState([])
    const { login, setLogin } = useContext(LoginContext)  
    const { cart, setCart } = useContext(CartContext);
    const { name, setName } = useContext(NameContext)
    let total = 0;   
    

        for (let i = 0; i < cart.length; i++) {
            const element = cart[i];
          total += element.Price;
        }
        total = total.toFixed(2);
        return (
        <div className="navbar">
            <Navbar />
            
            {cart.map(function(currentValue){
                return (
                    <div className="cartitemdiv-p">
                        <div className="cartleft">
                            <img src={currentValue.Image} className="pic" />
                        </div>
                        <div className="cartright">
                            <h6 className="cartid">{currentValue.Name}</h6>
                            <h6 className="cartpricep">R{currentValue.Price}</h6>
                        </div>
                    </div>)
            })}
        <div className="navbar">
            <text className='textin'>R{total}</text>
        </div>
        <div className='centre'>
          <text className='textin-p'>...{cardno.slice(5,11)}</text>
          <button className ="buttonin" >Check out</button>
        </div>
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