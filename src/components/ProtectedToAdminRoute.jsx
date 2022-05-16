import React from 'react';
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

function ProtectedToAdminRoute({ children }) {
  const { activeUser } = useAuth();
  if (activeUser && activeUser.admin) {
    return <>{children}</>;
  } else return <Navigate to="/" replace />;
}

export default ProtectedToAdminRoute;