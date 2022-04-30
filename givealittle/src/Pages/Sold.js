import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import './Sold.css';
//identical to home.js

export default function Sold() {
  const [show, setShow] = useState(false);
  const [prodViewshow, setProdViewShow] = useState(false);
  const [text, setText] = useState("hey");
  const [prodText, setProdText] = useState("hey");
  const [Inventory, setItems] = useState([]);
  const itemRef = collection(db, "Inventory");

  function Navbar() {
    const [showLinks, setShowLinks] = useState(false);

    return (
      <div>
        <div className="navbar">
          <div className="leftside">
            <div className="links" id={showLinks ? "hidden" : ""}>
              <Link className="navlink" to="/sellerslanding">
                <p>Sell </p>
              </Link>
              <Link className="navlink" to="/about">
                <p>About</p>
              </Link>
              <Link className="navlink" to="/login">
                <p>Contact</p>
              </Link>

              <Link className="navlink" to="/track">
                <p>Track order</p>
              </Link>
            </div>
            <button
              onClick={() => setShowLinks(!showLinks)}
              className="btnthings"
            >
              ≡
            </button>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const getItems = async () => {
      const data = await getDocs(itemRef);
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getItems();
  }, []);

  function update(item) {
    setProdViewShow(true);
    setProdText(
      <div>
        <button className="btnclose" onClick={() => setProdViewShow(false)}>
          Back
        </button>

        <img src={item.Image} />
        <h3>{item.Name}</h3>
        <p>{item.Description}</p>
        <p>{item.Price}</p>
      </div>
    );
  }
  function ProductView(item) {
    setShow(true);
    setText(
      <div>
        <button className="btnclose" onClick={() => setShow(false)}>
          Back
        </button>

        <img src={item.Image} />
        <h3>{item.Name}</h3>
        <p>{item.Description}</p>
        <p>{item.Price}</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {show ? (
        <div className="reviewdiv">{text}</div>
      ) : (
        <div className="bodydiv">
          {Inventory.map((item) => {
            return (
              <div
                className="itemdiv"
                onClick={() => {
                  ProductView(item);
                }}
              >
                <img src={item.Image} alt="nope" />
                <div className="textdiv">
                  <h1 className="itemname">{item.Name}</h1>
                </div>
                <h1 className="itemprice">R{item.Price}</h1>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
