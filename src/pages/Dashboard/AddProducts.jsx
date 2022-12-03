import { Button } from "bootstrap";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AddProductForm from "../../Components/Dashboard/AddProductForm";
import ProductsViewTable from "../../Components/Dashboard/ProductsViewTable";
import UpdateProductForm from "../../Components/Dashboard/UpdateProductForm";

const AddProducts = () => {
  const [key, setKey] = useState("cake");

  const [buttonName, setButtonName] = useState("add");
  const [show, setShow] = useState({
    showTabs: false,
  });

  useEffect(() => {
    setButtonName("add");
  }, [key]);

  const handleButton = (event) => {
    setButtonName(event.target.value);

    console.log(show.showTabs);
  };

  useEffect(() => {
    setShow({ ...show, showTabs: true });
  }, [buttonName]);

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
        {/* <div className="col-lg-2 col-sm-6">
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
        </div> */}
      </div>
      <div className="mt-4">
        <ProductsViewTable handleButton={handleButton} />
      </div>

      <div className={show.showTabs ? "d-block" : "d-none"}>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
          fill
          justify
        >
          <Tab eventKey="cake" title="Cake">
            {buttonName === "add" ? (
              <AddProductForm category="cake" />
            ) : (
              <UpdateProductForm />
            )}
          </Tab>
          <Tab eventKey="partyPacks" title="Party Packs">
            {buttonName === "add" ? (
              <AddProductForm category="partyPacks" />
            ) : (
              <UpdateProductForm />
            )}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default AddProducts;
