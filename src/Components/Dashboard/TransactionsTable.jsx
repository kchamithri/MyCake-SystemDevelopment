import React from "react";
import { Table } from "react-bootstrap";

const TransactionsTable = () => {
  return (
    <div className="card">
      <div
        className="rounded-top fs-6 fw-bold"
        style={{
          backgroundColor: "green",
          height: "40px",
          padding: "4px 0px 4px 4px",
        }}
      >
        Transactions
      </div>
      <Table>
        <thead>
          <tr style={{ color: "green" }}>
            <th>Product</th>
            <th>Supplier</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sugar</td>
            <td>D.S Wimal stores</td>
            <td>22/03/2022</td>
            <td>3kg</td>
            <td>Rs. 2000</td>
          </tr>
          <tr>
            <td>Sugar</td>
            <td>D.S Wimal stores</td>
            <td>22/03/2022</td>
            <td>3kg</td>
            <td>Rs. 2000</td>
          </tr>
          <tr>
            <td>Sugar</td>
            <td>D.S Wimal stores</td>
            <td>22/03/2022</td>
            <td>3kg</td>
            <td>Rs. 2000</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TransactionsTable;
