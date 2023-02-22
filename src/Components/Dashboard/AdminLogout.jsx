import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogout = ({ setAdminauth }) => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await fetch("/admin/adminLogout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.status === 401 || !res) {
        window.alert("Please logout later");
      } else {
        setAdminauth(false);
        navigate("/admin/login");
        localStorage.removeItem("adminId");
        localStorage.removeItem("adminName");
        localStorage.removeItem("adminEmail");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    logout();
  }, []);
};

export default AdminLogout;
