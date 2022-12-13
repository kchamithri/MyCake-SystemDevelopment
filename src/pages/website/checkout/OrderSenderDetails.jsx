import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const OrderSenderDetails = ({ handleInput }) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order Sender Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            type="text"
            id="senderName"
            name="senderName"
            label="Name"
            fullWidth
            autoComplete="name"
            variant="standard"
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="senderContact"
            name="senderContact"
            label="Contact Number"
            fullWidth
            type="text"
            variant="standard"
            required
            autoComplete="senderContact"
            onChange={handleInput}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="senderEmail"
            name="senderEmail"
            label="Email"
            fullWidth
            type="text"
            autoComplete="senderEmail"
            variant="standard"
            onChange={handleInput}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default OrderSenderDetails;
