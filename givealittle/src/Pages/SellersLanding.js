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
import SellersTabs from '../components/SellersTabs';

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


//State for currently selected tab
const [allTabs, setAllTabs] = useState([
  {
    tabName: "All Products",
    active: true
  },
  {
      tabName: "Product Insights",
      active: false
  }
])

//currently sellected tab
const [currentTab, setCurrentTab] = useState(allTabs.find(tab => tab.active).tabName)

//useEffect for when a tab is clicked
useEffect(() => {
  setCurrentTab(allTabs.find(tab => tab.active).tabName)
  console.log(currentTab)
}, [allTabs])
  
  return (
    <div className='body'>

      <Navigation/>
      <div style={{textAlign: "center"}}>

        <Link to="/sell">
          <button className='add-product-button'>Add Product</button>
        </Link>
      
      </div> 

      <SellersTabs
        allTabs={allTabs}
        setAllTabs={setAllTabs}
      />


      {currentTab == "All Products" ? 
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
                categories={product.Categories}
              />
              )
              : null
            ))}
        </ul> 
        </div>
        : 
            //The other tab
          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <h1 >Under Construction</h1>
          </div>
      }
      
      
        
    </div>
  );
}


export default SellersLanding;
