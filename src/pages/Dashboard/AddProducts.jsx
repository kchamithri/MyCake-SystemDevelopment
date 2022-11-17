import { Button } from "bootstrap";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AddProductForm from "../../Components/Dashboard/AddProductForm";
import UpdateProductForm from "../../Components/Dashboard/UpdateProductForm";

const AddProducts = () => {
  const [key, setKey] = useState("cake");

  const [buttonName, setButtonName] = useState("add");

  useEffect(() => {
    setButtonName("add");
  }, [key]);

  const handleButton = (event) => {
    setButtonName(event.target.value);
    console.log(buttonName);
  };

  function cm(...args) {
    return args.filter((v) => v).join(" ");
  }
  return (
    <div className="mt-2">
      <div className="row justify-content-end my-2">
        <div className="col-lg-1 col-sm-6 text-center">
          <button
            className={cm(
              buttonName,
              "btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm",
              buttonName === "add" &&
                "btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm active"
            )}
            value="add"
            onClick={handleButton}
          >
            Add
          </button>
        </div>
        <div className="col-lg-2 col-sm-6">
          <button
            className={cm(
              buttonName,
              "btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm",
              buttonName === "update" &&
                "btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm active"
            )}
            value="update"
            onClick={handleButton}
          >
            Update
          </button>
        </div>
      </div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        fill
        justify
      >
        <Tab eventKey="cake" title="Cake">
          {buttonName === "add" ? <AddProductForm /> : <UpdateProductForm />}
        </Tab>
        <Tab eventKey="partyPacks" title="Party Packs">
          {buttonName === "add" ? <AddProductForm /> : <UpdateProductForm />}
        </Tab>
      </Tabs>
    </div>
  );
};

export default AddProducts;
