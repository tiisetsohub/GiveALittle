import React from 'react'
import Products from './Products'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Category } from "./Category"
import NavBarBuyer from "./NavBarBuyer";
import ProductView from './ProductView';

function Buyer() {
  return (
    <div>
        
        <NavBarBuyer/>
        <Routes>
          <Route path="/Category" element={<Category />} exact />
          <Route path="/home" element={<Products />} exact />
          <Route path="/" element={<Products />} exact />
          <Route path="/product/:id" element={<ProductView />} exact/> 
        </Routes>
     
    </div>
  )
}

export default Buyer