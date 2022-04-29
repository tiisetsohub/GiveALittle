import React from 'react';
import { useState, useEffect } from 'react';
import { db, storage } from '../firebase-config';
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Login.css';

export default function Sell() {
    const [newName, setNewName] = useState("");     //state for item name
    const [newDescription, setNewDesnewDescription] = useState("");         //state for description 
    const [newPrice, setNewPrice] = useState(0);                    //state for price
    const [newQuantity, setNewQuantity] = useState(0);              //state for quantity

    const [item, setItem] = useState([]);           //state for item
    const itemRef = collection(db, "Inventory");            //refernce for item

    const addItem = async () => {           //handles adding an item to database
        await addDoc(itemRef, { Name: newName, Description: newDescription, Price: newPrice, Quantity: newQuantity, Image1: imageList[0], Image2: imageList[1], Image3: imageList[2] });
        alert("Added")
    }

    useEffect(() => {           //gets data from database
        const getItems = async () => {
            const data = await getDocs(itemRef);
            setItem(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getItems()
    }, []);

    
    const [image, newImg]=useState("");           //state for image
    const [imageList, setImageList]=useState([]);
    const [url, setUrl]=useState();
    
    const handleUpload = async ()=>{
        if(image==null) {
            return;
        }
        else{
        while (imageList.length<=3){
            const imageRef = ref(storage, `imagefolder/${image.name}`);
            uploadBytes(imageRef, image).then(()=>{
                alert("image uploaded")
            })
            await getDownloadURL(imageRef).then((x)=> {
                setUrl(x);
            })
            imageList.add(url);

        }
    }

        if(imageList.size==3){
            alert("only 3 images per product");
            return;
        }
          
    };

    return (
        <div className="bigdiv">
            <Navbar />
            <h1>Add Item</h1>
            <div className='logindiv'>          {/*form for item information*/}
                <input className="edtname" id="input" placeholder="Name" onChange={(event) => {
                    setNewName(event.target.value)
                }} />
                <br />
                <input className="edtdesc" id="input" placeholder="Description" onChange={(event) => {
                    setNewDesnewDescription(event.target.value)
                }} />
                <br />
                <input type="file" id="input" onChange={(event)=>{newImg(event.target.files[0])}} />
                <button className="btnimg" onClick={handleUpload}>Upload</button>
                <br />
                <input className="edtprice" type="number" id="input" placeholder="Price" min="19.99" onChange={(event) => {
                    let t = parseFloat(event.target.value)
                    setNewPrice(t)
                }} />
                <br />
                <input type="number" className="edtquant" id="input" placeholder="Quantity" min="1" max="100" onChange={(event) => {
                    let t = parseInt(event.target.value)
                    setNewQuantity(t)
                }} />
                <br />
                <button className="btnadd" id="btn" onClick={addItem}>Add</button>
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
