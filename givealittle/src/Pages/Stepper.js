import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import "./Home.css";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

//identical to home.js

export default function Stepp() {
  const [Bought, setItems] = useState([]);
  const itemRef = collection(db, "Bought");

  useEffect(() => {
    const getItems = async () => {
      const data = await getDocs(itemRef);
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getItems();
  }, []);

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={Bought.length - 1} orientation="vertical">
        {Bought.map((step) => {
          return (
            <Step>
              <StepLabel className="step-label">
                {step.LocationDescription} - {step.Time}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
