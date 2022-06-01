import { arrayRemove } from 'firebase/firestore';
import React, { useContext, useState, useEffect } from 'react';
import './Insights.css';

export default function Insights(props){
    const [show,setShow] = useState(true);
    const [newPage, setNewPage] = useState();

    function allCustomers(){
        setShow(false);
        var arr = Object.keys(props.custDict).map(
            (key) => { return [key, props.custDict[key]] });

        arr.sort(
            (first, second) => { return second[1] - first[1] }
        );
        setNewPage(
            <div>
                <button className="btnclose" onClick={() => setShow(true)}>Close</button>
                <div className="allprodsdiv">
                    <div className="allprodheaddiv">
                        <h3 className="ltet">Buyer</h3>
                        <h3 className="rtet">Items bought</h3>
                    </div>
                    {arr.map((product) =>
                        <div className="allprodsin">
                            <h5 className="ltet">{product[0]}</h5>
                            <h5 className="rtet">{product[1]}</h5>
                        </div>
                    )}
                </div>
            </div>)
    }

    function allProducts() {
        setShow(false);
        var arr = Object.keys(props.prodDict).map(
            (key) => { return [key, props.prodDict[key]] });

        arr.sort(
            (first, second) => { return second[1] - first[1] }
        );
        setNewPage(
        <div>
            <button className = "btnclose" onClick={() => setShow(true)}>Close</button>
            <div className = "allprodsdiv">
                <div className = "allprodheaddiv">
                    <h3 className = "ltet">Item</h3>
                    <h3 className = "rtet">Quantity Sold</h3>
                </div>
                {arr.map((product) =>
                    <div className="allprodsin">
                    <h5 className = "ltet">{product[0]}</h5>
                    <h5 className = "rtet">{product[1]}</h5>
                    </div>
                )}
            </div>
        </div>)
    }

    function saleHistory() {
        setShow(false);
        setNewPage(
            <div>
                <button className="btnclose" onClick={() => setShow(true)}>Close</button>
                <h1>Insights</h1>
            </div>)
    }
        
    return(
        ( show ? 
        <div className="mainin">
            <h1 className="totalsaleh1">Total Sales</h1>
            <div className="maininbig">
                <h1 className="totalh1">R{props.totalSale}</h1>
            </div>
            <div className="sumindiv">
                <div className="topbuyerdiv" onClick={allCustomers}>
                    <h6>Top Customers🤩</h6>
                    <h3 className="topbuyerh4">{props.topCustomer}</h3>
                </div>

                    <div className="topitemdiv" onClick={allProducts}>
                    <h6>Top Products🚀</h6>
                    <h3 className="topitemh3">{props.topProduct}</h3>
                </div>

                    <div className="historydiv" onClick={saleHistory}>
                    <h6>Sales History📈</h6>
                    <h3 className="historyh3">Weekly</h3>
                </div>
            </div>
        </div>
        : newPage)
    )
}