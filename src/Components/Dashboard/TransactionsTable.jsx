import React from 'react'
import { Table } from 'react-bootstrap';

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
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Otto</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>Otto</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>Otto</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default TransactionsTable
