import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const student = JSON.parse(localStorage.getItem("student"));

  // If no student is found in localStorage, redirect to login
  if (!student) {
    return <Navigate to="/student-login" replace />;
  }

  // If student is authenticated, render the protected component
  return children;
}

export default PrivateRoute;
