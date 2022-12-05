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
  const [key, setKey] = useState("Cake");

  const [buttonName, setButtonName] = useState("add");
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [dataToUpdate, setDataToUpdate] = useState([]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch("/admin/products/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
      if (res.status === 200) {
        setProducts(products.filter((data) => data._id !== id));
        window.alert("Successfully Deleted");
      } else {
        window.alert("Invalid Credentials");
      }
    } catch (error) {
      console.log("ERROR IS", error);
    }
  };

  const handleEdit = async (id, category) => {
    handleShow();
    setButtonName("update");
    setKey(category);

    setDataToUpdate(products.filter((data) => id === data._id));
  };

  const handleShow = () => {
    setShow(!show);
  };

  useEffect(() => {
    console.log(dataToUpdate);
  }, [dataToUpdate]);

  useEffect(() => {
    fetch("/admin/products/view", {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log(data.products);
        setProducts(data.products);
      })
      .catch((error) => {
        console.log("error fetching:", error);
      });
  }, [show]);

  // useEffect(() => {
  //   setButtonName("add");
  // }, [key]);

  const handleAdd = (event) => {
    setButtonName("add");
    handleShow();
  };

  function cm(...args) {
    return args.filter((v) => v).join(" ");
  }
  return (
    <div className="mt-2">
      <div className="row justify-content-end my-2">
        <div className={show ? "d-none" : "col-lg-1 col-sm-6 text-center"}>
          <button
            className={cm(
              buttonName,
              "btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm",
              buttonName === "add" &&
                "btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm active"
            )}
            value="add"
            onClick={handleAdd}
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
            onClick={handleAdd}
          >
            Update
          </button>
        </div> */}
      </div>
      <div className={show ? "d-none" : "mt-4"}>
        <ProductsViewTable
          handleAdd={handleAdd}
          products={products}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>

      <div className={show ? "" : "d-none"}>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
          fill
          justify
        >
          <Tab eventKey="Cake" title="Cake">
            {buttonName === "add" ? (
              <AddProductForm category="Cake" handleShow={handleShow} />
            ) : (
              <UpdateProductForm dataToUpdate={dataToUpdate} />
            )}
          </Tab>
          <Tab eventKey="Party Packs" title="Party Packs">
            {buttonName === "add" ? (
              <AddProductForm category="Party Packs" handleShow={handleShow} />
            ) : (
              <UpdateProductForm
                dataToUpdate={dataToUpdate}
                handleShow={handleShow}
              />
            )}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default AddProducts;
