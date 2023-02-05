import swal from "@sweetalert/with-react";
// import { Button } from "bootstrap";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AddProductForm from "../../Components/Dashboard/AddProductForm";
import ProductsViewTable from "../../Components/Dashboard/ProductsViewTable";
import UpdateProductForm from "../../Components/Dashboard/UpdateProductForm";
import InventoryTable from "../../Components/muiComponents/InventoryTable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Tooltip } from "@mui/material";
import ProductViewModal from "../../Components/Website/ZoomProduct/ProductViewModal";
import ProductViewCard from "../../Components/Website/ZoomProduct/ProductViewCard";
import AddSupplier from "../../Components/Dashboard/Modals/AddSupplier";
import AddIngredients from "../../Components/Dashboard/Modals/AddIngredients";
import { SportsHockey } from "@mui/icons-material";
import DetailedInventoryTable from "../../Components/muiComponents/DetailedInventoryTable";
import UpdateStockForm from "../../Components/Dashboard/Modals/UpdateStockForm";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

const Inventory = () => {
  const [key, setKey] = useState("Cake");

  const [buttonName, setButtonName] = useState("add");
  const [show, setShow] = useState(false);
  const [formShow, setFormShow] = useState(false);
  const [detailedTableShow, setDetailedTableShow] = useState(false);
  const [detailedTableDataFetch, setDetailedTableDataFetch] = useState([]);
  const [detailedTableData, setDetailedTableData] = useState({
    data: [],
    type: "",
  });
  const [stock, setStock] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [dataToUpdate, setDataToUpdate] = useState([]);
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [stockEditData, setStockEditData] = useState({
    data: {},
    inventoryType: {},
    supplier: {},
  });
  const [modalData, setModalData] = useState({});

  function createData(
    id,
    inventoryType,
    supplierName,
    borrowedQuantity,
    expiryDate
  ) {
    return {
      id,
      inventoryType,
      supplierName,
      borrowedQuantity,
      expiryDate,
    };
  }

  const handleDelete = async (id) => {
    console.log(id);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch("/admin/inventory/type/delete", {
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
            if (res.message === "Success") {
              let arr = [];
              arr = stock.filter((data) => data.inventoryType._id !== id);
              setStock(arr);
              setTableData(
                arr.map((list) => {
                  return createData(
                    list._id,
                    list.inventoryType,
                    list.supplierName,
                    list.borrowedQuantity,
                    list.expiryDate
                  );
                })
              );

              swal("Deleted Successfully!", {
                icon: "success",
                button: false,
                timer: 1000,
              });
            } else {
              window.alert("Invalid Credentials");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const handleStocksDelete = async (id) => {
    console.log(id);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch("/admin/inventory/stock/delete", {
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
            if (res.message === "success") {
              let arr = [];
              arr = detailedTableDataFetch.filter((data) => data._id !== id);
              setDetailedTableDataFetch(arr);

              let newarr = [];
              newarr = detailedTableData.data.filter((data) => data._id !== id);
              setDetailedTableData({
                ...detailedTableData,
                data: newarr,
              });
              // setDetailedTableShow(!detailedTableShow);

              swal("Deleted Successfully!", {
                icon: "success",
                button: false,
                timer: 1000,
              });
            } else {
              window.alert("Invalid Credentials");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const handleStockEdit = (data) => {
    setStockEditData({
      ...stockEditData,
      data: data,
      inventoryType: data.inventoryType,
      supplier: data.supplierName,
    });
    setUpdateFormOpen(!updateFormOpen);
    setDetailedTableShow(!detailedTableShow);
  };

  useEffect(() => {
    fetch("/admin/inventory/stock/get", {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log(data.stock);
        setDetailedTableDataFetch(data.stock);
      })
      .catch((error) => {
        console.log("error fetching:", error);
      });
  }, [show, updateFormOpen]);

  useEffect(() => {
    console.log(detailedTableDataFetch);
  }, [detailedTableDataFetch]);

  const handleEdit = async (id, category) => {
    handleShow();
    setButtonName("update");
    setKey(category);

    setDataToUpdate(stock.filter((data) => id === data._id));
  };

  const handleDetailedTableShow = (inventoryName, inventoryid) => {
    let arr = [];
    console.log(detailedTableDataFetch);
    arr = detailedTableDataFetch.filter(
      (data) => data.inventoryType._id === inventoryid
    );
    setDetailedTableData({
      ...detailedTableData,
      data: arr,
      type: inventoryName,
    });
    setDetailedTableShow(!detailedTableShow);
    setShow(!show);
  };

  const handleFormShow = () => {
    setFormShow(!formShow);
    setShow(!show);
  };

  const handleUpdateFormShow = () => {
    setDetailedTableShow(!detailedTableShow);
    setUpdateFormOpen(!updateFormOpen);
  };

  const handleShow = () => {
    setShow(!show);
  };

  useEffect(() => {
    console.log(dataToUpdate);
    console.log(tableData);
    console.log("detailedTableData", detailedTableData);
  }, [dataToUpdate, tableData, detailedTableData]);

  useEffect(() => {
    fetch("/admin/inventory/newBorrowedInventory/get", {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log(data.stock);
        setStock(data.stock);
        setTableData(
          data.stock.map((list) => {
            return createData(
              list._id,
              list.inventoryType,
              list.supplierName,
              list.borrowedQuantity,
              list.expiryDate
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
    // setButtonName("add");
    handleFormShow();
  };

  const handleUpdate = () => {
    handleUpdateFormShow();
  };

  function cm(...args) {
    return args.filter((v) => v).join(" ");
  }
  return (
    <>
      <div className="mt-2">
        <div className="row justify-content-end my-2">
          <div className={show ? "d-none" : "col-lg-2 col-sm-6 text-center"}>
            <Button
              sx={{
                backgroundColor: "#439A97",
              }}
              variant="contained"
              startIcon={<AddIcon />}
              size="small"
              onClick={handleAdd}
            >
              Add new stock
            </Button>
          </div>
          <div className={show ? "d-none" : "col-lg-2 col-sm-6 text-center"}>
            <Button
              sx={{
                backgroundColor: "#439A97",
              }}
              variant="contained"
              startIcon={<AddIcon />}
              size="small"
              onClick={() => {
                setUpdateFormOpen(!updateFormOpen);
                setShow(!show);
              }}
            >
              update stocks
            </Button>
          </div>
        </div>
        <div className={show ? "d-none" : "mt-4"}>
          <InventoryTable
            rows={tableData}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleDetailedTableShow={handleDetailedTableShow}
          />
        </div>

        <div className={formShow ? "" : "d-none"}>
          <>
            <div className=" d-flex justify-content-between ">
              <Tooltip title="Back">
                <IconButton onClick={handleFormShow}>
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div className="px-2 mt-2">
              <AddIngredients handleFormShow={handleFormShow} />
            </div>
          </>
        </div>
        <div className={updateFormOpen ? "" : "d-none"}>
          <>
            <div className=" d-flex justify-content-between ">
              <Tooltip title="Back">
                <IconButton onClick={handleUpdateFormShow}>
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div className="px-2 mt-2">
              <UpdateStockForm
                stockEditData={stockEditData}
                handleUpdateFormShow={handleUpdateFormShow}
              />
            </div>
          </>
        </div>

        <div className={detailedTableShow ? "" : "d-none"}>
          <>
            <div className=" d-flex justify-content-between ">
              <Tooltip title="Back">
                <IconButton onClick={() => handleDetailedTableShow(null)}>
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div className="px-2 mt-2">
              <DetailedInventoryTable
                type={detailedTableData.type}
                rows={detailedTableData.data}
                handleShow={handleShow}
                handleStocksDelete={handleStocksDelete}
                handleStockEdit={handleStockEdit}
              />
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default Inventory;
