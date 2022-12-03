import React from "react";
import CartTable from "../Components/Website/CartTable";
import Footer from "../Components/Website/Footer";

const Cart = () => {
  const getPickerValue = (value) => {
    console.log(value);
  };

  const handleItems = () => {};
  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <h3>Cart Details</h3>
        </div>
        <div className="row border border-darker">
          <CartTable
            getPickerValue={getPickerValue}
            handleItems={handleItems}
          />
        </div>
      </div>
      <div className="fixed-bottom">
        <Footer />
      </div>
    </>
  );
};

export default Cart;
