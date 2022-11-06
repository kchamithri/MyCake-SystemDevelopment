import React from "react";

const HomeCards = (props) => {
  return (
    <div className="col">
      <div className="card h-100" style={{ width: "90%" }}>
        <img
          src={props.image}
          className="card-img-top"
          alt={props.altName}
          style={{ height: "12rem" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeCards;
