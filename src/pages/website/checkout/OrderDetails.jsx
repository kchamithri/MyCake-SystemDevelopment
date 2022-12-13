import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Col, Form } from "react-bootstrap";
import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const OrderDetails = ({ handleInput }) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order Sender Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">
              Date to Deliver
            </InputLabel>
            <Input
              type="date"
              id="deliverDate"
              name="deliverDate"
              onChange={handleInput}
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <CalendarMonthIcon />
                </InputAdornment>
              }
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="deliverTime"
            name="deliverTime"
            select
            label="Time to Deliver"
            fullWidth
            required
            // value={currency}
            onChange={handleInput}
            helperText="Please select Preferred deliver Time"
            variant="standard"
          >
            <MenuItem key="morning" value="Morning">
              Morning
            </MenuItem>
            <MenuItem key="noon" value="Noon">
              Noon
            </MenuItem>
            <MenuItem key="night" value="Night">
              Night
            </MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="message"
            name="message"
            label="Message"
            fullWidth
            type="text"
            autoComplete="message"
            variant="standard"
            onChange={handleInput}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default OrderDetails;
