import React from "react";

const LongCard = (props) => {
  return (
    <div className="container">
      <div
        className="card my-4 relative shadow"
        style={{ backgroundColor: "#F2F2F2" }}
      >
        <div className="row">
          <div className="col-md-9 col-sm-8 d-flex flex-md-column justify-content-center align-items-center">
            <h2 className="card-title" style={{ fontFamily: "cursive" }}>
              {props.title}
            </h2>
            <button className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm ">
              Click Here
            </button>
          </div>
          <div className="mr-1 col-md-3 col-sm-4" style={{ opacity: "0.9" }}>
            <img src={props.image} className="img-fluid" alt="abcd"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LongCard;
