import React from "react";
import "../../Styles/Dashboard.css";
import InventoryTable from "./InventoryTable";
import Table from "./Table";

const DashboardContent = () => {
  return (
    <div className="container">
      <div>
        <h1 className="fs-5 mb-1" style={{ color: "#2e4a66" }}>
          Hello Achini
        </h1>
        <p className="fs-6" style={{ color: "#a5aaad", fontWeight: "bold" }}>
          Welcome to the dashboard
        </p>
      </div>

      <div className="row row-cols-2 row-cols-lg-6">
        <div className="col col-sm-12 mb-1">
          <div className="card shadow">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <i className="fa fa-gift" aria-hidden="true"></i>
                <h6 className="card-subtitle text-muted">Today</h6>
              </div>

              <p className="d-flex card-text mt-1 justify-content-center align-items-center">
                3
              </p>
              <h6 className="fw-bold">Orders to dispatch</h6>
            </div>
          </div>
        </div>
        <div className="col col-sm-12 mb-1">
          <div className="card shadow">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <i className="fa fa-gift" aria-hidden="true"></i>
                <h6 className="card-subtitle text-muted">Today</h6>
              </div>

              <p className="d-flex card-text mt-1 justify-content-center align-items-center">
                3
              </p>
              <h6 className="fw-bold">Orders Received</h6>
            </div>
          </div>
        </div>
        <div className="col col-sm-12 mb-1">
          <div className="card shadow">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <i className="fa fa-gift" aria-hidden="true"></i>
                <h6 className="card-subtitle text-muted">Today</h6>
              </div>

              <p className="d-flex card-text mt-1 justify-content-center align-items-center">
                3
              </p>
              <h6 className="fw-bold">Customized Orders</h6>
            </div>
          </div>
        </div>
        <div className="col col-sm-12 mb-1">
          <div className="card shadow">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <i className="fa fa-gift" aria-hidden="true"></i>
                <h6 className="card-subtitle text-muted">Today</h6>
              </div>

              <p className="d-flex card-text mt-1 justify-content-center align-items-center">
                3
              </p>
              <h6 className="fw-bold">Total Orders</h6>
            </div>
          </div>
        </div>
        <div className="col col-sm-12 mb-1">
          <div className="card shadow">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <i className="fa fa-gift" aria-hidden="true"></i>
                <h6 className="card-subtitle text-muted">Today</h6>
              </div>

              <p className="d-flex card-text mt-1 justify-content-center align-items-center">
                3
              </p>
              <h6 className="fw-bold">Total Revenue</h6>
            </div>
          </div>
        </div>
        <div className="col col-sm-12 mb-1">
          <div className="card shadow">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <i className="fa fa-gift" aria-hidden="true"></i>
                <h6 className="card-subtitle text-muted">Today</h6>
              </div>

              <p className="d-flex card-text mt-1 justify-content-center align-items-center">
                3
              </p>
              <h6 className="fw-bold">Total customers</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-2">
        <div className="col-lg-8 col-sm-12">
          <Table
            color="orange"
            tableName="Orders to dispatch"
            tabDisplay={true}
            tabs={["Today", "Pending", "All"]}
          />
        </div>
        <div className="col-lg-4 col-sm-12">
          <InventoryTable
            
            tableName="Inventory"
           
          />
        </div>
      </div>

      <div className="row my-2">
        <div className="col-lg-8 col-sm-12">
          <Table
            color="brown"
            tableName="Customized Orders"
            tabDisplay={true}
            tabs={["Today", "Pending", "All"]}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
