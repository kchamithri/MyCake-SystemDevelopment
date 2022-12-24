import React from "react";
import { useState } from "react";

const InventoryTable = ({ tableName, chartDisplay }) => {
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
        <div className="d-flex justify-content-between">{tableName}</div>
        <div
          className="rounded-top fs-6 fw-normal text-muted shadow"
          style={{ backgroundColor: "white", height: "10%", marginTop: "2%" }}
        >
          Low in Stock : 03 Items
        </div>
      </div>

      <div className="row row-cols row-cols-lg-2 d-flex justify-content-center align-items-center px-2">
        <div className={chartDisplay === "none" ? "d-none" : "col-lg-6 "}>
          chart
        </div>
        <div
          className={
            chartDisplay === "none"
              ? "col-lg-12"
              : "col-lg-6 flex-column align-items-center"
          }
        >
          <div className="card mt-2" style={{ width: "100%" }}>
            <div className="card-body">
              <h5 className="card-title" style={{ fontSize: "95%" }}>
                Dates
              </h5>
              <p className="mb-0" style={{ color: "red" }}>
                Available : Not Available
              </p>
            </div>
          </div>
          <div className="card mt-2" style={{ width: "100%" }}>
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
    </div>
  );
};

export default InventoryTable;
