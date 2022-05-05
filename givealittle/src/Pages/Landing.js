import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, setDoc, updateDoc, doc } from "firebase/firestore";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Home.css';
import { CartContext } from '../Context'
import { BsStarFill } from "react-icons/bs";
import ReactStars from "react-rating-stars-component"


//identical to home.js


export default function Landing() {
    const [cartitems, setCartItems] = useState([])
    const [show, setShow] = useState(false);
    const [text, setText] = useState("hey");

    const [showReview, setShowReview] = useState(false);
    const [showRating, setShowRating] = useState(false);

    const [Inventory, setItems] = useState([]);
    const itemRef = collection(db, "Inventory");
    const { cart, setCart } = useContext(CartContext)

    // Variables for reviews
    let str = ""
    let rev = ""


    const AddReview = async (item, star, review) => {           //handles adding a review to database
        await setDoc(
            doc(db, "Inventory", item.id),
            {
                Review:  review,
                Stars: star
            },
            {merge: true}
        );
        alert("Review submitted")
    }

    

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
            return "5.0";
        }
        else{
           return average.toFixed(1); 
        }
        
    }

    // Function to put reviews in a list
    function review(reviews){
        const reviewList = reviews.toString().split("*");
        return reviewList
    }

    // Funtion that returns the numbe of reviews
    function reviewNumber(reviews){
        let counter = 0;
        let review = ""+reviews;
        for (let i = 0; i < review.length; i++){
            if (review[i] == '*'){
                counter++;
                console.log(i)

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
            return " " + counter.toString()+ " "
        }
    }
    

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

    function handleReviews(item) {
        const ratingChanged = (rating) => {
            str = ""+item.Stars+"*"+rating.toString()
        }
        setShowReview(true)
        setText(
            <div>
                <div className="item-container">
                    <button className="btnclose" onClick={() => {
                        setShowReview(false)
                        ProductView(item)
                    }}>Close</button>

                    <div>
                        <img style={{boxShadow: "0px 0px 10px 0px rgb(200, 200, 200)"}} src={item.Image} />
                    </div>
                    <h3>{item.Name}</h3>
                    <p>{item.Description}</p>

                    <div>
                        < ReactStars
                        size={30}
                        count={5}
                        isHalf={true}
                        onChange={ratingChanged}
                        />

                    </div>
                    
                    <input className="edtdesc" id="input" placeholder="Item Review" onChange={(event) => {
                        rev = item.Review+"*"+event.target.value
                        
                    }} />
                    
                    <div>
                    <button className="btnclose" onClick={() => {
                        AddReview(item, str, rev)
                        setShowReview(false)
                        ProductView(item)
                    }}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }

    function viewReviews(item){
        const comments = review(item.Review);
        const commentList = comments.map(comment => <h1>{comment}</h1>)
        setShowReview(true)
        setText(
            <div>
                <div className="item-container">
                    <button className="btnclose" onClick={() => {
                        setShowReview(false)
                        ProductView(item)
                    }}>Close</button>

                    <div>
                        <img style={{boxShadow: "0px 0px 10px 0px rgb(200, 200, 200)"}} src={item.Image} />
                    </div>
                    <h3>{item.Name}</h3>
                    <p>{item.Description}</p>
                    <div>{commentList}</div>
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
                    
                    <h3>{item.Name}</h3>
                    <p>{item.Description}</p>
                    <h1 className="product-view-price">R{item.Price}</h1>
                    <div>
                        <input type="number" className="edtnum" placeholder="1" min='0' max={item.Quantity} />
                        <button className="btnadd" onClick={() => handleCartItems(item)}>Add to cart</button>

                        <div>
                            <BsStarFill className="itemstarIcon"/>{avgStars(item.Stars)}
                            <Link  onClick={() => viewReviews(item)}>{reviewNumberIn(item.Review)}Reviews</Link>
                        </div>

                        {showReview ? <div className="reviewdiv">
                        {text}
                        </div> :
                        <button className="btnReview" onClick={() => handleReviews(item)}>Write a review</button>
                        }
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
                                <h1 className="itemstar"><BsStarFill className="itemstarIcon"/>{avgStars(item.Stars)}{reviewNumber(item.Review)}</h1>
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