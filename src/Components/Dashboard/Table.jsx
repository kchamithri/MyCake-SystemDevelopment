import React, { useState } from "react";
import { useEffect } from "react";
import { Form, Tab, Tabs } from "react-bootstrap";
import EnhancedTable from "../muiComponents/EnhancedTable";
import OrderDispatchTable from "../muiComponents/OrderDispatchTable";
import DashboardModal from "./DashboardModal";
import OrderDetailsModal from "./Modals/OrderDetailsModal";
import UpdateIngredients from "./Modals/UpdateIngredients";

const Table = ({
  color,
  tableName,
  pendingOrdersData,
  todayDispatchOrderData,
  openModal,
  openEditModal,
  closeModal,
  displayButtons,
  displaySearch,
}) => {
  const [key, setKey] = useState("Today");
  const [showDropdown, setShowDropdown] = useState(true);

  useEffect(() => {
    console.log(pendingOrdersData);
  }, [pendingOrdersData]);

  return (
    <>
      <div className="card">
        <div
          className="rounded-top fs-6 fw-bold mb-0"
          style={{
            backgroundColor: color,
            height: "40px",
            padding: "4px 0px 4px 4px",
          }}
        >
          {tableName}
        </div>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3 mt-2"
          fill
          justify
        >
          <Tab eventKey="Today" title="Today">
            <OrderDispatchTable
              rows={todayDispatchOrderData}
              showDropdown={showDropdown}
              // handleDelete={handleDelete}
              // handleEdit={handleEdit}
              openModal={openModal}
            />
          </Tab>
          <Tab eventKey="Upcoming" title="Upcoming">
            <OrderDispatchTable
              rows={pendingOrdersData}
              showDropdown={!showDropdown}
              // handleDelete={handleDelete}
              // handleEdit={handleEdit}
              openModal={openModal}
            />
          </Tab>
        </Tabs>
      </div>
    </>
    /* <div className="row my-2 d-flex flex-column justify-content-center align-items-center">
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
      </div> */
  );
};

export default Table;
