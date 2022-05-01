import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, addDoc, Firestore } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./Sold.css";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";
import { doc, setDoc, deleteDoc, update } from "firebase/firestore";
import { updateDoc,  FieldValue } from "firebase/firestore";

//identical to home.js

export default function Sold() {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("hey");
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

  const [location, updateLocation] = useState(""); //state for item name
  const [time, updateTime] = useState(""); //state for description

  const ref = collection(db, "Bought"); //refernce for item

  const addItem = async () => {
    //handles adding an item to database
    // await addDoc(ref, { Location: location, Time: time });
    // alert("Deleted");
    // await setDoc(doc(db, "Bought", "item1"), {
    //   Description: "Los",
    //   Image: "CA",
    //   ItemOwner: "USA",
    //   Location: "USA",
    //   LocationDescription: "USA",
    //   Name: "USA",
    //   Price: "USA",
    //   Location: "USA",
    //   Time: "01 May 2022 10:16 a.m",
    // }, {merge:true});
    // await deleteDoc(doc(db, "Bought", "zfSm8pVVmtHqg1TQ1yil"));

    // const washingtonRef = doc(db, "Bought", "item1");

    // Set the "capital" field of the city 'DC'
    // await updateDoc(washingtonRef, {
    //   Location: "Braam",
    // });


    const washingtonRef = collection(db, 'Bought', 'item1');

    await washingtonRef.update({
      Time: FieldValue.arrayUnion("3"),
    });
  };

  function Drawer() {
    const [state, setState] = React.useState({
      right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
      if (
        event &&
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        role="presentation"
        component="form"
        noValidate
      >
        <div>
          <ListItem>
            <TextField
              label="Location"
              type="text"
              className="location"
              id="location"
              onChange={(event) => {
                updateLocation(event.target.value);
              }}
            />
          </ListItem>

          <ListItem>
            <TextField
              label="Time"
              type="text"
              className="time"
              id="time"
              onChange={(event) => {
                updateTime(event.target.value);
              }}
            />
          </ListItem>
        </div>
        <p className="btnadd" id="btn" onClick={addItem}>
          Create
        </p>
      </Box>
    );

    return (
      <div>
        {["right"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>
              Delivery Details
            </Button>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        ))}
        <br />
      </div>
    );
  }

  function ProductView(item) {
    setShow(true);
    setText(
      <div className="prodView">
        <div>
          <button className="btnclose" onClick={() => setShow(false)}>
            Back
          </button>

          <img src={item.Image} />
          <h3>{item.Name}</h3>
          <p>{item.Description}</p>
          <p>{item.Price}</p>
        </div>
        <Drawer />
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
