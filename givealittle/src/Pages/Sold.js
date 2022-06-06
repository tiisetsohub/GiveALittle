import React, { useContext, useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { CardActionArea } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { NameContext, TrackContext } from "../Context";
import "./Sold.css";
import {
  StepLabel,
  Step,
  Stepper,
  Typography,
  CardMedia,
  CardContent,
  Card,
} from "@mui/material";
export default function Sold() {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [purchased, setItems] = useState([]);
  const itemRef = collection(db, "Bought");
  const { name, setName } = useContext(NameContext);
  const { trackContext, setTrackContext } = useContext(TrackContext);
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
    setShow(true);
    setText(
      <div>
        <button className="btnclose" onClick={() => setShow(false)}>
          <KeyboardBackspaceIcon />
        </button>
        <div className="buyer">Reciever: {item.Buyer}</div>
        <div className="prodView">
          <div className="left-side">
            <Card sx={{ maxWidth: 400, boxShadow: 10, borderRadius: 3 }}>
              <CardMedia
                component="img"
                height="140"
                image={item.Cart.Image}
                alt=""
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.Cart.Name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.Cart.Description}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  R {item.Cart.Price}
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className="right-side">
            <div className="right-botton">
              <Card sx={{ maxWidth: 400, boxShadow: 10, borderRadius: 3 }}>
                <Stepper
                  activeStep={
                    Array.isArray(trackContext) && trackContext.length != 0
                      ? trackContext[trackContext.length - 1].LocDesc.includes(
                          "Collected"
                        )
                        ? 2
                        : 0
                      : ""
                  }
                  orientation="vertical"
                >
                  {Array.isArray(trackContext) && trackContext.length != 0 ? (
                    trackContext[trackContext.length - 1].LocDesc.includes(
                      "Collected"
                    ) ? (
                      ["Order Pending", "Order Collected"].map(
                        (elem, index) => (
                          <Step className="step">
                            <StepLabel>
                              <div className="step-label">
                                {elem}{" "}
                                {trackContext[index == 0 ? index : 4].Time}
                              </div>
                            </StepLabel>
                          </Step>
                        )
                      )
                    ) : (
                      ["Order Pending"].map((elem) => (
                        <Step className="step">
                          <StepLabel>
                            <div className="step-label">
                              {elem} {trackContext[0].Time}
                            </div>
                          </StepLabel>
                        </Step>
                      ))
                    )
                  ) : (
                    <div className="step-label">
                      {" "}
                      Something went wrong! Please Try again.
                    </div>
                  )}
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
      <h1>Sold Items </h1>
      {show ? (
        <div className="reviewdiv">{text}</div>
      ) : (
        <div className="bodydiv">
          {purchased.map((item) => {
            if (item.Cart.Seller == name)
              //the logged in user should only see his/her products that they have been bought buy others.
              return (
                <div
                  className="itemdiv"
                  onClick={() => {
                    ProductView(item);
                  }}
                >
                  <img src={item.Cart.Image} alt="" />
                  <div className="textdiv">
                    <h1 className="itemname">{item.Cart.Name}</h1>
                  </div>
                  <h1 className="itemprice">R{item.Cart.Price}</h1>
                </div>
              );
          })}
        </div>
      )}
    </div>
  );
}
