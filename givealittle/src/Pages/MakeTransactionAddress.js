import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { NameContext, LoginContext } from '../Context'
import { CartContext } from '../Context';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Home.css';
import './MakeTransaction.css';

function MakeTransactionAddress() {

    const { login, setLogin } = useContext(LoginContext)  
    const { cart, setCart } = useContext(CartContext);
    const { name, setName } = useContext(NameContext)

    const arr = ["comment", 5];



    function Login() {
 
        console.log({login} ,{name} , {cart})
    }

  return (
      <div>
          <Navbar/>
          <Address />
      </div>
    )


}



function Address() {
    return (
        <div className='container'>      {/*form containing all inputs for user*/}
            
            <text className="itemname"> Enter Address to proceed</text>   
            <br /> 
            <input className="edtemail" id="input"  placeholder="Country" />
            <br />
            <input type="password" className="edtpassword" id="input" placeholder="province" />
            <br />
            <input className="edtemail" id="input"  placeholder="City" />
            <br />
            <input className="edtemail" id="input" placeholder="street " />
            <br />
            <br />
            <Link to='/maketransactionpayment'>
                <button className="buttonin" >Add Card details</button>
            </Link> 

          </div>

  )
}

function Name() {

    return (
        <div className='container'>      {/*form containing all inputs for user*/}
            
          
        </div>


    )
}

function refreshPage() {
    window.location.reload(false);
  }

function Navbar() {
    const [showLinks, setShowLinks] = useState(false);
    return (
        <div className="navbar">
            <div className="leftside">
                <div className="links" id={showLinks ? "hidden" : ""}>
                    <Link className="navlink"  onClick={() => {window.location.href="/landing"}}>
                        <p>Home</p>
                    </Link>
                    <Link className="navlink" onClick={() => {window.location.href="/login"}}>
                        <p>About</p>
                    </Link>
                    <Link className="navlink" onClick={() => {window.location.href="/login"}}>
                        <p>Contact</p>
                    </Link>
                </div>
                <button onClick={() => setShowLinks(!showLinks)} className="btnthings">
                    ≡
                </button>
            </div>
        </div>
    )
  }

export default MakeTransactionAddress;



