import React from "react";

const Tile = ({ date, title, quantity }) => {
  return (
    <div className="col col-sm-12 mb-1">
      <div className="card shadow">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <i className="fa fa-gift" aria-hidden="true"></i>
            <h6 className="card-subtitle text-muted">{date}</h6>
          </div>

          <p className="d-flex card-text mt-1 justify-content-center align-items-center">
            {quantity}
          </p>
          <h6 className="fw-bold">{title}</h6>
        </div>
      </div>
    </div>
  );
};

export default Tile;
