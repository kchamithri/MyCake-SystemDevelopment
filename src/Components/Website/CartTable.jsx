import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ReactNotifications, Store } from "react-notifications-component";
import { QuantityPicker } from "react-qty-picker";
import { NavLink } from "react-router-dom";

const CartTable = ({ cartData }) => {
  const [productDetails, setProductDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState("");
  const [value, setValue] = useState("");

  //change the totla price for row based on the value of the picker
  const handlePrice = (value, id) => {
    setProductDetails((productDetails) =>
      productDetails.map((item) =>
        item._id === id
          ? { ...item, quantity: value, total: item.product.price * value }
          : item
      )
    );
  };

  useEffect(() => {
    console.log(cartData);
    setProductDetails(cartData);
  }, [cartData]);

  // useEffect(() => {
  //   console.log(productDetails);
  // }, [productDetails]);

  //calculate the grand price in each time the product details change
  useEffect(() => {
    let price = 0;
    productDetails.map((data) => {
      price = price + data.total;
    });
    setTotalPrice(price);
    //setting the remaining products in the cart in the localstorage for checkout
    localStorage.setItem("cart", JSON.stringify(productDetails));
    console.log(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, [productDetails]);

  //remove items from the cart
  const handleRemoveItems = (productId) => {
    const newProductArray = productDetails.filter(
      (data) => data._id !== productId
    );
    setProductDetails(newProductArray);

    let deleteId = [];

    deleteId = productDetails
      .filter((data) => data._id === productId)
      .map((data) => data._id)[0];

    console.log(deleteId);

    try {
      fetch("/admin/cart/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: deleteId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          Store.addNotification({
            title: "One Item Removed!",
            width: "200px",
            type: "info",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "animate__fadeIn"],
            animationOut: ["animated", "animate__fadeOut"],
            dismiss: {
              duration: 2000,
            },
          });
        })
        .catch((error) => {
          console.log("ERROR IS", error);
        });
    } catch (error) {
      console.log("ERROR IS", error);
    }
    console.log(newProductArray);
  };

  return (
    <div className="table-responsive">
      <ReactNotifications />
      <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col" className="text-center">
              Price
            </th>
            <th scope="col" className="text-center">
              Quantity
            </th>
            <th scope="col" className="text-center">
              Total
            </th>
            <th scope="col" className="text-center"></th>
          </tr>
        </thead>
        <tbody>
          {productDetails.map((data) => {
            return (
              <tr key={data._id}>
                <td className="w-25">
                  <img
                    className="rounded"
                    src={data.product.mainImage}
                    alt="cake"
                    style={{ width: "70%" }}
                  ></img>
                </td>
                <td className="align-middle text-center fs-4 w-25">
                  {data.product.name}
                </td>
                <td className="align-middle text-center fs-5 " width={"15%"}>
                  Rs.{data.product.price}
                </td>
                <td className="align-middle text-center fs-4">
                  <QuantityPicker
                    smooth
                    min={data.product.category === "Party Packs" ? 12 : 1}
                    value={data.quantity}
                    onChange={(value) => {
                      console.log(value);
                      handlePrice(value, data._id);
                    }}
                  />
                </td>
                <td className="align-middle text-center fs-5 w-25">
                  Rs.{data.total}
                </td>
                <td className="align-middle">
                  <i
                    className="fa fa-times"
                    aria-hidden="true"
                    style={{ color: "black" }}
                    onClick={() => handleRemoveItems(data._id)}
                  ></i>
                </td>
              </tr>
            );
          })}

          <tr>
            <td colSpan={4}></td>
            <td className="fs-5" style={{ textAlign: "center" }}>
              Total(Rs) : {totalPrice}
            </td>
          </tr>
          <tr>
            <td colSpan={4}></td>
            <td className="fs-5" style={{ textAlign: "center" }}>
              <NavLink
                to="/checkout"
                state={{ total: totalPrice }}
                className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm"
              >
                Checkout
              </NavLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
