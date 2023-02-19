import { Button, Grid, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import SuppliersTable from "../../Components/muiComponents/SuppliersTable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import swal from "@sweetalert/with-react";
import AddSupplier from "../../Components/Dashboard/Modals/AddSupplier";

const Suppliers = () => {
  function createData(id, name, company, contact) {
    return {
      id,
      name,
      company,
      contact,
    };
  }
  const [suppliers, setSuppliers] = useState([]);
  const [supplierToEdit, setSupplierToEdit] = useState({});
  const [tableData, setTableData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [buttonText, setButtonText] = useState("Update");

  useEffect(() => {
    fetch("supplier/get", {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setSuppliers(data.suppliers);
        // setOrders(data.orders);
        setTableData(
          data.suppliers.map((list) => {
            return createData(list._id, list.name, list.company, list.contact);
          })
        );
      })
      .catch((error) => {
        console.log("error fetching:", error);
      });
  }, [showForm]);

  const handleDelete = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch("/admin/supplier/delete", {
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
              let newData = suppliers.filter((data) => data._id !== id);
              setTableData(
                newData.map((list) => {
                  return createData(
                    list._id,
                    list.name,
                    list.company,
                    list.contact
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

  const handleEdit = async (id) => {
    let supplier = suppliers.filter((supplier) => supplier._id === id);
    setSupplierToEdit(supplier[0]);
    setShowForm(true);
  };

  return (
    <>
      {showForm ? (
        <>
          <Grid container direction="row" marginY={2}>
            <Grid item xs={12} sx={{ justifyContent: "between" }}>
              <Tooltip title="Back">
                <IconButton onClick={() => setShowForm(false)}>
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={7}>
              <AddSupplier
                supplierToEdit={supplierToEdit}
                buttonText="Update"
                setShowForm={setShowForm}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <div className="mt-2">
          <SuppliersTable
            rows={tableData}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
      )}
    </>
  );
};

export default Suppliers;
