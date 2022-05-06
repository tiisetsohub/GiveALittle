import React, { useContext  } from 'react';
import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Home.css';
import { CartContext } from '../Context'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { async } from '@firebase/util';

//identical to home.js


export default function Landing() {
    const [cartitems, setCartItems] = useState([])
    const [show, setShow] = useState(false);
    const [text, setText] = useState("hey");
    const [SellItems, setItems] = useState([]);
    const itemRef = collection(db, "SellItems");
    const { cart, setCart } = useContext(CartContext)


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
                            <img src={currentValue.Image1} className="pic" />
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
                            <Link className="navlink" to='/sellerslanding'>
                                <p>Sell</p>
                            </Link>
                            <Link className="navlink" to='/about'>
                                <p>About</p>
                            </Link>
                            <Link className="navlink" to='/login'>
                                <p>Contact</p>
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
                            <button className='buttonin'>Check out</button>
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


    const [current, setCurrent]=useState(0);
    function ProductView(item) {

        const imgs=[item.Image1, item.Image2, item.Image3];
        const length=imgs.length;
        

       /* const nextSlide = () => {
            setCurrent(current === length-1 ? 0 : current + 1);
        }; 

       

        const prevSlide = () => {
            setCurrent(current === 0 ? length-1 : current - 1);
        };

        /*if(!Array.isArray(imgs)||imgs.length<=0){
            return null;
        }*/
        console.log(current);
        setShow(true)
        setText(
           
           
            <div>
                <button className="btnclose" onClick={() => setShow(false)}>X</button>
               
            <div className="swiper" >
               
                {imgs.map((slide, index)=>{
                       return(
                           <div >
                               <img src={slide} className="image"/>
                           </div>
                       ) 
                   })}
            </div>
          


                <h3>{item.Name}</h3>
                <p>{item.Description}</p>
                <p>{item.Price}</p>
                <div>
                    <input
                        type="number"
                        className="edtnum"
                        placeholder="1"
                        min='1'
                        max={item.Quantity}
                    />
                    <button className="btnadd" onClick={() => handleCartItems(item)}>Add to cart</button>
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
                        {SellItems.map((item) => {

                            
                            return <div className="itemdiv" onClick={() => {
                                ProductView(item)
                            }}>
                                <img src={item.Image1} alt="nope"  />
                                <div className="textdiv">
                                    <h1 className="itemname">{item.Name}</h1>
                                </div>
                                <h1 className="itemprice">R{item.Price}</h1>
                            </div>
                        })}
                    </div>
            }

        </div>
    );

}