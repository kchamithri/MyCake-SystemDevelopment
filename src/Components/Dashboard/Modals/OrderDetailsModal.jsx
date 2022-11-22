import React from "react";
import { Button, Modal } from "react-bootstrap";

const OrderDetailsModal = () => {
  return (
    <ul class="list-group">
      <li class="list-group-item">
        <ul class="list-group list-group-flush">
          <li class="list-group-item list-group-item-primary">Order No:</li>
          <li class="list-group-item">Name:</li>
          <li class="list-group-item">Order Placed Date:</li>
          <li class="list-group-item">Contact:</li>
        </ul>
      </li>
      <li class="list-group-item">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Recepient:</li>
          <li class="list-group-item">Deliver Date:</li>
          <li class="list-group-item">Delivery Address:</li>
          <li class="list-group-item">Contact:</li>
        </ul>
      </li>
      <li class="list-group-item">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Product:</li>
          <li class="list-group-item">Quantity:</li>
          <li class="list-group-item">Message:</li>
        </ul>
      </li>
    </ul>
  );
};

export default OrderDetailsModal;
