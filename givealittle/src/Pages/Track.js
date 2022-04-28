import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Container, Row } from "reactstrap";
import ProductInsightsCard from "../components/Purchased";
import * as React from "react";

export default function Track() {
  const [Inventory, setproducts] = useState([]); //state for inventory
  const productRef = collection(db, "Bought"); //reference to inventory in database
  //   const productRef = collection(db, "Inventory"); //reference to inventory in database
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
    setShow(true); 

    setText(
      <div>
        <button className="btnclose" onClick={() => setShow(false)}>
          X
        </button>

        <img src={product.Image} alt=''/>
        <h3>{product.Name}</h3>
        <p>{product.Description}</p>
        <p>{product.Price}</p>
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
            {Inventory.map((product) => {
              return (
                <div
                  className="productdiv"
                  onClick={() => {
                    ProductView(product);
                  }}
                >
                  <ProductInsightsCard
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
