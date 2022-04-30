import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./Track.css";
import { Container, Row } from "reactstrap";
import Purchased from "../components/Purchased";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

export default function Track() {
  const [bought, setproducts] = useState([]); //state for bought
  const productRef = collection(db, "Bought"); //reference to bought in database
  const [show, setShow] = useState(false);
  const [text, setText] = useState("hey");
  useEffect(() => {
    //loads data from database
    const getproducts = async () => {
      const data = await getDocs(productRef);
      setproducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getproducts();
  }, []);
  function ProductView(product) {
    const items = [];
    for (var i = 0; i < product.Time.length; i++) {
      items.push({
        LocationDescription: product.LocationDescription[i],
        Time: product.Time[i],
      });
    }
    setShow(true);
    setText(
      <div>
        <button className="btnclose" onClick={() => setShow(false)}>
          Back
        </button>
        <h3 className="heading">Order Tracking </h3>
        <div className="cont-div">
          <div className="left">
            <img src={product.Image} alt="" />
            <h3>{product.Name}</h3>
            <p>{product.Description}</p>
            <p>R {product.Price} </p>
          </div>

          <div className="right">
            <Box sx={{ maxWidth: 400 }}>
              <Stepper activeStep={items.length - 1} orientation="vertical">
                {items.map((item) => {
                  return (
                    <Step>
                      <StepLabel className="step-label">
                        {item.LocationDescription} - {item.Time}
                      </StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </Box>
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
              return (
                <div
                  className="productdiv"
                  onClick={() => {
                    ProductView(product);
                  }}
                >
                  <Purchased
                    image={product.Image}
                    name={product.Name}
                    price={product.Price}
                    location={product.Location}
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
