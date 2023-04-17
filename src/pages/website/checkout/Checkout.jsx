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
import { useLocation, useNavigate } from "react-router-dom";

const steps = [
  "Sender Information",
  "Receiver Information",
  "Order Details",
  "Review your order",
];

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [validated, setValidated] = useState(false);
  const [products, setProducts] = useState([]);
  const today = new Date();
  const [isformValid, setisFormValid] = useState(false);
  const navigate = useNavigate();

  let location = useLocation();
  const user = localStorage.getItem("name");
  const contact = localStorage.getItem("contact");
  const email = localStorage.getItem("email");

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
    senderName: user,
    senderContact: contact,
    senderEmail: email,
    total: location.state.total,
    orderPlacedDate: today.toISOString().substring(0, 10),
    status: "Pending",
    products: products,
  });
  //validations
  const [updateFormError, setUpdateFormError] = useState({
    senderNameErrorMsg: {
      message: "",
      isVisible: false,
    },
    senderContactErrorMsg: {
      message: "",
      isVisible: false,
    },
    senderEmailErrorMsg: {
      message: "",
      isVisible: false,
    },
    firstNameErrorMsg: {
      message: "",
      isVisible: false,
    },
    lastNameErrorMsg: {
      message: "",
      isVisible: false,
    },
    addressErrorMsg: {
      message: "",
      isVisible: false,
    },
    cityErrorMsg: {
      message: "",
      isVisible: false,
    },
    contactErrorMsg: {
      message: "",
      isVisible: false,
    },
    deliverDateErrorMsg: {
      message: "",
      isVisible: false,
    },
    deliverTimeErrorMsg: {
      message: "",
      isVisible: false,
    },
    messageErrorMsg: {
      message: "",
      isVisible: false,
    },
  });

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
    console.log(location.state.total);
  }, []);

  useEffect(() => {
    console.log(products);
    // console.log(today.toISOString().substring(0, 10));
    // let d = today.getDate() + 2;
    // today.setDate(d);
    // // console.log(today.getDate() + 2);
    // console.log(today.toISOString().substring(0, 10));
  }, [products, today]);

  const validateProductInput = () => {
    let updateFormErrors = updateFormError;

    if (order.senderName.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        senderNameErrorMsg: {
          message: "Please Enter The Sender's Name",
          isVisible: true,
        },
      };
    } else if (/\d+/.test(order.senderName)) {
      updateFormErrors = {
        ...updateFormErrors,
        senderNameErrorMsg: {
          message: "Name Cannot Contain Numbers",
          isVisible: true,
        },
      };
    } else if (/[!@#$%^&*(),?":{}|<>]/.test(order.senderName)) {
      updateFormErrors = {
        ...updateFormErrors,
        senderNameErrorMsg: {
          message: "Sender's Name Cannot Contain Special Characters",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        senderNameErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (order.senderContact.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        senderContactErrorMsg: {
          message: "Please Enter The Contact Number",
          isVisible: true,
        },
      };
    } else if (/[a-zA-Z]/.test(order.senderContact)) {
      updateFormErrors = {
        ...updateFormErrors,
        senderContactErrorMsg: {
          message: "Contact Can Contain Only Numbers",
          isVisible: true,
        },
      };
    } else if (/[!@#$%^&*(),?":{}|<>]/.test(order.senderContact)) {
      updateFormErrors = {
        ...updateFormErrors,
        senderContactErrorMsg: {
          message: "Contact Cannot Contain Special Characters",
          isVisible: true,
        },
      };
    } else if (
      order.senderContact.length > 10 ||
      order.senderContact.length < 10
    ) {
      updateFormErrors = {
        ...updateFormErrors,
        senderContactErrorMsg: {
          message: "Contact Should Be A 10 Digit Number",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        senderContactErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (order.senderEmail.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        senderEmailErrorMsg: {
          message: "Please Enter The Sender's Email",
          isVisible: true,
        },
      };
    } else if (!/\S+@\S+\.\S+/.test(order.senderEmail)) {
      updateFormErrors = {
        ...updateFormErrors,
        senderEmailErrorMsg: {
          message: "Please Enter A Valid Email",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        senderEmailErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (order.firstName.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        firstNameErrorMsg: {
          message: "Please Enter The Name",
          isVisible: true,
        },
      };
    } else if (/\d+/.test(order.firstName)) {
      updateFormErrors = {
        ...updateFormErrors,
        firstNameErrorMsg: {
          message: "Name Cannot Contain Numbers",
          isVisible: true,
        },
      };
    } else if (/[!@#$%^&*(),?":{}|<>]/.test(order.firstName)) {
      updateFormErrors = {
        ...updateFormErrors,
        firstNameErrorMsg: {
          message: "Name Cannot Contain Special Characters",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        firstNameErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (order.lastName.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        lastNameErrorMsg: {
          message: "Please Enter The Name",
          isVisible: true,
        },
      };
    } else if (/\d+/.test(order.lastName)) {
      updateFormErrors = {
        ...updateFormErrors,
        lastNameErrorMsg: {
          message: "Name Cannot Contain Numbers",
          isVisible: true,
        },
      };
    } else if (/[!@#$%^&*(),?":{}|<>]/.test(order.lastName)) {
      updateFormErrors = {
        ...updateFormErrors,
        lastNameErrorMsg: {
          message: "Name Cannot Contain Special Characters",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        lastNameErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (order.address.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        addressErrorMsg: {
          message: "Please Enter The Address",
          isVisible: true,
        },
      };
    } else if (/[!@#$%^&*()?":{}|<>]/.test(order.address)) {
      updateFormErrors = {
        ...updateFormErrors,
        addressErrorMsg: {
          message: "Address Cannot Contain Special Characters",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        addressErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (order.city.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        cityErrorMsg: {
          message: "Please Enter The City",
          isVisible: true,
        },
      };
    } else if (/\d+/.test(order.city)) {
      updateFormErrors = {
        ...updateFormErrors,
        cityErrorMsg: {
          message: "City Cannot Contain Numbers",
          isVisible: true,
        },
      };
    } else if (/[!@#$%^&*(),?":{}|<>]/.test(order.city)) {
      updateFormErrors = {
        ...updateFormErrors,
        cityErrorMsg: {
          message: "City Cannot Contain Special Characters",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        cityErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (order.contact.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        contactErrorMsg: {
          message: "Please Enter The Contact Number",
          isVisible: true,
        },
      };
    } else if (/[a-zA-Z]/.test(order.contact)) {
      updateFormErrors = {
        ...updateFormErrors,
        contactErrorMsg: {
          message: "Contact Can Contain Only Numbers",
          isVisible: true,
        },
      };
    } else if (/[!@#$%^&*(),?":{}|<>]/.test(order.contact)) {
      updateFormErrors = {
        ...updateFormErrors,
        contactErrorMsg: {
          message: "Contact Cannot Contain Special Characters",
          isVisible: true,
        },
      };
    } else if (order.contact.length > 10 || order.contact.length < 10) {
      updateFormErrors = {
        ...updateFormErrors,
        contactErrorMsg: {
          message: "Contact Should Be A 10 Digit Number",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        contactErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (order.deliverDate.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        deliverDateErrorMsg: {
          message: "Please Enter The Date To Deliver",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        deliverDateErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    setUpdateFormError(updateFormErrors);
    return (
      updateFormErrors.senderNameErrorMsg.isVisible ||
      updateFormErrors.senderContactErrorMsg.isVisible ||
      updateFormErrors.senderEmailErrorMsg.isVisible ||
      updateFormErrors.firstNameErrorMsg.isVisible ||
      updateFormErrors.lastNameErrorMsg.isVisible ||
      updateFormErrors.addressErrorMsg.isVisible ||
      updateFormErrors.cityErrorMsg.isVisible ||
      updateFormErrors.contactErrorMsg.isVisible ||
      updateFormErrors.deliverDateErrorMsg.isVisible
    );
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleInput = (event) => {
    let updateFormErrors = updateFormError;
    let name = event.target.name;
    let value = event.target.value;

    if (name === "senderName") {
      if (value.length === 0) {
        updateFormErrors = {
          ...updateFormErrors,
          senderNameErrorMsg: {
            message: "Please Enter The Sender's Name",
            isVisible: true,
          },
        };
      } else if (/\d+/.test(value)) {
        updateFormErrors = {
          ...updateFormErrors,
          senderNameErrorMsg: {
            message: "Name Cannot Contain Numbers",
            isVisible: true,
          },
        };
      } else if (/[!@#$%^&*(),?":{}|<>]/.test(value)) {
        updateFormErrors = {
          ...updateFormErrors,
          senderNameErrorMsg: {
            message: "Sender's Name Cannot Contain Special Characters",
            isVisible: true,
          },
        };
      } else {
        updateFormErrors = {
          ...updateFormErrors,
          senderNameErrorMsg: {
            message: "",
            isVisible: false,
          },
        };
        setOrder({ ...order, [name]: value });
      }
      setUpdateFormError(updateFormErrors);
    } else if (name === "senderContact") {
      if (value.length === 0) {
        updateFormErrors = {
          ...updateFormErrors,
          senderContactErrorMsg: {
            message: "Please Enter The Contact Number",
            isVisible: true,
          },
        };
      } else if (/[a-zA-Z]/.test(value)) {
        updateFormErrors = {
          ...updateFormErrors,
          senderContactErrorMsg: {
            message: "Contact Can Contain Only Numbers",
            isVisible: true,
          },
        };
      } else if (/[!@#$%^&*(),?":{}|<>]/.test(value)) {
        updateFormErrors = {
          ...updateFormErrors,
          senderContactErrorMsg: {
            message: "Contact Cannot Contain Special Characters",
            isVisible: true,
          },
        };
      } else if (value.length > 10 || value.length < 10) {
        updateFormErrors = {
          ...updateFormErrors,
          senderContactErrorMsg: {
            message: "Contact Should Be A 10 Digit Number",
            isVisible: true,
          },
        };
      } else {
        updateFormErrors = {
          ...updateFormErrors,
          senderContactErrorMsg: {
            message: "",
            isVisible: false,
          },
        };
        setOrder({ ...order, [name]: value });
      }
      setUpdateFormError(updateFormErrors);
    } else if (name === "senderEmail") {
      if (value.length === 0) {
        updateFormErrors = {
          ...updateFormErrors,
          senderEmailErrorMsg: {
            message: "Please Enter The Sender's Email",
            isVisible: true,
          },
        };
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        updateFormErrors = {
          ...updateFormErrors,
          senderEmailErrorMsg: {
            message: "Please Enter A Valid Email",
            isVisible: true,
          },
        };
      } else {
        updateFormErrors = {
          ...updateFormErrors,
          senderEmailErrorMsg: {
            message: "",
            isVisible: false,
          },
        };
        setOrder({ ...order, [name]: value });
      }
      setUpdateFormError(updateFormErrors);
    } else if (name === "firstName") {
      if (value.length === 0) {
        updateFormErrors = {
          ...updateFormErrors,
          firstNameErrorMsg: {
            message: "Please Enter The Name",
            isVisible: true,
          },
        };
      } else if (/\d+/.test(value)) {
        updateFormErrors = {
          ...updateFormErrors,
          firstNameErrorMsg: {
            message: "Name Cannot Contain Numbers",
            isVisible: true,
          },
        };
      } else if (/[!@#$%^&*(),?":{}|<>]/.test(value)) {
        updateFormErrors = {
          ...updateFormErrors,
          firstNameErrorMsg: {
            message: "Name Cannot Contain Special Characters",
            isVisible: true,
          },
        };
      } else {
        updateFormErrors = {
          ...updateFormErrors,
          firstNameErrorMsg: {
            message: "",
            isVisible: false,
          },
        };
        setOrder({ ...order, [name]: value });
      }
      setUpdateFormError(updateFormErrors);
    } else if (name === "lastName") {
      if (value.length === 0) {
        updateFormErrors = {
          ...updateFormErrors,
          lastNameErrorMsg: {
            message: "Please Enter The Name",
            isVisible: true,
          },
        };
      } else if (/\d+/.test(value)) {
        updateFormErrors = {
          ...updateFormErrors,
          lastNameErrorMsg: {
            message: "Name Cannot Contain Numbers",
            isVisible: true,
          },
        };
      } else if (/[!@#$%^&*(),?":{}|<>]/.test(value)) {
        updateFormErrors = {
          ...updateFormErrors,
          lastNameErrorMsg: {
            message: "Name Cannot Contain Special Characters",
            isVisible: true,
          },
        };
      } else {
        updateFormErrors = {
          ...updateFormErrors,
          lastNameErrorMsg: {
            message: "",
            isVisible: false,
          },
        };
        setOrder({ ...order, [name]: value });
      }
      setUpdateFormError(updateFormErrors);
    } else if (name === "address") {
      if (value.length === 0) {
        updateFormErrors = {
          ...updateFormErrors,
          addressErrorMsg: {
            message: "Please Enter The Address",
            isVisible: true,
          },
        };
      } else if (/[!@#$%^&*()?":{}|<>]/.test(value)) {
        updateFormErrors = {
          ...updateFormErrors,
          addressErrorMsg: {
            message: "Address Cannot Contain Special Characters",
            isVisible: true,
          },
        };
      } else {
        updateFormErrors = {
          ...updateFormErrors,
          addressErrorMsg: {
            message: "",
            isVisible: false,
          },
        };
        setOrder({ ...order, [name]: value });
      }
      setUpdateFormError(updateFormErrors);
    } else if (name === "city") {
      if (value.length === 0) {
        updateFormErrors = {
          ...updateFormErrors,
          cityErrorMsg: {
            message: "Please Enter The City",
            isVisible: true,
          },
        };
      } else if (/\d+/.test(value)) {
        updateFormErrors = {
          ...updateFormErrors,
          cityErrorMsg: {
            message: "City Cannot Contain Numbers",
            isVisible: true,
          },
        };
      } else if (/[!@#$%^&*(),?":{}|<>]/.test(value)) {
        updateFormErrors = {
          ...updateFormErrors,
          cityErrorMsg: {
            message: "City Cannot Contain Special Characters",
            isVisible: true,
          },
        };
      } else {
        updateFormErrors = {
          ...updateFormErrors,
          cityErrorMsg: {
            message: "",
            isVisible: false,
          },
        };
        setOrder({ ...order, [name]: value });
      }
      setUpdateFormError(updateFormErrors);
    } else if (name === "contact") {
      if (value.length === 0) {
        updateFormErrors = {
          ...updateFormErrors,
          contactErrorMsg: {
            message: "Please Enter The Contact Number",
            isVisible: true,
          },
        };
      } else if (/[a-zA-Z]/.test(value)) {
        updateFormErrors = {
          ...updateFormErrors,
          contactErrorMsg: {
            message: "Contact Can Contain Only Numbers",
            isVisible: true,
          },
        };
      } else if (/[!@#$%^&*(),?":{}|<>]/.test(value)) {
        updateFormErrors = {
          ...updateFormErrors,
          contactErrorMsg: {
            message: "Contact Cannot Contain Special Characters",
            isVisible: true,
          },
        };
      } else if (value.length > 10 || value.length < 10) {
        updateFormErrors = {
          ...updateFormErrors,
          contactErrorMsg: {
            message: "Contact Should Be A 10 Digit Number",
            isVisible: true,
          },
        };
      } else {
        updateFormErrors = {
          ...updateFormErrors,
          contactErrorMsg: {
            message: "",
            isVisible: false,
          },
        };
        setOrder({ ...order, [name]: value });
      }
      setUpdateFormError(updateFormErrors);
    } else if (name === "deliverDate") {
      today.setDate(today.getDate() + 2);

      if (value.length === 0) {
        updateFormErrors = {
          ...updateFormErrors,
          deliverDateErrorMsg: {
            message: "Please Enter The Date To Deliver",
            isVisible: true,
          },
        };
      } else if (value < today.toISOString().substring(0, 10)) {
        updateFormErrors = {
          ...updateFormErrors,
          deliverDateErrorMsg: {
            message: "Order Should Placed At Least 2 Days before",
            isVisible: true,
          },
        };
      } else {
        updateFormErrors = {
          ...updateFormErrors,
          deliverDateErrorMsg: {
            message: "",
            isVisible: false,
          },
        };
        setOrder({ ...order, [name]: value });
      }
      setUpdateFormError(updateFormErrors);
    } else if (name === "deliverTime") {
      today.setDate(today.getDate() + 2);

      if (value.length === 0) {
        updateFormErrors = {
          ...updateFormErrors,
          deliverTimeErrorMsg: {
            message: "Please Enter The Time To Deliver",
            isVisible: true,
          },
        };
      } else {
        updateFormErrors = {
          ...updateFormErrors,
          deliverTimeErrorMsg: {
            message: "",
            isVisible: false,
          },
        };
        setOrder({ ...order, [name]: value });
      }
      setUpdateFormError(updateFormErrors);
    } else if (name === "message") {
      setOrder({ ...order, [name]: value });
    }
    setUpdateFormError(updateFormErrors);
  };

  const [pamentDone, setPaymentDone] = useState("Not completed");

  const handlepayment = (order, payment, hash) => {
    let paymentDetails = {
      sandbox: true,
      merchant_id: "1222544", // Replace your Merchant ID
      return_url: undefined, // Important
      cancel_url: undefined, // Important
      notify_url:
        "http://fb63-2402-4000-20c3-7584-70b2-9d0-9d69-2e9c.ngrok-free.app/notify",
      order_id: payment._id,
      items: "Order Dfh3480021192G",
      amount: payment.total,
      currency: "LKR",
      hash: hash, // *Replace with generated hash retrieved from backend
      first_name: order.senderName,
      last_name: "Perera",
      email: order.senderEmail,
      phone: order.senderContact,
      address: "Colombo",
      city: "Colombo",
      country: "Sri Lanka",
      delivery_address: order.address,
      delivery_city: order.city,
      delivery_country: "Sri Lanka",
    };

    window.payhere.startPayment(paymentDetails);
    let orderId = payment._id;
    window.payhere.onCompleted = (orderId) => {
      console.log(orderId);
      fetch("/confirmPayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentId: orderId,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          setPaymentDone("Payment Completed");
        })
        .catch((error) => {
          console.log("error fetching:", error);
        });
      swal("Success", "Order Placed Successfully", "success", {
        button: false,
        timer: 1700,
      }).then((value) => {
        navigate("/profile");
      });
    };
    window.payhere.onDismissed = () => {
      console.log("payment canceled");
      setPaymentDone("Payment canceled");
    };
    window.payhere.onError = () => {
      setPaymentDone("Payment Error");
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let validated = validateProductInput();

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
      total,
      orderPlacedDate,
      status,
      products,
    } = order;

    if (!validated) {
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
            total,
            orderPlacedDate,
            status,
            products,
          }),
        });
        if (res.status === 400 || !res) {
          window.alert("Invalid Credentials");
        } else {
          const data = await res.json();
          let order = data.createCart;
          let payment = data.payment;
          let hash = data.hash;

          handlepayment(order, payment, hash);

          console.log(event.target);
        }
      } catch (error) {
        console.log("ERROR IS", error);
      }
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <OrderSenderDetails
            order={order}
            handleInput={handleInput}
            updateFormError={updateFormError}
          />
        );
      case 1:
        return (
          <OrderReceiverDetails
            handleInput={handleInput}
            updateFormError={updateFormError}
          />
        );
      case 2:
        return (
          <OrderDetails
            handleInput={handleInput}
            updateFormError={updateFormError}
          />
        );
      case 3:
        return <Review order={order} updateFormError={updateFormError} />;
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
