import React from 'react'
import ProductInsightsCard from '../components/ProductInsightsCard'
import '../components/SellersPage.css'
import firebase from '../firebase-config';
import {Link} from 'react-router-dom'
import { useEffect, useState, useContext } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebase-config';
import 'bootstrap/dist/css/bootstrap.min.css';
import SellerDetails from '../components/SellerDetails';

import { QuerySnapshot } from "firebase/firestore";

import HomeIcon from "@mui/icons-material/Home";

// To get current user imports
import { NameContext } from '../Context';
import Navigation from '../components/Navigation';

function SellersLanding() {

  const [currentUser, setCurrentUser] = useState();
  const {name, setName} = useContext(NameContext);
  const [Inventory, setItems] = useState([]);           //state for inventory
  const itemRef = collection(db, "Inventory");            //reference to inventory in database

  const [Users, setUsers] = useState([]);
  

  useEffect(() => {       //loads data from database
    const getItems = async () => {
      const data = await getDocs(itemRef);
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getItems()
}, []);

  
useEffect(() => {
  const getUsers = async () => {
    const data = await getDocs(collection(db, "Users"));
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }
  getUsers()
}, []);
  
  return (
    <div className='body'>

      <Navigation/>
      <div style={{textAlign: "center"}}>

      <div>
        {Users.map((user, idx) => (
       user.Email == name
        ? (
          <SellerDetails Name={user.Name} Email={user.Email} Cell={user.Cell}/>
        )
        : null
        ))}
      </div>

        <Link to="/sell">
          <button className='add-product-button'>Add Product</button>
        </Link>
      
      </div> 

      <div className='products-container'>
      <ul>
          {Inventory.map((product, index) => (
            product.Seller == name
            ? (
              <ProductInsightsCard key={product.Name}
              image={product.Image}
              name={product.Name}
              description={product.Description}
              price={product.Price}
              quantity={product.Quantity}
              specs={product.Specs}
              productId={product.id}
              Inventory={Inventory}
              setItems={setItems}
              stars={product.Stars}
              review={product.Review}
            />
            )
            : null
          ))}
      </ul> 
      </div>
      
        
    </div>
  );
}


export default SellersLanding;
