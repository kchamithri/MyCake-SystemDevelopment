import React from "react";
import CartTable from "../Components/Website/CartTable";

const Cart = () => {
  const getPickerValue = (value) => {
    console.log(value);
  };

  const handleItems = () => {};
  return (
    <div className="container mt-4">
      <div className="row">
        <h3>Product Details</h3>
      </div>
      <div className="row">
        <CartTable getPickerValue={getPickerValue} handleItems={handleItems} />
      </div>
    </div>
  );
};

export default Cart;
