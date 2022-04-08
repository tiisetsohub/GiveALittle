import React from 'react'
import Products from '../Components/Products'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Category } from "../Components/Category"
import NavBarBuyer from "../Components/NavBarBuyer";
import ProductView from '../Components/ProductView';

function Buyer() {
  return (
    <div>
      <Router>
        <NavBarBuyer/>
        <Routes>
          <Route path="/Category" element={<Category />} exact />
          <Route path="/home" element={<Products />} exact />
          <Route path="/" element={<Products />} exact />
          <Route path="/product/:id" element={<ProductView />} exact/> 
        </Routes>
        </Router>
    </div>
  )
}

export default Buyer