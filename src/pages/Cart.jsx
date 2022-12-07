import swal from "@sweetalert/with-react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartTable from "../Components/Website/CartTable";
import Footer from "../Components/Website/Footer";
import Login from "./Login";

const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);

  let userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetch("/cart/get", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const newarr = data.carts.map((data) => {
            return data;
          });
          console.log(newarr);
          setCartData(newarr);
        })
        .catch((error) => {
          console.log("error fetching:", error);
        });
    } else {
      swal("Sign In Required", "Please Sign In to the system!", "info", {
        button: false,
        timer: 2000,
      }).then((value) => {
        navigate("/login");
      });
    }
  }, []);

  return (
    <>
      <div className="container mt-4">
        {userId ? (
          <>
            <div className="row">
              <h3>Cart Details</h3>
            </div>
            <div className="row border border-darker">
              <CartTable cartData={cartData} />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      {/* <div className="fixed-bottom">
        <Footer />
      </div> */}
    </>
  );
};

export default Cart;
