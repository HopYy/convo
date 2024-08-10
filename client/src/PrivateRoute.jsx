import { useMemo, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setInitialAuthState } from "redux store/actions/authActions";
import Sidebar from "components/sidebar/Sidebar";
import DisplayMessages from "components/main/DisplayMessages";
import ProfileSidebar from "components/sidebar/ProfileSidebar";
import DisplayPages from "components/sidebar/DisplayPages";

const PrivateRoute = ({ user }) => {
  const isAuthenticated = useMemo(() => {
    return (user, accessToken) => {
      return user && accessToken;
    };
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("profile");
  const accessToken = JSON.parse(token)?.accessToken;

  useEffect(() => {
    if (!isAuthenticated(user, accessToken)) {
      dispatch(setInitialAuthState(navigate));
    }
  }, [dispatch, navigate, user, accessToken, isAuthenticated]);

  return isAuthenticated(user, accessToken) ? (
    <div className="h-screen flex flex-col-reverse md:flex-row overflow-x-hidden">
      <Sidebar user={user} />
      <div className="flex flex-1 overflow-hidden">
        <DisplayPages />
        <DisplayMessages />
        <ProfileSidebar />
      </div>
    </div>
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default PrivateRoute;
