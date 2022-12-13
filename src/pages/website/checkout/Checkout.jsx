import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import swal from "@sweetalert/with-react";
import { useState } from "react";
import OrderReceiverDetails from "./OrderReceiverDetails";
import OrderSenderDetails from "./OrderSenderDetails";
import OrderDetails from "./OrderDetails";
import { useEffect } from "react";

const steps = [
  "Sender Information",
  "Receiver Information",
  "Order Details",
  "Payment details",
  "Review your order",
];

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [validated, setValidated] = useState(false);
  const [products, setProducts] = useState([]);
  const today = new Date();

  useEffect(() => {
    let arr = [];
    JSON.parse(localStorage.getItem("cart") || "[]").map((item) => {
      arr.push({
        product: item.product._id,
        quantity: item.quantity,
      });
    });
    setProducts(arr);
    setOrder({ ...order, products: arr });
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  const [order, setOrder] = useState({
    userId: localStorage.getItem("userId"),
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    contact: "",
    deliverDate: "",
    deliverTime: "",
    message: "",
    senderName: "",
    senderContact: "",
    senderEmail: "",
    cardType: "",
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
    orderPlacedDate: today,
    status: "pending",
    products: products,
  });

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      userId,
      firstName,
      lastName,
      address,
      city,
      contact,
      deliverDate,
      deliverTime,
      message,
      senderName,
      senderContact,
      senderEmail,
      cardType,
      cardName,
      cardNumber,
      expDate,
      cvv,
      orderPlacedDate,
      status,
      products,
    } = order;

    try {
      const res = await fetch("/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          firstName,
          lastName,
          address,
          city,
          contact,
          deliverDate,
          deliverTime,
          message,
          senderName,
          senderContact,
          senderEmail,
          cardType,
          cardName,
          cardNumber,
          expDate,
          cvv,
          orderPlacedDate,
          status,
          products,
        }),
      });
      if (res.status === 400 || !res) {
        window.alert("Invalid Credentials");
      } else {
        swal("Success", "Successfully Added", "success", {
          button: false,
          timer: 1500,
        });

        console.log(event.target);
      }
    } catch (error) {
      console.log("ERROR IS", error);
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <OrderSenderDetails handleInput={handleInput} />;
      case 1:
        return <OrderReceiverDetails handleInput={handleInput} />;
      case 2:
        return <OrderDetails handleInput={handleInput} />;
      case 3:
        return <PaymentForm handleInput={handleInput} />;
      case 4:
        return <Review order={order} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={
                      activeStep === steps.length - 1
                        ? handleSubmit
                        : handleNext
                    }
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
