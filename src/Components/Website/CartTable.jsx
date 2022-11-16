import React from "react";
import { QuantityPicker } from "react-qty-picker";
import { NavLink } from "react-router-dom";

const CartTable = (getPickerValue) => {
  return (
    <div className="table-responsive">
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
          <tr>
            <td className="w-25">
              <img
                className="rounded"
                src="Assets/cake2.jpg"
                alt="cake"
                style={{ width: "70%" }}
              ></img>
            </td>
            <td className="align-middle text-center fs-4 w-25">
              Chocolate Dripped Cake
            </td>
            <td className="align-middle text-center fs-5 " width={"15%"}>
              Rs.5000
            </td>
            <td className="align-middle text-center fs-4">
              <QuantityPicker
                smooth
                min={1}
                value={1}
                onChange={getPickerValue}
              />
            </td>
            <td className="align-middle text-center fs-5 w-25">Rs.5000</td>
            <td className="align-middle">
              <a href="#">
                <i
                  className="fa fa-times"
                  aria-hidden="true"
                  style={{ color: "black" }}
                ></i>
              </a>
            </td>
          </tr>
          <tr>
            <td colSpan={4}></td>
            <td className="fs-5" style={{ textAlign: "center" }}>
              Total(Rs) : 5000
            </td>
          </tr>
          <tr>
            <td colSpan={4}></td>
            <td className="fs-5" style={{ textAlign: "center" }}>
              <NavLink
                to="/checkout"
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
