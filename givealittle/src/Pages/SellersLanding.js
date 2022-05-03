import React from "react";
import ProductInsightsCard from "../components/ProductInsightsCard";
import "../components/SellersPage.css";
import firebase from "../firebase-config";
import { Link } from "react-router-dom";
import { NameContext } from "../Context";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { QuerySnapshot } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeIcon from "@mui/icons-material/Home";
import { Container, Row, Col } from "reactstrap";
import { applyActionCode } from "firebase/auth";

function SellersLanding() {
  const [currentUser, setCurrentUser] = useState();
  const [Inventory, setItems] = useState([]); //state for inventory
  const itemRef = collection(db, "Inventory"); //reference to inventory in database
  const { name, setName } = useContext(NameContext);
  useEffect(() => {
    //loads data from database
    const getItems = async () => {
      const data = await getDocs(itemRef);
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getItems();
  }, []);
  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center" }}>
        <Link to="/sell">
          <button className="add-product-button">Add Product</button>
        </Link>

        <h1>name</h1>
      </div>

      <Container fluid="lg">
        <Row style={{ justifyContent: "center" }}>
          {Inventory.map((product) => {
            if(product.Seller == name) // the logged should see all his/her products that they put for sale.
            return (
              <Col xs="auto">
                <ProductInsightsCard
                  image={product.Image}
                  name={product.Name}
                  price={product.Price}
                  stock={product.Quantity}
                ></ProductInsightsCard>
              </Col>
            );
            // else return;
          })}
        </Row>
      </Container>
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
            <p>
              <HomeIcon />
              Home
            </p>
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

export default SellersLanding;
