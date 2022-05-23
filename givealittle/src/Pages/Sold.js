import React, { useContext, useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { CardActionArea } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { NameContext } from "../Context";
import "./Sold.css";
import {
  StepLabel,
  Step,
  Stepper,
  Typography,
  CardMedia,
  CardContent,
  Card,
  ListItem,
  TextField,
  Button,
  SwipeableDrawer,
  Box,
} from "@mui/material";
export default function Sold() {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [purchased, setItems] = useState([]);
  const itemRef = collection(db, "Bought");
  const { name, setName } = useContext(NameContext);
  function Navbar() {
    const [showLinks, setShowLinks] = useState(false);

    return (
      <div>
        <div className="navbar">
          <div className="leftside">
            <div className="links" id={showLinks ? "hidden" : ""}>
              <Link className="navlink" to="/landing">
                <p>Home </p>
              </Link>
              <Link className="navlink" to="/about">
                <p> About</p>
              </Link>
              <Link className="navlink" to="/contact">
                <p> Contact</p>
              </Link>

              <Link className="navlink" to="/track">
                <p> MyOrders</p>
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

  function ProductView(item) {
    const items = [
      { LocationDescription: "Preparing your order" },
      { LocationDescription: "Your order is ready" },
      { LocationDescription: "Your order is on its way" },
      { LocationDescription: "Your order has arrived" },
      { LocationDescription: "Order collected" },
    ];

    const throttledProcess = (items, interval) => {
      if (items.length == 0) {
        console.log("All done!");
        return;
      }
      console.log(items[0].LocationDescription + "  " + new Date().getSeconds());
      setTimeout(() => throttledProcess(items.slice(1), interval), interval);
    };

    setShow(true);
    setText(
      <div>
        <button className="btnclose" onClick={() => setShow(false)}>
          <KeyboardBackspaceIcon />
        </button>
        <div className="buyer">Reciever: {item.Buyer}</div>
        <div className="prodView">
          <div className="left-side">
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={item.Image}
                alt=""
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.Name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.Description}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  R {item.Price}
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className="right-side">
            <div className="right-botton">
              <Card sx={{ maxWidth: 400 }}>
                <Stepper
                  activeStep={
                    items[4].LocationDescription.includes("collected") ? 5 : 4
                  }
                  orientation="vertical"
                >
                  {/* {items.map((it) => {
                    return (
                      <Step>
                        <StepLabel className="step-label">
                          {it.LocationDescription} : {new Date().toDateString()}{",  "}
                          {new Date().getHours()}{":"}
                          {new Date().getMinutes()}
                        </StepLabel>
                      </Step>
                    );
                  })} */}
                  <Step>
                    <StepLabel className="step-label">
                      {new Date().getMinutes()}
                      {throttledProcess(items, 3000)}
                    </StepLabel>
                  </Step>
                </Stepper>
              </Card>
            </div>
          </div>
        </div>
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
          {purchased.map((item) => {
            if (item.Seller == name)
              //the logged in user should only see his/her products that they have been bought buy others.
              return (
                <div
                  className="itemdiv"
                  onClick={() => {
                    ProductView(item);
                  }}
                >
                  <img src={item.Image} alt="" />
                  <div className="textdiv">
                    <h1 className="itemname">{item.Name}</h1>
                  </div>
                  <h1 className="itemprice">R{item.Price}</h1>
                </div>
              );
            // else return;
          })}
        </div>
      )}
    </div>
  );
}
