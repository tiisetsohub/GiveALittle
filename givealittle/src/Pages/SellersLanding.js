import React from 'react'
import ProductInsightsCard from '../components/ProductInsightsCard'
import '../components/SellersPage.css'
import {Link} from 'react-router-dom'
import { useState } from 'react';

function SellersLanding() {
  return (
    <div>

      <Navbar/>
      <div style={{textAlign: "center"}}>


      <Link to="/sell">
        <button className='add-product-button'>Add Product</button>
      </Link>
        
      </div>
        <ProductInsightsCard/>
    </div>
  )
}

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  return (
      <div className="navbar">
          <div className="leftside">
              <div className="links" id={showLinks ? "hidden" : ""}>
                  <Link className="navlink" to='/landing'>
                      <p>Home</p>
                  </Link>
                  <Link className="navlink" to='/login'>
                      <p>About</p>
                  </Link>
                  <Link className="navlink" to='/login'>
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

export default SellersLanding