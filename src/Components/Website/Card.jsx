import React from "react";

const Card = (props) => {
  return (
    <div className="col">
      <div className="card h-100" style={{ width: "90%" }}>
        <img
          src={props.image}
          className="card-img-top"
          alt={props.altName}
          style={{ height: "10rem" }}
        />
        <div className="card-body">
          <h6 className="card-title">{props.name}</h6>
          <p className="card-text">{props.price}</p>
        </div>
        <button className="btn btn-outline-info btn-sm">Add to cart</button>
      </div>
    </div>
  );
};

export default Card;
