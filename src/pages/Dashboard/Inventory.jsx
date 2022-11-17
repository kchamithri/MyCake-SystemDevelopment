import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import InventoryTable from "../../Components/Dashboard/InventoryTable";

const Inventory = () => {
  const [key, setKey] = useState("inventory");

  return (
    <div className="mt-2">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        fill
        justify
      >
        <Tab eventKey="inventory" title="Inventory">
          <div className="container">
            <div className="row">
              <div className="col-lg-10">
                <InventoryTable tableName="Inventory" />
              </div>
              <div className="d-flex flex-column col-lg-2">
                <button className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm m-1">
                  Add
                </button>
                <button className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm m-1">
                  Update
                </button>
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey="supplier" title="Supplier"></Tab>
      </Tabs>
    </div>
  );
};

export default Inventory;
