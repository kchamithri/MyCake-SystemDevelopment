import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";

const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

export default function Review({ order }) {
  const [products, setProducts] = React.useState([]);
  const [grandTotal, setGrandTotal] = React.useState(0);
  const [receivedOrder, setReceivedOrder] = React.useState({});

  React.useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("cart") || "[]"));
    console.log(JSON.parse(localStorage.getItem("cart") || "[]"));
    setReceivedOrder(order);
  }, []);

  React.useEffect(() => {
    console.log(
      products.map((item) => {
        return item.product;
      })
    );
  }, [products]);

  React.useEffect(() => {
    let price = 0;
    products.map((data) => {
      price = price + data.total;
    });
    setGrandTotal(price);
  }, [products]);
  React.useEffect(() => {
    console.log(receivedOrder);
  }, [receivedOrder]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((item) => (
          <ListItem key={item._id} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={item.product.name}
              secondary={<>Quantity: {item.quantity}</>}
            />

            <Typography variant="body2">{item.total}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {grandTotal}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Deliver To
          </Typography>
          <Typography gutterBottom>
            {order.firstName + " " + order.lastName}
          </Typography>
          <Typography gutterBottom>{order.address}</Typography>
        </Grid>
        {/* <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            <React.Fragment key="cardType">
              <Grid item xs={6}>
                <Typography gutterBottom>Card Type</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{order.cardType}</Typography>
              </Grid>
            </React.Fragment>
            <React.Fragment key="cardHolder">
              <Grid item xs={6}>
                <Typography gutterBottom>Card Holder</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Visa</Typography>
              </Grid>
            </React.Fragment>
            <React.Fragment key="cardNumber">
              <Grid item xs={6}>
                <Typography gutterBottom>Card number</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{order.cardNumber}</Typography>
              </Grid>
            </React.Fragment>
            <React.Fragment key="expiryDate">
              <Grid item xs={6}>
                <Typography gutterBottom>Expiry date</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{order.expDate}</Typography>
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}
