import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserLogout = ({ setUserauth }) => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await fetch("/userLogout", {
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
        setUserauth(false);
        localStorage.removeItem("userId");
        localStorage.removeItem("name");
        localStorage.removeItem("email");

        localStorage.removeItem("contact");

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    logout();
  }, []);
};

export default UserLogout;
