import React, { useContext } from "react";
import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Home.css';
import { CartContext } from '../Context';
import { LoginContext } from '../Context';
import { BsStarFill } from "react-icons/bs";
import { NameContext } from '../Context';


export default function Home() {
    const [cartitems, setCartItems] = useState([])      //state for local cart array
    const [show, setShow] = useState(false);            //state for showing cart
    const [text, setText] = useState("");                //state for product text
    const [Inventory, setItems] = useState([]);           //state for inventory
    const itemRef = collection(db, "Inventory");            //reference to inventory in database
    const { cart, setCart } = useContext(CartContext);          //context for global cart
    const { login, setLogin } = useContext(LoginContext) 
    const [Users, setUsers] = useState([]);

    const [showReview, setShowReview] = useState(false);

    

    // The following function count the average rating of each item (using stars)
    function avgStars(stars){
        let starCount = ""+ stars;
        let wholeSum = 0;
        let check = 0;

        for (let i = 0; i <starCount.length ; i++){
            if (starCount[i] == "*"){
                check++;
            }
            else{
                wholeSum = wholeSum + parseInt(starCount[i]);
            }
        }
        let average = wholeSum/(starCount.length-check);

        if (starCount.length == 0){
            return "5.0 ";
        }
        else{
           return average.toFixed(1).toString() +" "; 
        }
        
    }
    // Function to put reviews in a list
    function review(reviews){
        const reviewList = reviews.toString().split("*");
        return reviewList
    }

    // Funtion that returns the number of reviews
    function reviewNumber(reviews){
        let counter = 0;
        let review = ""+reviews;
        for (let i = 0; i < review.length; i++){
            if (review[i] == '*'){
                counter++;
            }
        }
        if (counter == 0){
            return ""
        }
        else{
            return " (" + counter.toString() + ")"
        }
    }
    function reviewNumberIn(reviews){
        let counter = 0;
        let review = ""+reviews;
        for (let i = 0; i < review.length; i++){
            if (review[i] == '*'){
                counter++;
                console.log(i)

            }
        }
        if (counter == 0){
            return " "
        }
        else{
            return counter.toString()+ " "
        }
    }
     // Reviews or Review or No Review
     function correctReview(reviews){
        let counter = 0;
        let review = ""+reviews;
        for (let i = 0; i < review.length; i++){
            if (review[i] == '*'){
                counter++;
            }
        }

        if (counter == 0){
            return "No reviews"
        }
        else if (counter == 1){
            return "Review"
        }
        else{
            return "Reviews"
        }
    }

    


    useEffect(() => {
        const getUsers = async () => {
          const data = await getDocs(collection(db, "Users"));
          setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getUsers()
      }, []);

    
    function Navbar() {         //function for navbar component
        const [quant, setQuant] = useState(0);      //to be used
        const [total, setTotal] = useState(0);         //state for cart total
        const [showLinks, setShowLinks] = useState(false);          //state for showing links
        const [showcart, setShowCart] = useState(false);            //state for showing cart
        const [summary, setSummary] = useState("")              //state for cart summary
        let t = 0           //total = 0

        
        let sum = 0 

        function CartView() {       //function to display the cart
            setShowCart(!showcart)          //changes show cart state

            setSummary(         //set summary to all items in cart array
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

            for (let i = 0; i < cartitems.length; i++) {            //set total price
                const element = cartitems[i];
                t += element.Price

            }
            t = t.toFixed(2)

            setTotal(t)     //changes total state to total price

        }

        return (
            <div>
                <div className="navbar">
                    <div className="leftside">
                        <div className="links" id={showLinks ? "hidden" : ""}>
                            <Link className="navlink" to='/login'>
                                <p>Login/Signup</p>
                            </Link>
                            <Link className="navlink" to='/about'>
                                <p>About</p>
                            </Link>
                            <Link className="navlink" to='/contact'>
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
                            
                            <Link  to='/maketransactionaddress'>
                                <button className ="buttonin" >Check out</button>
                            </Link>  
                        </div>
                    </div> : null
                }
           
            </div>

        )
    }





    useEffect(() => {       //loads data from database
        const getItems = async () => {
            const data = await getDocs(itemRef);
            setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getItems()
    }, []);

    function handleCartItems(item) {        //handles adding an item to the cart
        alert('Item added to cart')
        setCartItems(prev => {
            return cartitems.includes(item) ? prev : [...prev, item];
        })
    }

    useEffect(() => {           //updates the global cart to match the local cart
        setCart(cartitems)
    }, [cartitems])


    
    function viewReviews(item){
        const comments = review(item.Review);
        const commentList = comments.map(comment => <div className="indrev">{comment} </div>)
        setShowReview(true)
        setText(
            <div>
                <div className="item-container">
                    <button className="btnclose" onClick={() => {
                        setShowReview(false)
                        ProductView(item)
                    }}>Close Reviews</button>

                    <div>
                        <img style={{boxShadow: "0px 0px 10px 0px rgb(200, 200, 200)"}} src={item.Image} />
                    </div>
                    <h3>{item.Name}</h3>
                    <p>{item.Description}</p>
                    <br />
                    <div className="revdivin">
                        <h5>Reviews</h5>
                        <div className="revcomm">{commentList}</div>
                    </div>
                </div>
            </div>
        )
    }

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

                        <div className = "inprodstar">
                            <BsStarFill className="initemsstar"/>{avgStars(item.Stars)}
                            <Link  onClick={() => viewReviews(item)}>{reviewNumberIn(item.Review)}{correctReview(item.Review)}</Link>
                        </div>

                    </div>
                    <div>
                        
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
                        {Inventory.map((item) => {

                            
                            return <div className="itemdiv" onClick={() => {
                                ProductView(item)
                            }}>
                                <img src={item.Image} alt="nope" />
                                <div className="textdiv">
                                    <h1 className="itemname">{item.Name}</h1>
                                </div>
                                <h1 className="itemprice">R{item.Price}</h1>
                                <div className="itemstar"><BsStarFill className="sumstar" />     {avgStars(item.Stars)}{reviewNumber(item.Review)}</div>
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
