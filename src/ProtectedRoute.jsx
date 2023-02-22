import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, adminauth, userauth }) => {
  let location = useLocation();

  const component = children.type.displayName || children.type.name;

  if (component === "AdminSideBar") {
    if (!adminauth) {
      return (
        <Navigate
          to="/admin/login"
          state={{
            from: location,
          }}
          replace
        />
      );
    }
  } else {
    if (!userauth) {
      return (
        <Navigate
          to="/login"
          state={{
            from: location,
          }}
          replace
        />
      );
    }
  }

  return children;
};

export default ProtectedRoute;
