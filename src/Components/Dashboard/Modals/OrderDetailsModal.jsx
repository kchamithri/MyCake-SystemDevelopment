import React from "react";
import { Button, Modal } from "react-bootstrap";

const OrderDetailsModal = ({ modalData }) => {
  return (
    <ul class="list-group">
      <li class="list-group-item">
        <ul class="list-group list-group-flush">
          <li class="list-group-item list-group-item-primary">
            Order No: {modalData._id}
          </li>
          <li class="list-group-item">Name: {modalData.senderName}</li>
          <li class="list-group-item">
            Order Placed Date: {modalData.orderPlacedDate.split("T")[0]}
          </li>
          <li class="list-group-item">Contact: {modalData.senderContact}</li>
        </ul>
      </li>
      <li class="list-group-item">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            Recepient: {modalData.firstName + " " + modalData.lastName}
          </li>
          <li class="list-group-item">Deliver Date: {modalData.deliverDate}</li>
          <li class="list-group-item">Delivery Address: {modalData.address}</li>
          <li class="list-group-item">Contact: {modalData.contact}</li>
        </ul>
      </li>
      <li class="list-group-item">
        <ul class="list-group list-group-flush">
          {modalData.products.map((item) => {
            return (
              <>
                <li class="list-group-item">Product: {item.product.name}</li>
                <li class="list-group-item">Quantity:{item.quantity}</li>
              </>
            );
          })}

          <li class="list-group-item">Message: {modalData.message}</li>
        </ul>
      </li>
    </ul>
  );
};

export default OrderDetailsModal;
