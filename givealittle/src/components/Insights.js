import React, { useContext, useState, useEffect } from 'react';
import './Insights.css';
import { NameContext } from '../Context';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

export default function Insights(props){
        
    return(
        <div className="mainin">
            <h1 className="totalsaleh1">Total Sales</h1>
            <div className="maininbig">
                <h1 className="totalh1">R{props.totalSale}</h1>
            </div>
            <div className="sumindiv">
                <div className="topbuyerdiv">
                    <h6>Top Customer🤩</h6>
                    <h3 className="topbuyerh4">{props.topCustomer}</h3>
                </div>

                <div className="topitemdiv">
                    <h6>Top Product🚀</h6>
                    <h3 className="topitemh3">{props.topProduct}</h3>
                </div>

                <div className="historydiv">
                    <h6>Sales History📈</h6>
                    <h3 className="historyh3">Weekly</h3>
                </div>
            </div>
        </div>
    )
}