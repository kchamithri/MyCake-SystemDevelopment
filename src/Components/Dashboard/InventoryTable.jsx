import React from "react";

const InventoryTable = ({ tableName }) => {
  return (
    <div className="card pb-2">
      <div
        className="rounded-top fs-6 fw-bold"
        style={{
          backgroundColor: "green",
          height: "80%",
          padding: "4px 0px 0px 4px",
        }}
      >
        <div className="d-flex justify-content-between">
          {tableName}
          <button
            type="button"
            className="btn btn-link btn-sm"
            style={{ textDecoration: "none", color: "white" }}
          >
            View All
            <i className="fa fa-angle-double-right mx-1" aria-hidden="true" />
          </button>
        </div>
        <div
          className="rounded-top fs-6 fw-normal text-muted shadow"
          style={{ backgroundColor: "white", height: "10%", marginTop: "2%" }}
        >
          Low in Stock : 03 Items
        </div>
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="card mt-2" style={{ width: "98%" }}>
          <div className="card-body">
            <h5 className="card-title" style={{ fontSize: "95%" }}>
              Dates
            </h5>
            <p className="mb-0" style={{ color: "red" }}>
              Available : Not Available
            </p>
          </div>
        </div>
        <div className="card mt-2" style={{ width: "98%" }}>
          <div className="card-body">
            <h5 className="card-title" style={{ fontSize: "95%" }}>
              Flour
            </h5>
            <p className="mb-0" style={{ color: "red" }}>
              Available : 2 kg
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryTable;
