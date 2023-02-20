import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function OrderReceiverDetails({ handleInput, updateFormError }) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order Receiver Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="text"
            id="firstName"
            name="firstName"
            label="First Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={handleInput}
            error={updateFormError.firstNameErrorMsg.isVisible}
            helperText={updateFormError.firstNameErrorMsg.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last Name"
            fullWidth
            type="text"
            autoComplete="family-name"
            variant="standard"
            onChange={handleInput}
            error={updateFormError.lastNameErrorMsg.isVisible}
            helperText={updateFormError.lastNameErrorMsg.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            type="text"
            autoComplete="shipping address"
            variant="standard"
            onChange={handleInput}
            error={updateFormError.addressErrorMsg.isVisible}
            helperText={updateFormError.addressErrorMsg.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            type="text"
            autoComplete="city"
            variant="standard"
            onChange={handleInput}
            error={updateFormError.cityErrorMsg.isVisible}
            helperText={updateFormError.cityErrorMsg.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="contact"
            name="contact"
            label="Contact Number"
            fullWidth
            type="text"
            variant="standard"
            required
            onChange={handleInput}
            error={updateFormError.contactErrorMsg.isVisible}
            helperText={updateFormError.contactErrorMsg.message}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
