import React from 'react'
import { Link } from 'react-router-dom';
import {useState} from 'react'
import { CgProfile } from 'react-icons/cg';


function Navigation() {

    const [showLinks, setShowLinks] = useState(false);


    return (
        <div className="navbar">
            <div className="leftside">
                <div className="links" id={showLinks ? "hidden" : ""}>
                    <Link className="profile-icon" to='/profile'>
                        <CgProfile className='profile-icon' />
                    </Link>

                    <Link className="navlink" to='/sellerslanding'>
                        <p>Sell</p>
                    </Link>

                    <Link className="navlink" to='/landing'>
                        <p>Home</p>
                    </Link>

                    <Link className="navlink" to='/about'>
                        <p>About</p>
                    </Link>

                    <Link className="navlink" to='/contact'>
                        <p>Contact</p>
                    </Link>
                    <Link className="navlink" to="/track">
                        <p> MyOrders</p>
                    </Link>
                </div>
                <button onClick={() => setShowLinks(!showLinks)} className="btnthings">
                    ≡
                </button>
            </div>
        </div>
    )
}

export default Navigation