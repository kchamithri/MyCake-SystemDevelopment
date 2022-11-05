import React from "react";

const Card = (props) => {
  return (
    <div className="col">
      <div className="card h-100">
        <img
          src={props.image}
          className="card-img-top"
          alt={props.altName}
          style={{ height: "200px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
