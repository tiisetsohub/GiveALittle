import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Home.css';
import './MakeTransaction.css';


export default function MakeTransactionAddress() {


  return (
      <div>
          <div className="navbar">
              <div className="leftside">
                  <div className="links">
                      <Link className="navlink" to='/'>
                          <p>Home</p>
                      </Link>
                      <Link className="navlink" to='/About'>
                          <p>About</p>
                      </Link>
                      <Link className="navlink" to='/Login'>
                          <p>Contact</p>
                      </Link>
                  </div>
              </div>
          </div>
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
              <input className="edtemail" id="input"  placeholder="street" />

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

          </div>


    )
}

