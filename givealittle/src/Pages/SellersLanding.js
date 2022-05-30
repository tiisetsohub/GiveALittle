import React from "react";
import ProductInsightsCard from "../components/ProductInsightsCard";
import "../components/SellersPage.css";
import firebase from "../firebase-config";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import "bootstrap/dist/css/bootstrap.min.css";
import SellerDetails from "../components/SellerDetails";
import Sell from "../Pages/Sell";
import Insights from "../components/Insights";
import { motion } from "framer-motion";

import { QuerySnapshot } from "firebase/firestore";

import HomeIcon from "@mui/icons-material/Home";

// To get current user imports
import { NameContext } from "../Context";
import Navigation from "../components/Navigation";
import SellersTabs from "../components/SellersTabs";

function SellersLanding() {
  const [currentUser, setCurrentUser] = useState();
  const { name, setName } = useContext(NameContext);
  const [Users, setUsers] = useState([]);
  const [Inventory, setItems] = useState([]); //state for inventory
  const itemRef = collection(db, "Inventory"); //reference to inventory in database
  const itemhRef = collection(db, "Bought");
  const [Bought, setBItems] = useState([]);
  const [topCustomer, setTopCustomer] = useState('');
  const [totalSale, setTotalSale] = useState('');
  const [topProduct, setTopProduct] = useState('');


  useEffect(() => {
    //loads data from database
    const getBItems = async () => {
      const data = await getDocs(itemhRef);
      setBItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getBItems();
  }, []);

  useEffect(() => {
    //Bought.map((item) =>)
    setTopCustomer('Tiisetso')
    setTotalSale(19999.99)
    setTopProduct('JBL 510')
  }, []);



  useEffect(() => {
    //loads data from database
    const getItems = async () => {
      const data = await getDocs(itemRef);
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    

    getItems();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(collection(db, "Users"));
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  //State for currently selected tab
  const [allTabs, setAllTabs] = useState([
    {
      tabName: "Add Product",
      active: false,
    },
    {
      tabName: "All Products",
      active: true,
    },
    {
      tabName: "Product Insights",
      active: false,
    },
  ]);

  //currently sellected tab
  const [currentTab, setCurrentTab] = useState(
    allTabs.find((tab) => tab.active).tabName
  );

  //useEffect for when a tab is clicked
  useEffect(() => {
    setCurrentTab(allTabs.find((tab) => tab.active).tabName);
    console.log(currentTab);
  }, [allTabs]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={({ opacity: 0 }, { duration: 0.5 })}
      className="body"
    >
      <Navigation />

      <SellersTabs allTabs={allTabs} setAllTabs={setAllTabs} />

      {currentTab == "All Products" ? (
        <div className="products-container">
          <ul>
            {Inventory.map((product, index) =>
              product.Seller == name ? (
                <ProductInsightsCard
                  key={product.Name}
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
              ) : null
            )}
          </ul>
        </div>
      ) : null}

      {currentTab == "Add Product" ? (
        <Sell allTabs={allTabs} setAllTabs={setAllTabs} />
      ) : null}

      {currentTab == "Product Insights" ? (
          <Insights 
          key ={name}
          topCustomer = {topCustomer}
          topProduct = {topProduct}
          totalSale = {totalSale}/>
      ) : null}
    </motion.div>
  );
}

export default SellersLanding;
