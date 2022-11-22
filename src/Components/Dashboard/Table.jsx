import React, { useState } from "react";
import { Form } from "react-bootstrap";
import DashboardModal from "./DashboardModal";
import OrderDetailsModal from "./Modals/OrderDetailsModal";
import UpdateIngredients from "./Modals/UpdateIngredients";

const Table = ({
  color,
  tableName,
  tabDisplay,
  tabs,
  openModal,
  openEditModal,
  closeModal,
  displayButtons,
  displaySearch,
}) => {
  return (
    <div className="card pb-2">
      <div
        className="rounded-top fs-6 fw-bold"
        style={{
          backgroundColor: color,
          height: "40px",
          padding: "4px 0px 4px 4px",
        }}
      >
        {tableName}
      </div>
      <ul
        className="nav nav-tabs nav-fill"
        style={{ display: tabDisplay ? tabDisplay : "none" }}
      >
        {tabs.map((tabName) => {
          return (
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">
                {tabName}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="row my-2 d-flex flex-column justify-content-center align-items-center">
        <Form
          style={{
            width: "98%",
            display: displaySearch ? displaySearch : "none",
          }}
        >
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
        </Form>
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="card mt-2" style={{ width: "98%" }}>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h5 class="card-title" style={{ fontSize: "95%" }}>
                Kosala Chamithri
              </h5>
              <button
                type="button"
                class="btn btn-light btn-sm"
                onClick={openModal}
              >
                Order Details
                <i class="fa fa-angle-double-right mx-1" aria-hidden="true" />
              </button>
            </div>
            <h6
              class="card-subtitle mb-2 text-muted"
              style={{ fontSize: "95%" }}
            >
              Order ID: 12345 : 1 Item
            </h6>
            <div className="d-flex justify-content-between">
              <p className="mb-0" style={{ color: "green" }}>
                Rs. 2500
              </p>
              <div
                className={
                  displayButtons === "none"
                    ? "d-none"
                    : "d-flex justify-content-between"
                }
              >
                <button
                  type="button"
                  className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm mx-1"
                  onClick={openEditModal}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="card mt-2" style={{ width: "98%" }}>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h5 class="card-title" style={{ fontSize: "95%" }}>
                Imasha Nanayakkara
              </h5>
              <button
                type="button"
                class="btn btn-light btn-sm"
                onClick={openModal}
              >
                Order Details
                <i class="fa fa-angle-double-right mx-1" aria-hidden="true" />
              </button>
            </div>
            <h6
              class="card-subtitle mb-2 text-muted"
              style={{ fontSize: "95%" }}
            >
              Order ID: 12345 : 1 Item
            </h6>
            <p className="mb-0" style={{ color: "green" }}>
              Rs. 2500
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
