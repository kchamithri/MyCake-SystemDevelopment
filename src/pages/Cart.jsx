import React from "react";
import CartTable from "../Components/CartTable";

const Cart = () => {
  const getPickerValue = (value) => {
    console.log(value);
  };
  return (
    <div className="container">
      <div className="row">
        <h3>Product Details</h3>
      </div>
      <div className="row">
        <CartTable getPickerValue={getPickerValue} />
      </div>
    </div>
  );
};

export default Cart;
