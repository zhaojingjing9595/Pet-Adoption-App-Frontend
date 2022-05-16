import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate} from 'react-router-dom'

function ProtectedRoute({ children }) {
  const { activeUser } = useAuth();
  if (activeUser) {
    return <>{children}</>;
  } else return <Navigate to="/" replace/>;
}

export default ProtectedRoute;
