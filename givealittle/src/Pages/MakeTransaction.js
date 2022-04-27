import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Home.css';
import './MakeTransaction.css';


export default function MakeTransaction() {


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
          <Payment />


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
              <br />
              <input className="edtemail" id="input" placeholder="Country" />
          </div>

  )
}

function Payment() {
    return (
          <div className='container'>      {/*form containing all inputs for user*/}
              <text className="itemname" > Add Card</text>   
              <br />
              <text>Card number</text>
              <input className="edtemail" id="input"  placeholder="Card" />
              <br />
              <br />
              <text>Exp. Date </text>
              <input className="edtemail" id="input"  placeholder="MM/YY" />
              <br />
              <br />
              <text>CVV</text>
              <input className="edtemail" id="input"  placeholder="123" />
              <br />

          </div>


    )
}

