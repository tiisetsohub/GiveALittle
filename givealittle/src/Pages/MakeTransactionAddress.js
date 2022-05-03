import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { NameContext, LoginContext } from '../Context'
import { CartContext } from '../Context';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Home.css';
import './MakeTransaction.css';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc } from "firebase/firestore";


export default function MakeTransactionAddress() {

    const { login, setLogin } = useContext(LoginContext)  
    const { cart, setCart } = useContext(CartContext);
    const { name, setName } = useContext(NameContext)
    const [newCountry, setNewCountry] = useState(""); 

    const [country, setCountry] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    
    const itemRef = collection(db, "address");            //refernce for item


    const addItem = async () => {           //handles adding an item to database
      await addDoc(itemRef, { Name: name, Country: country, Province: province, City: city, Street: street })
        
    }



    function Login() {
 
        console.log({login}  , {cart})
    }

  return (
      <div>
          < Navbar />
          <div className='container'>      {/*form containing all inputs for user*/}
            
            <text className="itemname"> Enter Address to proceed</text>   
            <br /> 
            <input className="edtemail" id="input"  placeholder="Country" onChange={(event) => {
                    setCountry(event.target.value)
            }}/> 
            <br />
            <input  className="edtpassword" id="input" placeholder="province"onChange={(event) => {
                    setProvince(event.target.value)
            }} />
            <br />
            <input className="edtemail" id="input"  placeholder="City" onChange={(event) => {
                    setCity(event.target.value)
            }}/>
            <br />
            <input className="edtemail" id="input" placeholder="street " onChange={(event) => {
                    setStreet(event.target.value)
            }}/>
            <br />
            <br />
            <button className="buttonin" onClick={addItem}>Confirm</button>
            <Link to='/maketransactionpayment'>
                <button className="buttonin" >Add Card details</button>
            </Link> 

          </div>
          
      </div>
    )


}



// function Address() {
//   const [country, setCountry] = useState("");
//   const [province, setProvince] = useState("");
//   const [city, setCity] = useState("");
//   const [street, setStreet] = useState("");
//     return (
//         <div className='container'>      {/*form containing all inputs for user*/}
            
//             <text className="itemname"> Enter Address to proceed</text>   
//             <br /> 
//             <input className="edtemail" id="input"  placeholder="Country" onChange={(event) => {
//                     setCountry(event.target.value)
//             }}/> 
//             <br />
//             <input  className="edtpassword" id="input" placeholder="province"onChange={(event) => {
//                     setProvince(event.target.value)
//             }} />
//             <br />
//             <input className="edtemail" id="input"  placeholder="City" onChange={(event) => {
//                     setCity(event.target.value)
//             }}/>
//             <br />
//             <input className="edtemail" id="input" placeholder="street " onChange={(event) => {
//                     setStreet(event.target.value)
//             }}/>
//             <br />
//             <br />
//             <Link to='/maketransactionpayment'>
//                 <button className="buttonin" >Add Card details</button>
//             </Link> 

//           </div>

//   )
// }

function Name() {

    return (
        <div className='container'>      {/*form containing all inputs for user*/}
            
          
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