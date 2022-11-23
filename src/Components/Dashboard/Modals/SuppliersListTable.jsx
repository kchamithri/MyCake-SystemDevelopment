import React from "react";
import { Modal, Table } from "react-bootstrap";

const SuppliersListTable = ({ show, closeModal }) => {
  return (
    <Modal show={show} onHide={closeModal} size="lg" scrollable={true}>
      <Modal.Header
        closeButton
        style={{ backgroundColor: "green" }}
      ></Modal.Header>
      <Modal.Title style={{ backgroundColor: "green", fontSize: "18px" }}>
        <ul>
          <li>Name: K.C.M Gangodawila</li>
          <li>Contact: 0786545345</li>
          <li>Address: Horana</li>
          <li>Email: kc@gmail.com</li>
        </ul>
      </Modal.Title>

      <Modal.Body>
        <div className="conatiner-fluid">
          <div className="row">
            <div className="col-lg-10">
              <Table>
                <thead>
                  <tr style={{ color: "green" }}>
                    <th>Product</th>
                    <th> Date</th>
                    <th>Amount</th>
                    <th>Price </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sugar</td>
                    <td>11/11/2022</td>
                    <td>3kg</td>
                    <td>20000</td>
                  </tr>
                  <tr>
                    <td>Flour</td>
                    <td>11/11/2022</td>
                    <td>3kg</td>
                    <td>20000</td>
                  </tr>
                  <tr>
                    <td>Eggs</td>
                    <td>11/11/2022</td>
                    <td>3kg</td>
                    <td>20000</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="col-lg-2">
              <Table className="table table-borderless">
                <thead>
                  <tr style={{ color: "green" }}>
                    <th>Products</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Flour</td>
                  </tr>
                  <tr>
                    <td>Sugar</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SuppliersListTable;
