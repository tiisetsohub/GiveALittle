import React from 'react';
import { useContext } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Home.css';
import './MakeTransaction.css';
import { CartContext } from '../Context'
import { NameContext, LoginContext ,CarddetailsContext, AddressContext} from '../Context'
import { connectFirestoreEmulator } from 'firebase/firestore';
import emailjs from 'emailjs-com'; // library used to send users emails
import Navigation from '../components/Navigation';

export default function Payment() {
    const { cardno, setCardNo } = useContext(CarddetailsContext); 
    const [cartitems, setCartItems] = useState([])
    const { login, setLogin } = useContext(LoginContext)  
    const { cart, setCart } = useContext(CartContext);
    const { name, setName } = useContext(NameContext)
    let total = 0;   
    const {address, setAddress} = useContext(AddressContext);
    let order = ""
    let NumcartItems = Object.getOwnPropertyNames(cart).length-1;         
    const [quantity, setQuantity] = useState(new Array(NumcartItems).fill(1));
    
  const itemRef = collection(db, "Bought"); 
  
        function update() {  //update the quantity of cart items relative to the user
          let len = NumcartItems;
          for (let i = 0; i < len; i=i+1)
            cart[i].Quantity = quantity[i];          
       }

      const addItems = async (Cart) => {           //handles adding an item to database
        await addDoc(itemRef, Object.assign({Buyer:name ,Cart}));      
      }
  
  
        function AddtoDatabase() {   // upload bought items to database
          update();
          console.log("added")
          let len = NumcartItems;
          for (let i = 0; i < len; i = i + 1){
            console.log(cart[i])
            addItems(cart[i])
          }
        }

        function Purchase(){   // a wrapper for the functions called when the user hits purchase button
          AddtoDatabase();
          sendemail()
        }
  

    
        function sendemail() {
          var userid = "Uhi73WxfmyePOs3wU"
          emailjs.init(userid);

 
          var details = {
            email: name // user email
                       /* data which will be needed from template may be extracted from here,
                         e.i ( name of user or subject of email)                   */  
          };

          emailjs.send('service_ew7io57', 'template_25ddejk', details).then(function (res) {
           alert("Item Bought Successfully");
          },
          reason => {
            alert("Error Occur");
          })
    
        }

          
        function onPlus(index) { //increments quantity
            let array = [...quantity];
            if (cart[index].Quantity > array[index]) {

              array[index] = array[index] + 1;
              setQuantity(array);
            }
            else {
               alert("maximum number of available items reached")
            }
          };


        function onMinus(index) { // decrements quantity
          let array = [...quantity];
          if (array[index] > 1) {
            array[index] = array[index] - 1;
            setQuantity(array);
          }
                    
        };
        function GetTotal(){
            for (let i = 0; i < cart.length; i++) {
                const element = cart[i];
                total += element.Price;
            }
            total = total.toFixed(2);
          return total
        }

        function totalPrice () {
           let total = 0
            for (let i = 0; i < cart.length; i++) {
                const element = cart[i];
                total += element.Price*quantity[i];
            }
            total = total.toFixed(2);
      
              return ( <>{total}</>);  
        }

        return (
          <div>
            
            <Navigation />
            <div className = "sumdiv">
              
              <h1 className="h1in">Summary</h1>
              <br />
              <h5>Items</h5>
              {cart.map(function (currentValue , index) {
                return (
                  <div className="cartitemdiv-p" >
                   
                    <div className="cartleft">
                      <img src={currentValue.Image} className="pic" />
                    </div>


                    <div className="cart-item-name ">
                      <h6 className="cartid">{currentValue.Name}</h6>
                      <h6 className="pricediv">R{currentValue.Price}</h6>
                    </div>
                    
                    <div className="cartright" >
                        <text className="itemquantity">Quantity</text>
                      <div className='btnclick'>

                        <button className="btndecrement" onClick={() => onMinus(index)} >-</button>
                                      {quantity[index]}
                        <button className="btncomplete" onClick={() => onPlus(index)}  >+ </button>
                      </div>  
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

                  <p></p>
                  <p>{cardno}</p>
                  <br/>
                  <br/>
                </div>
              </div>

              

            </div>



            <div className="totalbar">
              <text className='textin'>R{totalPrice()}</text>
              <Link className="btncomplete" to='/landing' onClick={Purchase}>Purchase
              </Link>
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