import { useSelector } from "react-redux";
import Auth from "./Auth";
import { getIsLoggedIn } from "../../store/auth";
import { Layout } from "../../componets";

const Home = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  return isLoggedIn ? (
    <Layout>
      <div>Chats</div>
    </Layout>
  ) : (
    <Auth />
  );
};

export default Home;
