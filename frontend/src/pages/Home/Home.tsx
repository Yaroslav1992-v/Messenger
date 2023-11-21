import { useSelector } from "react-redux";
import Auth from "./Auth";
import { getIsLoggedIn } from "../../store/auth";

const Home = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  return isLoggedIn ? <div>Chat App</div> : <Auth />;
};

export default Home;
