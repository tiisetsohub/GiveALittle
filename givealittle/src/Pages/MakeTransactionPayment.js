import React from 'react';
import { NameContext, LoginContext ,CarddetailsContext } from '../Context'
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
    const { name, setName } = useContext(NameContext)
      const { cardno, setCardNo } = useContext(CarddetailsContext);        //global context for name

    const [cardnumber, setCardNumber] = useState("");
    const [Expiredate, setExpiredate] = useState("");
    const [cvv, setCVV] = useState("");
    
    const itemRef = collection(db, "CardDetails");            //refernce for item
    const addItem = async () => {           //handles adding an item to database
      await addDoc(itemRef, { Name: name, CardNumber: cardnumber, CVV: cvv ,ExpireDate:Expiredate })
    }

   return (
      <div>
           <Navbar />
           <div className='container'>      {/*form containing all inputs for user*/}
            <text className="itemname" >Add Card</text>
            <br />
            
            <text className='payement-text-cardno' >Card No.</text>
            <input className="input" id="input" placeholder="Card" onChange={(event) => {
                    setCardNumber(event.target.value)
                    setCardNo(event.target.value)
            }}/>
            <br />          
            <br />
            <text   className='payement-text-expdate'>Exp.Date </text>
            <input className="input" id="input"  placeholder="MM/YY" onChange={(event) => {
                    setExpiredate(event.target.value)
            }}/>
            <br />
            <br />
            <text  className='payement-text-cvv'>CVV</text>
            <input className="input" id="input" placeholder="123" onChange={(event) => {
                    setCVV(event.target.value)
            }}/>
            <br />
            <div className='center-add-card '>
            <button className="buyttonin-add-card" onClick={addItem} >Add card</button>
            </div>
            
            <br />

            <Link to='/payment'>
                <button className="buyttonin-cont-pay" >Continue to Check out</button>
            </Link>
            
          </div>     

      </div>
  )
}

function varified() {
      alert('Card details varified');
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