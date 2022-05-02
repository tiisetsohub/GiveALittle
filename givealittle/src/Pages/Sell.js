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
        await addDoc(itemRef, { Name: newName, Description: newDescription, Price: newPrice, Quantity: newQuantity, Image1: url1, Image2: url2, Image3: url3 });
        alert("Added")
    }

    useEffect(() => {           //gets data from database
        const getItems = async () => {
            const data = await getDocs(itemRef);
            setItem(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getItems()
    }, []);

    
    const [image1, newImg1]=useState("");   
    const [image2, newImg2]=useState(""); 
    const [image3, newImg3]=useState("");         //state for image
    const [url1, setUrl1]=useState("");
    const [url2, setUrl2]=useState("");
    const [url3, setUrl3]=useState("");
    
    const handle1stUpload = async ()=>{
        if(image1==null) {
            return;
        }
        else{
            const imageRef = ref(storage, `imagefolder/${image1.name}`);
            uploadBytes(imageRef, image1).then(()=>{
                alert("image uploaded")
            })
            await getDownloadURL(imageRef).then((x)=> {
                setUrl1(x);
            })

        
    }
          
    };
    const handle2ndUpload = async ()=>{
        if(image2==null) {
            return;
        }
        else{
            const imageRef = ref(storage, `imagefolder/${image2.name}`);
            uploadBytes(imageRef, image2).then(()=>{
                alert("image uploaded")
            })
            await getDownloadURL(imageRef).then((x)=> {
                setUrl2(x);
            })

        
    }
          
    };
    const handle3rdUpload = async ()=>{
        if(image3==null) {
            return;
        }
        else{
            const imageRef = ref(storage, `imagefolder/${image3.name}`);
            uploadBytes(imageRef, image3).then(()=>{
                alert("image uploaded")
            })
            await getDownloadURL(imageRef).then((x)=> {
                setUrl3(x);
            })

        
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
                <br />
                <input type="file" id="input" onChange={(event)=>{newImg1(event.target.files[0])}} />
                <button className="btnimg" onClick={handle1stUpload}>Upload</button>
                <br />
                <br />
                <input type="file" id="input" onChange={(event)=>{newImg2(event.target.files[0])}} />
                <button className="btnimg" onClick={handle2ndUpload}>Upload</button>
                <br />
                <br />
                <input type="file" id="input" onChange={(event)=>{newImg3(event.target.files[0])}} />
                <button className="btnimg" onClick={handle3rdUpload}>Upload</button>
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
