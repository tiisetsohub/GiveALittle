import React from 'react'
import Products from '../Components/Products'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Category } from "../Components/Category"
import NavBar from "../Components/NavBar";
import ProductView from '../Components/ProductView';
import Buyer from '../Components/Buyer'

function Homepage() {
  return (
    <div>
        <Router>
        {/* <Buyer/> */}
        <NavBar />
        <Routes>
          <Route path="/Category" element={<Category />} exact />
          <Route path="/home" element={<Products />} exact />
          <Route path="/" element={<Products />} exact />
          <Route path="/product/:id" element={<ProductView />} exact/> 
        </Routes>
      </Router >
    </div>
  )
}

export default Homepage