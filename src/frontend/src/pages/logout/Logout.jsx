import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import * as authActions from "../../store/auth/actions";

function Logout() {
  const dispatch = useDispatch();
  dispatch(authActions.setUser(null));
  dispatch(authActions.setToken(null));

  return <Navigate to="/login" />;
}

export default Logout;