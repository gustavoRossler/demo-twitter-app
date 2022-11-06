import {
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const user = useSelector(state => state?.auth?.user);

  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;