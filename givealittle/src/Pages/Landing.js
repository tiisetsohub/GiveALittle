import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Home.css';
import { CartContext } from '../Context'
import { NameContext } from '../Context';
import { CgProfile } from 'react-icons/cg';

//identical to home.js


export default function Landing() {
    const [cartitems, setCartItems] = useState([])
    const [show, setShow] = useState(false);
    const [text, setText] = useState("hey");
    const [Inventory, setItems] = useState([]);
    const itemRef = collection(db, "Inventory");
    const { cart, setCart } = useContext(CartContext)
    const {name, setName} = useContext(NameContext);
    const [Users, setUsers] = useState([]);


    useEffect(() => {
        const getUsers = async () => {
          const data = await getDocs(collection(db, "Users"));
          setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getUsers()
      }, []);

    function Navbar() {
        const [total, setTotal] = useState(0);
        const [showLinks, setShowLinks] = useState(false);
        const [showcart, setShowCart] = useState(false);
        const [summary, setSummary] = useState("")
        let t = 0

        function CartView() {

            setShowCart(!showcart)
            setSummary(
                cartitems.map(function (currentValue, index, array) {
                    return index >= 0 ? <div className="cartitemdiv">
                        <div className="cartleft">
                            <img src={currentValue.Image} className="pic" />
                        </div>
                        <div className="cartright">
                            <h6 className="cartid">{currentValue.Name}</h6>
                            <h6 className="cartpricep">R{currentValue.Price}</h6>
                        </div>
                    </div> : null
                })
            )

            for (let i = 0; i < cartitems.length; i++) {
                const element = cartitems[i];
                t += element.Price

            }
            t = t.toFixed(2)

            setTotal(t)

        }
        return (
            <div>
                <div className="navbar">
                    <div className="leftside">
                        <div className="links" id={showLinks ? "hidden" : ""}>
                            <Link className="profile-icon" >
                                <CgProfile className='profile-icon'/>
                            </Link>
                            
                            <Link className="navlink" to='/sellerslanding'>
                                <p>Sell</p>
                            </Link>
                            <Link className="navlink" to='/about'>
                                <p>About</p>
                            </Link>
                            <Link className="navlink" to='/login'>
                                <p>Contact</p>
                            </Link>
                            <Link className="navlink" to='/track'>
                                <p>Track order</p>
                            </Link>
                            <Link className="navlink" onClick={() => {
                                CartView()
                            }}>
                                <p>Cart</p>
                            </Link>
                            
                        </div>
                        <button onClick={() => setShowLinks(!showLinks)} className="btnthings">
                            ≡
                        </button>
                    </div>
                    <div className="rightside">
                        <input className="edtsearch" placeholder="Search" />
                        <button className="btnsearch">
                            Search
                        </button>
                    </div>

                </div>
                {
                    showcart ? <div className="cartdiv">
                        {summary}
                        <div className="demodiv">
                            <text className='textin'>R{total}</text>
                            <Link  to='/maketransactionaddress'>
                                <button className ="buttonin" >Check out</button>
                            </Link>  
                        </div>
                    </div> : null
                }
            </div>
        )
    }


    useEffect(() => {
        const getItems = async () => {
            const data = await getDocs(itemRef);
            setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getItems()
    }, []);

    function handleCartItems(item) {
        setCartItems(prev => {
            return cartitems.includes(item) ? prev : [...prev, item];
        })

        alert('Item added to cart');

    }

    useEffect(() => {
        setCart(cartitems)
    }, [cartitems])


    function ProductView(item) {
        setShow(true)
        setText(
            <div>
                <div className="item-container">
                    <button className="btnclose" onClick={() => setShow(false)}>Close</button>

                    <div>
                        <img style={{boxShadow: "0px 0px 10px 0px rgb(200, 200, 200)"}} src={item.Image} />
                    </div>
                    {Users.map((user, index) => (
                        user.Email == item.Seller
                    ? (
                        <p key={index}>Sold By : {user.Name}</p>
                    )
                    : null
                    ))}
                    

                    <h3>{item.Name}</h3>

                    <h1 className="product-view-price">R{item.Price}</h1>


                    <p>{item.Description}</p>


                    {item.Specs != undefined ?
                    <h4 className='table-title'>Product Specifications</h4>
                    : <h4></h4>
                    }
                    
                    
                    {item.Specs != undefined ? 
                        
                    item.Specs.map((spec, index) => {
                        return (
                            <div className='spec-container' style={{marginBottom: "0"}} key={index}>
                                <h6 className='spec-name' style={{marginBottom: "0"}}>{spec.spec}</h6>
                                <h6 className="spec-detail" style={{marginBottom: "0"}}>{spec.detail}</h6>
                            </div>
                        )
                    })

                    : <h1></h1>}
                    


                    <div className="add-to-cart">
                        <input type="number" className="edtnum" placeholder="1" min='0' max={item.Quantity} />
                        <button className="btnadd" onClick={() => handleCartItems(item)}>Add to cart</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Navbar />
            {
                show ? <div className="reviewdiv">
                    {text}
                </div> :
                    <div className="bodydiv" >
                        {Inventory.map((item, index) => {

                            
                            return <div key={index} className="itemdiv" onClick={() => {
                                ProductView(item)
                            }}>
                                <img src={item.Image} alt="nope" />
                                <div className="textdiv">
                                    <h1 className="itemname">{item.Name}</h1>
                                </div>
                                <h1 className="itemprice">R{item.Price}</h1>
                                {(() => {
                                    if (item.Quantity == 0) {
                                    return (
                                        <h1 style={{fontWeight: "bold", color: "#B38B59"}} className="item-quantity">sold out</h1>
                                    )
                                    } else {
                                    return (
                                        <h1 className="item-quantity">in stock</h1>
                                    )
                                    }
                                })()}
                            </div>
                        })}
                    </div>
            }

        </div>
    );

}