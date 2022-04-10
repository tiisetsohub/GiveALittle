import React from 'react'
import Products from '../Pages/Products'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Category } from "../Pages/Category"
import NavBar from "../Pages/NavBar";
import ProductView from '../Pages/ProductView';

function Homepage() {
  return (
    <div>
        <Router>
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