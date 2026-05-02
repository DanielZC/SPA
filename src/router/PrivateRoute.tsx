import { type JSX } from "react";
import { Navigate } from "react-router";

interface props {
  element: JSX.Element;
}

export const PrivateRoute = ({ element }: props) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }
  return element;
};
