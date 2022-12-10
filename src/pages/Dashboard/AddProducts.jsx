import swal from "@sweetalert/with-react";
import { Button } from "bootstrap";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AddProductForm from "../../Components/Dashboard/AddProductForm";
import ProductsViewTable from "../../Components/Dashboard/ProductsViewTable";
import UpdateProductForm from "../../Components/Dashboard/UpdateProductForm";
import EnhancedTable from "../../Components/muiComponents/EnhancedTable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Tooltip } from "@mui/material";
import ProductViewModal from "../../Components/Website/ZoomProduct/ProductViewModal";
import ProductViewCard from "../../Components/Website/ZoomProduct/ProductViewCard";

const AddProducts = () => {
  const [key, setKey] = useState("Cake");

  const [buttonName, setButtonName] = useState("add");
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [dataToUpdate, setDataToUpdate] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  function createData(
    id,
    foodItems,
    category,
    type,
    weight,
    price,
    description
  ) {
    return {
      id,
      foodItems,
      category,
      type,
      weight,
      price,
      description,
    };
  }

  const handleDelete = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch("/admin/products/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.status === 200) {
              window.alert("Invalid Credentials");
            } else {
              setProducts(products.filter((data) => data._id !== id));
              setTableData(
                products.map((list) => {
                  return createData(
                    list._id,
                    list.name,
                    list.category,
                    list.type,
                    list.weight,
                    list.price,
                    list.description
                  );
                })
              );
              swal("Deleted Successfully!", {
                icon: "success",
                button: false,
                timer: 1000,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
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
        setTableData(
          data.products.map((list) => {
            return createData(
              list._id,
              list.name,
              list.category,
              list.type,
              list.weight,
              list.price,
              list.description
            );
          })
        );
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

  const openModal = (id) => {
    console.log(id);
    const arr = products.filter((item) => item._id === id);
    arr.map((item) => {
      setModalData(item);
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  function cm(...args) {
    return args.filter((v) => v).join(" ");
  }
  return (
    <>
      <ProductViewModal show={modalOpen} close={closeModal} buttons={false}>
        <ProductViewCard
          mainImage={modalData.mainImage}
          optionalImage1={modalData.optionalImage1}
          optionalImage2={modalData.optionalImage2}
          name={modalData.name}
          price={modalData.price}
          description={modalData.description}
          weight={modalData.weight}
        />
      </ProductViewModal>
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
        </div>
        <div className={show ? "d-none" : "mt-4"}>
          {/* <ProductsViewTable
          handleAdd={handleAdd}
          products={products}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        /> */}
          <EnhancedTable
            rows={tableData}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            openModal={openModal}
          />
        </div>

        <div className={show ? "" : "d-none"}>
          <>
            <div className=" d-flex justify-content-between ">
              <Tooltip title="Back">
                <IconButton onClick={handleShow}>
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
            </div>
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
                  <UpdateProductForm
                    dataToUpdate={dataToUpdate}
                    handleShow={handleShow}
                  />
                )}
              </Tab>
              <Tab eventKey="Party Packs" title="Party Packs">
                {buttonName === "add" ? (
                  <AddProductForm
                    category="Party Packs"
                    handleShow={handleShow}
                  />
                ) : (
                  <UpdateProductForm
                    dataToUpdate={dataToUpdate}
                    handleShow={handleShow}
                  />
                )}
              </Tab>
            </Tabs>
          </>
        </div>
      </div>
    </>
  );
};

export default AddProducts;
