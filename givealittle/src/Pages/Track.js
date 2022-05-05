import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./Track.css";
import { Container, Row } from "reactstrap";
import Purchased from "../components/Purchased";
import React, { useContext } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { NameContext } from "../Context";

export default function Track() {
  const [bought, setproducts] = useState([]); //state for bought
  const productRef = collection(db, "Bought"); //reference to bought in database
  const [show, setShow] = useState(false);
  const [text, setText] = useState("hey");
  const { name, setName } = useContext(NameContext);

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
          <KeyboardBackspaceIcon />
        </button>
        <h3 className="heading"> My Orders </h3>
        <div className="cont-div">
          <div className="left">
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="130"
                image={product.Image}
                alt=""
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.Name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.Description}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  R {product.Price}
                </Typography>
              </CardContent>
            </Card>
          </div>

          <div className="right">
            <Card sx={{ maxWidth: 400 }}>
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
                      image={product.Image}
                      name={product.Name}
                      price={product.Price}
                      delivery={product.Delivery}
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
          <Link className="navlink" to="/sold">
            <p>Sold</p>
          </Link>
        </div>
        <button onClick={() => setShowLinks(!showLinks)} className="btnthings">
          ≡
        </button>
      </div>
    </div>
  );
}
