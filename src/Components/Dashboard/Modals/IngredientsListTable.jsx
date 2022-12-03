import React from "react";
import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import "../../../Styles/Dashboard.css";

const IngredientsListTable = ({ show, openEditModal, closeModal }) => {
  return (
    <Modal show={show} onHide={closeModal} size="lg" scrollable={true}>
      <Modal.Header closeButton style={{ backgroundColor: "green" }}>
        <Modal.Title>Flour</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table>
          <thead>
            <tr style={{ color: "green" }}>
              <th>Status</th>
              <th>Received Date</th>
              <th>Expiry Date</th>
              <th>Quantity Updated</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Purchased</td>
              <td>03/10/2022</td>
              <td>04/10/2022</td>
              <td>2kg</td>
              <td>Rs.3000</td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm mx-1"
                  onClick={() => {
                    closeModal();
                    openEditModal();
                  }}
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
              <td>Purchased</td>
              <td>03/10/2022</td>
              <td>04/10/2022</td>
              <td>2kg</td>
              <td>Rs.3000</td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm mx-1"
                  onClick={() => {
                    closeModal();
                    openEditModal();
                  }}
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
              <td>Purchased</td>
              <td>03/10/2022</td>
              <td>04/10/2022</td>
              <td>2kg</td>
              <td>Rs.3000</td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm mx-1"
                  onClick={() => {
                    closeModal();
                    openEditModal();
                  }}
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
      </Modal.Body>
    </Modal>
  );
};

export default IngredientsListTable;
