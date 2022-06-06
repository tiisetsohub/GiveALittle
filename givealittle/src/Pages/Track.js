import React, { useContext, useState, useEffect } from "react";
import { db } from "../firebase-config";

import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";

import { Link } from "react-router-dom";
import { Container, Row } from "reactstrap";
import Purchased from "../components/Purchased";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { NameContext, TrackContext } from "../Context";
import "./Track.css";
import {
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export default function Track() {
  const [bought, setproducts] = useState([]); //state for bought
  const productRef = collection(db, "Bought"); //reference to bought in database
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const { name, setName } = useContext(NameContext);
  const { trackContext, setTrackContext } = useContext(TrackContext);

  // updateFields();
  useEffect(() => {
    //loads data from database
    const getproducts = async () => {
      const data = await getDocs(productRef);

      setproducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getproducts();
  }, []);

  const oldLocDesc = [];
  const oldTime = [];
  const newArray = [];
  const locDescArr = [
    "Preparing Your Order.",
    "Your Order Is Ready.",
    "Your Order Is On its Way.",
    "Your Order Is Ready For Collection.",
    "Order Collected.",
  ];
  const updateFields = async (id) => {
    const docRef = doc(db, "Bought", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.data().LocDesc.length <= 4) {
      for (let i = 0; i < docSnap.data().LocDesc.length; i++) {
        oldLocDesc.push(docSnap.data().LocDesc[i]);
        oldTime.push(docSnap.data().Time[i]);
      }
      oldLocDesc.push(locDescArr[oldLocDesc.length]);
      oldTime.push(new Date().toString());
      await setDoc(
        docRef,
        {
          LocDesc: oldLocDesc,
          Time: oldTime,
        },
        { merge: true }
      );
    }
    const docSnap2 = await getDoc(docRef);
    for (let i = 0; i < docSnap2.data().LocDesc.length; i++) {
      newArray.push({
        LocDesc: docSnap2.data().LocDesc[i],
        Time: docSnap2.data().Time[i],
      });
    }
    await setTrackContext(newArray);
  };

  function ProductView(product) {
    console.log(trackContext);
    updateFields(product.id);
    setShow(true);
    setText(
      <div>
        <button className="btnclose" onClick={() => setShow(false)}>
          <KeyboardBackspaceIcon />
        </button>
        <h3 className="heading"> My Orders </h3>
        <div className="cont-div">
          <div className="left">
            <Card sx={{ maxWidth: 400, boxShadow: 10, borderRadius: 3 }}>
              <CardMedia
                component="img"
                height="130"
                image={product.Cart.Image}
                alt=""
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.Cart.Name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.Cart.Description}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  R {product.Cart.Price}
                </Typography>
              </CardContent>
            </Card>
          </div>

          <div className="right">
            <Card sx={{ maxWidth: 400, boxShadow: 10, borderRadius: 3 }}>
              <Stepper
                activeStep={
                  trackContext.length == 5
                    ? trackContext.length
                    : trackContext.length - 1
                }
                orientation="vertical"
              >
                {Array.isArray(trackContext) && trackContext.length != 0 ? (
                  trackContext.map((elem) => (
                    <Step className="step">
                      <StepLabel>
                        <div className="step-label">
                          {elem.LocDesc} : {elem.Time}
                        </div>
                      </StepLabel>
                    </Step>
                  ))
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
    );
  }

  return (
    <div>
      <Navbar />
      {show ? (
        <div className="reviewdiv">{text}</div>
      ) : (
        <Container fluid="lg">
          <Row style={{ justifyContent: "center" }}>
            {bought.map((product) => {
              if (product.Buyer === name)
                //the logged in user should only see his/her items that they recently bought.
                return (
                  <div
                    className="productdiv"
                    onClick={() => {
                      ProductView(product);
                    }}
                  >
                    <Purchased
                      image={product.Cart.Image}
                      name={product.Cart.Name}
                      price={product.Cart.Price}
                    />
                  </div>
                );
            })}
          </Row>
        </Container>
      )}
    </div>
  );
}

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  return (
    <div className="navbar">
      <div className="leftside">
        <div className="links" id={showLinks ? "hidden" : ""}>
          <Link className="navlink" to="/landing">
            <p>Home</p>
          </Link>
          <Link className="navlink" to="/login">
            <p>About</p>
          </Link>
          <Link className="navlink" to="/login">
            <p>Contact</p>
          </Link>
        </div>
        <button onClick={() => setShowLinks(!showLinks)} className="btnthings">
          ≡
        </button>
      </div>
    </div>
  );
}
