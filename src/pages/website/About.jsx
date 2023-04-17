import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Footer from "../../Components/Website/Footer";

const About = () => {
  return (
    <>
      <Grid container spacing={2} marginTop={4} paddingLeft="100px">
        <Grid
          item
          xs={6}
          md={6}
          sm={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography component="div">
            <Box
              sx={{
                fontWeight: "bold",
                m: 1,
                fontSize: 35,
              }}
            >
              <span style={{ color: "#b1397a" }}>Make </span> Your Day{" "}
              <span style={{ color: "#b1397a" }}> Great</span>
              <br />
              With Our <span style={{ color: "#CB1C8D" }}>Food!</span>
            </Box>
            <Box sx={{ fontWeight: "regular", m: 1, fontSize: 15 }}>
              Welcome to our shop! Here, you will find a wide selection of
              delicious cakes and party food that will satisfy your sweet
              cravings. Our food are made with high-quality ingredients and
              baked to perfection by our expert bakers. Whether you're
              celebrating a special occasion or just want to treat yourself, our
              cakes are perfect for any occasion.
            </Box>
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/Assets/womanBaking.jpg"
            alt="chef"
            style={{ height: "500px", width: "500px" }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} marginTop={2}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography component="div">
            <Box
              sx={{
                fontWeight: "bold",
                m: 1,
                fontSize: 35,
                color: "#b1397a",
              }}
            >
              What We Have?
            </Box>
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          md={6}
          sm={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/Assets/cakes-vector.jpg"
            alt="chef"
            style={{ height: "300px", width: "300px" }}
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/Assets/pastry-vec.jpg"
            alt="chef"
            style={{ height: "300px", width: "300px" }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} marginTop={2} marginBottom={4}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography component="div">
            <Box
              sx={{
                fontWeight: "bold",
                m: 1,
                fontSize: 35,
                color: "#b1397a",
              }}
            >
              Frequently Asked Questions
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} sm={12} paddingLeft={6}>
          <Box sx={{ paddingX: "60px" }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  <Box
                    sx={{
                      fontWeight: "bold",
                      m: 1,
                      fontSize: 15,
                    }}
                  >
                    How to make an order?{" "}
                  </Box>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  You can create an account, choose the food item you need and
                  add it to your cart. Then proceed to checkout, fill the
                  necessary details, make the payment which is in the same
                  process Once you place an order you can view the details in
                  your profile.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>
                  {" "}
                  <Box
                    sx={{
                      fontWeight: "bold",
                      m: 1,
                      fontSize: 15,
                    }}
                  >
                    Can we make an immediate order?
                  </Box>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  You can only order two days prior to the date you need to get
                  your order.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>
                  {" "}
                  <Box
                    sx={{
                      fontWeight: "bold",
                      m: 1,
                      fontSize: 15,
                    }}
                  >
                    Do you Deliver Islanwide?
                  </Box>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Yes, we do. Please provide the correct location of where your
                  order should be delivered at the ordering process.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default About;
