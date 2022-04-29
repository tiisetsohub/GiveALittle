import React from 'react';
import { useContext } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Home.css';
import './MakeTransaction.css';
import { CartContext } from '../Context'
import { NameContext, LoginContext } from '../Context'
import { connectFirestoreEmulator } from 'firebase/firestore';

export default function Payment() {


    const { login, setLogin } = useContext(LoginContext)  
    const { cart, setCart } = useContext(CartContext);
    const { name, setName } = useContext(NameContext)

    function Login() {
 
        console.log({login} ,{name} , {cart})
    }
    return (
        <div className="navbar">
            <Login />
              <div className="leftside">
                  <div className="links">
                      <Link className="navlink" to='/'>
                          <p>Home</p>
                      </Link>
                      <Link className="navlink" to='/about'>
                          <p>About</p>
                      </Link>
                      <Link className="navlink" to='/login'>
                          <p>Contact</p>
                      </Link>
                  </div>
              </div>
          </div>
    )
}