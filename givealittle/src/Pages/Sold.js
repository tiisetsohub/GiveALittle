import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./Sold.css";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";
import { doc, setDoc } from "firebase/firestore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { NameContext } from "../Context";

export default function Sold() {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("hey");
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

  function Drawer(item) {
    const [location, updateLocation] = useState(""); //state for item name
    const [time, updateTime] = useState(""); //state for description

    const [state, setState] = React.useState({
      right: false,
    });

    const update = async () => {
      const docSnap = await getDoc(doc(db, "Bought", item.item_id));
      const newInfo = [];
      var ld = [];
      var t = [];
      for (var i = 0; i < docSnap.data().LocationDescription.length; i++) {
        ld.push(docSnap.data().LocationDescription[i]);
        t.push(docSnap.data().Time[i]);
      }
      ld.push(location);
      t.push(time);
      newInfo.push({
        LocationDescription: ld,
        Time: t,
      });

      await setDoc(
        doc(db, "Bought", item.item_id),
        {
          LocationDescription: ld,
          Time: t,
        },
        { merge: true }
      );
    };
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
          "& .MuiTextField-root": { m: 0, width: "25ch" },
        }}
        role="presentation"
        component="form"
      >
        {" "}
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
        <div className="btn-update-cont">
          <Card
            className="btn-update"
            onClick={() => {
              toggleDrawer("right", false);
            }}
          > 
            <CardActionArea>UPDATE</CardActionArea>
          </Card>
        </div>
      </Box>
    );

    return (
      <div>
        {["right"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button
              className="delivery-btn"
              variant="contained"
              onClick={toggleDrawer(anchor, true)}
            >
              Update on Delivery
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
    const items = [];
    for (var i = 0; i < item.Time.length; i++) {
      items.push({
        LocationDescription: item.LocationDescription[i],
        Time: item.Time[i],
      });
    }
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
          <div>
            <Drawer item_id={item.id} className="right-side" />
            <div className="right-botton">
              <Card sx={{ maxWidth: 400 }}>
                <Stepper activeStep={items.length - 1} orientation="vertical">
                  {items.map((it) => {
                    return (
                      <Step>
                        <StepLabel className="step-label">
                          {it.LocationDescription} - {it.Time}
                        </StepLabel>
                      </Step>
                    );
                  })}
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
