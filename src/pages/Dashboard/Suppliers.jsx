import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import SuppliersTable from "../../Components/muiComponents/SuppliersTable";
import AddIcon from "@mui/icons-material/Add";

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
  const [tableData, setTableData] = useState([]);

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
        console.log(data.suppliers);
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
  }, []);

  return (
    <>
      <div className="mt-2">
        <div className="row justify-content-end my-2">
          <div className="col-lg-2 col-sm-6 text-center mb-2">
            <Button
              sx={{
                backgroundColor: "#439A97",
              }}
              variant="contained"
              startIcon={<AddIcon />}
              size="small"
              //   onClick={handleAdd}
            >
              Add supplier
            </Button>
          </div>
        </div>

        <SuppliersTable rows={tableData} />
      </div>
    </>
  );
};

export default Suppliers;
