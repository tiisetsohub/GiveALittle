import React from 'react';
import { useContext, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Home.css';
import './MakeTransaction.css';
import { CartContext } from '../Context'
import { NameContext, LoginContext ,CarddetailsContext, AddressContext} from '../Context'
import { connectFirestoreEmulator } from 'firebase/firestore';
import emailjs from 'emailjs-com'; // library used to send users emails
import { Redirect } from 'react-router-dom';

export default function Payment() {
    const { cardno, setCardNo } = useContext(CarddetailsContext); 
    const [cartitems, setCartItems] = useState([])
    const { login, setLogin } = useContext(LoginContext)  
    const { cart, setCart } = useContext(CartContext);
    const { name, setName } = useContext(NameContext)
    let total = 0;   
    const { address, setAddress } = useContext(AddressContext);

   
    function sendemail() {
      var userid = "Uhi73WxfmyePOs3wU"
      emailjs.init(userid);

 
          var details = {
            email: name  // user email
                         /* data which will be needed from template may be extracted from here,
                         e.i ( name of user or subject of emaik)
                         */
      
        };

        emailjs.send('service_ew7io57', 'template_25ddejk', details).then(function (res) {
          alert("Purchase successful");

        },
          reason => {
            alert("Error Occur");
          })
    
    }

        for (let i = 0; i < cart.length; i++) {
            const element = cart[i];
          total += element.Price;
        }
        total = total.toFixed(2);
        return (
        <div>
            <Navbar />
            <div className = "sumdiv">
              <h1 className="h1in">Summary</h1>
              <br />
              <h5>Items</h5>
              {cart.map(function (currentValue) {
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
              <h5 className="h1in">Address</h5>
              <div className="addressdiv">
                <img src="https://www.seekpng.com/png/full/118-1180099_png-file-house-home-icon.png" />
                <div>

                  <p>{address.Country}</p>
                  <p>{address.Province}</p>
                  <p>{address.City}</p>
                  <p>{address.Street}</p>
                </div>
              </div>

              <h5 className="h1in">Card Details</h5>
              <div className="addressdiv">
                <img src="https://cdn-icons-png.flaticon.com/512/60/60378.png?w=1380&t=st=1651582181~exp=1651582781~hmac=7e16d4933aefb967e8f5585cd86d6926305e5738b2f3c72b58dc93b4c9dc1c1d" />
                <div>
                  <p>{cardno}</p>
                  <p>1xx</p>
                </div>
              </div>

              

            </div>



            <div className="totalbar">
              <text className='textin'>R{total}</text>
              <button className="btncomplete" onClick={sendemail}>Purchase</button>
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