import React from "react";

const LongCard = () => {
  return (
    <div className="mb-4 mt-4 container relative">
      <div className="row mx-auto border h-100">
        <div
          className="col-9 d-flex align-items-center"
          style={{ backgroundColor: "#b1397a" }}
        >
          <h2 className="mx-auto">Customize Your Own Cake</h2>
          <button className="d-inline-block btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm">
            Click Here
          </button>
        </div>

        <div className="col-3 p-0 h-100">
          <img
            src="Assets/cake2.jpg"
            className="d-block img-fluid mh-100 w-100"
            alt="abcd"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default LongCard;
