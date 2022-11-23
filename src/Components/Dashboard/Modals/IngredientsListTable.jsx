import React from "react";
import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import "../../../Styles/Dashboard.css";

const IngredientsListTable = ({show, closeModal}) => {
  
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
        </Modal.Body>
      </Modal>
    
  );
};

export default IngredientsListTable;
