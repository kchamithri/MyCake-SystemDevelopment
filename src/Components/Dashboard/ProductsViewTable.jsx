import React from "react";
import { Table } from "react-bootstrap";

const ProductsViewTable = ({
  handleAdd,
  products,
  handleDelete,
  handleEdit,
}) => {
  return (
    <div>
      <Table>
        <thead>
          <tr style={{ color: "green" }}>
            <th width="15%">Food Item</th>
            <th>Category</th>
            <th>Type</th>
            <th>Weight</th>
            <th>Price</th>
            <th width="20%">Product Description</th>
            <th width="30%"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((data) => {
            return (
              <tr key={data._id}>
                <td>{data.name}</td>
                <td>{data.category}</td>
                <td>{data.type}</td>
                <td>{data.weight} kg</td>
                <td> Rs. {data.price}</td>
                <td>{data.description}</td>

                <td align="right">
                  <button
                    type="button"
                    className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm mx-1"
                    value="update"
                    onClick={handleAdd}
                  >
                    View More
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm mx-1"
                    value="update"
                    onClick={() => handleEdit(data._id, data.category)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm"
                    onClick={() => handleDelete(data._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductsViewTable;
