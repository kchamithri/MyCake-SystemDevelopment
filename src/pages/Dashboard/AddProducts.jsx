import React from "react";
import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import AddProductForm from "../../Components/Dashboard/AddProductForm";

const AddProducts = () => {
  const [key, setKey] = useState("cake");
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
        <Tab eventKey="cake" title="Cake">
          <AddProductForm buttonName="Add" />
        </Tab>
        <Tab eventKey="partyPacks" title="Party Packs">
          <AddProductForm buttonName="Update" />
        </Tab>
      </Tabs>
    </div>
  );
};

export default AddProducts;
