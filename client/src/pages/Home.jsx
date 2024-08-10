import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  return user ? <Navigate to={"/messages"} /> : <Navigate to={"sign-in"} />;
};

export default Home;
