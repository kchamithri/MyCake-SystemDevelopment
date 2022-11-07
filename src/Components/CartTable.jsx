import React from "react";
import { QuantityPicker } from "react-qty-picker";

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
            <th>2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th>3</th>
            <td colSpan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
