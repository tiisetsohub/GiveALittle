import React, { useContext, useRef } from 'react';
import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, setDoc, updateDoc, doc } from "firebase/firestore";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Home.css';
import { CartContext } from '../Context'
import { BsStarFill } from "react-icons/bs";
import ReactStars from "react-rating-stars-component"
import ReorderIcon from "@mui/icons-material/Reorder";
import { NameContext } from '../Context';
import { CgProfile } from 'react-icons/cg';
import Filter from '../components/Filter';
import { MdDelete, MdEdit, MdExpandMore, MdExpandLess, MdModeComment, MdOutlineComment, MdOutlineUnfoldMore, MdUnfoldLess } from 'react-icons/md';
import Category from '../components/Category';

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
    const { name, setName } = useContext(NameContext);
    const [Users, setUsers] = useState([]);

    const searchRef = useRef();
    const [searchTerm, setSearchTerm] = useState("");

    //States for all the products in different categories
    const [Books, setBooks] = useState([]);
    const [Baby, setBaby] = useState([]);
    const [Cellphones, setCellphones] = useState([]);
    const [Computers, setComputers] = useState([]);
    const [DIY, setDIY] = useState([]);
    const [Electronics, setElectronics] = useState([]);
    const [Fashion, setFashion] = useState([]);
    const [Groceries, setGroceries] = useState([]);
    const [Media, setMedia] = useState([]);
    const [Office, setOffice] = useState([]);
    const [Outdoor, setOutdoor] = useState([]);
    const [Sports, setSports] = useState([]);
    const [Wearables, setWearables] = useState([]);
    const [allCategories] = useState(["Books", "Baby", "Cellphones", "Computers", "DIY", "Electronics", "Fashion", "Groceries", "Media", "Office", "Outdoor", "Sports", "Wearables"])
    
    //contains all the category arrays
    const [allCategoryArrays] = useState([Books, Baby, Cellphones, Computers, DIY, Electronics, Fashion, Groceries, Media, Office, Outdoor, Sports, Wearables])
    //contains all the setters for the category arrays
    const [allSetters] = useState([setBooks, setBaby, setCellphones, setComputers, setDIY, setElectronics, setFashion, setGroceries, setMedia, setOffice, setOutdoor, setSports, setWearables]);

    //function for putting items in category
    const addToCategory = (category, setCategory) => {
        const categoryArray = [];
        for (let i in Inventory) {
            let product = Inventory[i]
            let productCategories = splitCategories(product.Categories)
            if (productCategories.includes(category)) {
                categoryArray.push(Inventory[i]);
            }
        }
        setCategory(categoryArray)
    }

    //useEffect for putting items in their respective categories
    useEffect(() => {
        for (let i in allCategories){
            addToCategory(allCategories[i], allSetters[i]);
        }
    }, [Inventory])

    //state for the filter button
    const [filterActive, setFilterActive] = useState(false);
    const [allFilters, setAllFilters] = useState([]);

    //handle clicking of the filter button
    const handleFilterClick = () => {
        if (filterActive) {
            setFilterActive(false);
        }else {
            setFilterActive(true);
        }
    }

    //function to split the string of categories by ,
    const splitCategories = (categoriesString) => {
        const categoriesArray = categoriesString.split(",");
        return categoriesArray
    }

    //To filter the items by category
    useEffect(() => {
        for(let i in allFilters){
            console.log(allFilters[i].filterName + allFilters[i].filterProducts)
        }
    }, [allFilters])


    // Variables for reviews
    let str = ""

    let add = ""
    let rev = ""


    const AddReview = async (item, star, review) => {           //handles adding a review to database
        await setDoc(
            doc(db, "Inventory", item.id),
            {
                Review: review,
                Stars: star
            },
            { merge: true }
        );
        alert("Review submitted")
    }



    // The following function count the average rating of each item (using stars)
    function avgStars(stars) {
        let starCount = "" + stars;
        let wholeSum = 0;
        let check = 0;

        for (let i = 0; i < starCount.length; i++) {
            if (starCount[i] == "*") {
                check++;
            }
            else {
                wholeSum = wholeSum + parseInt(starCount[i]);
            }
        }
        let average = wholeSum / (starCount.length - check);

        if (starCount.length == 0) {
            return "5.0 ";
        }
        else {
            return average.toFixed(1) + " ";
        }

    }

    // Function to put reviews in a list
    function review(reviews) {
        const reviewList = reviews.toString().split("*");
        return reviewList
    }

    // Funtion that returns the number of reviews
    function reviewNumber(reviews) {
        let counter = 0;
        let review = "" + reviews;
        for (let i = 0; i < review.length; i++) {
            if (review[i] == '*') {
                counter++;
            }
        }
        if (counter == 0) {
            return ""
        }
        else {
            return " (" + counter.toString() + ")"
        }
    }
    function reviewNumberIn(reviews) {
        let counter = 0;
        let review = "" + reviews;
        for (let i = 0; i < review.length; i++) {
            if (review[i] == '*') {
                counter++;
            }
        }
        if (counter == 0) {
            return " "
        }
        else {
            return counter.toString() + " "
        }
    }

    // Reviews or Review or No Review
    function correctReview(reviews) {
        let counter = 0;
        let review = "" + reviews;
        for (let i = 0; i < review.length; i++) {
            if (review[i] == '*') {
                counter++;
            }
        }

        if (counter == 0) {
            return "No reviews"
        }
        else if (counter == 1) {
            return "Review"
        }
        else {
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

    useEffect(() => {
        const getItems = async () => {
            const data = await getDocs(itemRef);
            setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getItems()
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
                            <Link className="profile-icon" to='/profile'>
                                <CgProfile className='profile-icon' />
                            </Link>

                            <Link className="navlink" to='/sellerslanding'>
                                <p>Sell</p>
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

                            <Link className="navlink" to="/track">
                                <p> MyOrders</p>
                            </Link>
                            <Link className="navlink" to="/sold">
                                <p> Sold</p>
                            </Link>

                        </div>

                        <button onClick={() => setShowLinks(!showLinks)}>
                            ≡
                        </button>
                    </div>



                    <div className="rightside">
                        <input className="edtsearch" placeholder="Search" ref={searchRef} />
                        <button className="btnsearch" onClick={() => { setSearchTerm(searchRef.current.value)}}>
                            Search
                        </button>
                    </div>
                </div>

                {
                    showcart ? <div className="cartdiv">
                        {summary}
                        <div className="demodiv">
                            <text className='textin'>R{total}</text>
                            <Link to='/maketransactionaddress'>
                                <button className="buttonin" >Check out</button>
                            </Link>
                        </div>
                    </div> : null
                }
            </div>
        )
    }


    

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
            str = "" + item.Stars + "*" + rating.toString()
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
                        <img style={{ boxShadow: "0px 0px 10px 0px rgb(200, 200, 200)" }} src={item.Image} />
                    </div>
                    <h3>{item.Name}</h3>
                    <p>{item.Description}</p>

                    <div className="starratediv">
                        < ReactStars
                            size={45}
                            count={5}
                            isHalf={false}
                            onChange={ratingChanged}
                            className="st" />

                    </div>

                    <input className="edtdesc" id="input" placeholder="Item Review" onChange={(event) => {
                        add = "*" + event.target.value.toString()
                    }} />

                    <div>
                        <button className="btnclose" onClick={() => {
                            rev = "" + item.Review + add
                            AddReview(item, str, rev)
                            setShowReview(false)
                            ProductView(item)
                        }}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }

    function viewReviews(item) {
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
                        <img style={{ boxShadow: "0px 0px 10px 0px rgb(200, 200, 200)" }} src={item.Image} />
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
                        {item.Image2 ?
                            <img style={{boxShadow: "0px 0px 10px 0px rgb(200, 200, 200)", marginLeft: "15px"}} src={item.Image2} />
                            : null
                        }
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
                                <div className='spec-container' style={{ marginBottom: "0" }} key={index}>
                                    <h6 className='spec-name' style={{ marginBottom: "0" }}>{spec.spec}</h6>
                                    <h6 className="spec-detail" style={{ marginBottom: "0" }}>{spec.detail}</h6>
                                </div>
                            )
                        })

                        : <h1></h1>}



                    <div className="add-to-cart">
                        <input type="number" className="edtnum" placeholder="1" min='0' max={item.Quantity} />
                        <button className="btnadd" onClick={() => handleCartItems(item)}>Add to cart</button>

                        <div className="inprodstar">
                            <BsStarFill className="initemsstar" />{avgStars(item.Stars)}
                            <Link onClick={() => viewReviews(item)}>{reviewNumberIn(item.Review)}{correctReview(item.Review)}</Link>
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

            {filterActive ? 
                <button className='filter-button' onClick={handleFilterClick} style={{backgroundColor: "#C25450"}}>
                    <MdExpandMore style={{height: "30px", width: "30px"}}/>
                    Close Filter</button>
                :
                <button className='filter-button' onClick={handleFilterClick}>
                    <MdExpandLess style={{height: "30px", width: "30px"}}/>
                    Show Filter</button>
            }
 
            <div>
                <Filter 
                    filterActive={filterActive}
                    allFilters={allFilters}
                    setAllFilters={setAllFilters}
                    allCategories={allCategories}
                    Books={Books} Baby={Baby} Cellphones={Cellphones} Computers={Computers} DIY={DIY} Electronics={Electronics} Fashion={Fashion} Groceries={Groceries} Media={Media} Office={Office} Outdoor={Outdoor} Sports={Sports} Wearables={Wearables}
                    />
            </div>
             
             
                    {/**
                     * This part(inside this div) allows for the categories that are selected in the 
                     * filter to show.
                     * 
                     * all products will show after the selected categories
                     */}
                 {allFilters.length != 0 ?
                    
                    <div >
                        {allFilters.map((filter, index) => {
                            return (
                                <div key={index} className="category-container">
                                    <button className='category-name'>{"(" + filter.filterProducts.length + ")" + "  " + filter.filterName}</button>
                                    <div className='category-content-container'>
                                    
                                    {filter.filterProducts.map((item, idx) => {
                                        return (
                                            <div key={idx} className="itemdiv" onClick={() => {
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
                                                            <h1 style={{ fontWeight: "bold", color: "#B38B59" }} className="item-quantity">sold out</h1>
                                                        )
                                                    } else {
                                                        return (
                                                            <h1 className="item-quantity">in stock</h1>
                                                        )
                                                    }
                                                })()}
                                            </div> 
                                        )
                                    })

                                    }

                                    

                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    : null

                 }
                 
               
            
            {
                show ? <div className="reviewdiv">
                    {text}
                </div> :
                    <div className="bodydiv" >
                        <button className='category-name'>({Inventory.length}) All Products</button>
                        {Inventory.filter((item) => {
                            if (searchTerm == "") {
                                return item
                            } else if (item.Name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                return item
                            }
                        }).map((item) => {
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
                                            <h1 style={{ fontWeight: "bold", color: "#B38B59" }} className="item-quantity">sold out</h1>
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