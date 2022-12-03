import React from "react";
import { Table } from "react-bootstrap";

const ProductsViewTable = ({ handleButton }) => {
  return (
    <div>
      <Table>
        <thead>
          <tr style={{ color: "green" }}>
            <th width="20%">Food Item</th>
            <th>Category</th>
            <th>Type</th>
            <th>Weight</th>
            <th>Price</th>
            <th width="20%">Product Description</th>
            <th width="30%"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Swan Chocolate Cake</td>
            <td>Cake</td>
            <td>Birthday Cake</td>
            <td>2kg</td>
            <td>Rs.3000</td>
            <td>abcssssd</td>

            <td align="right">
              <button
                type="button"
                className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm mx-1"
                value="update"
                onClick={handleButton}
              >
                View More
              </button>
              <button
                type="button"
                className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm mx-1"
                value="update"
                onClick={handleButton}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
          <tr>
            <td>Swan Chocolate Cake</td>
            <td>Cake</td>
            <td>Birthday Cake</td>
            <td>2kg</td>
            <td>Rs.3000</td>
            <td>ABCD</td>

            <td align="right">
              <button
                type="button"
                className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm mx-1"
                value="update"
                onClick={handleButton}
              >
                View More
              </button>
              <button
                type="button"
                className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm mx-1"
                value="update"
                onClick={handleButton}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
          <tr>
            <td>Swan Chocolate Cake</td>
            <td>Cake</td>
            <td>Birthday Cake</td>
            <td>2kg</td>
            <td>Rs.3000</td>
            <td>abcd</td>

            <td align="right">
              <button
                type="button"
                className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm mx-1"
                value="update"
                onClick={handleButton}
              >
                View More
              </button>
              <button
                type="button"
                className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm mx-1"
                value="update"
                onClick={handleButton}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ProductsViewTable;
