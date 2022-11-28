import React from "react";
import { useState } from "react";
import ProductViewModal from "./ZoomProduct/ProductViewModal";

const Card = (props) => {
  return (
    <div className="col">
      <div className="card h-100" style={{ width: "90%" }}>
        <img
          src={props.image}
          className="card-img-top"
          alt={props.altName}
          style={{ height: "10rem" }}
          onClick={() => props.handleModal(props.id)}
        />
        <div className="card-body">
          <h6 className="card-title">{props.name}</h6>
          <p className="card-text">Rs. {props.price}</p>
        </div>
        <button
          className="btn btn-outline-info btn-sm"
          onClick={() => props.handleAddToCart(props.id)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Card;
