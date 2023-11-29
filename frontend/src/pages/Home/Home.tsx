import { useSelector } from "react-redux";
import Auth from "./Auth";
import { getIsLoggedIn } from "../../store/auth";
import { Chat, Layout } from "../../componets";
import { useApp } from "../../hooks/UseApp";
import clsx from "clsx";

const Home = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const { isDark } = useApp();
  return isLoggedIn ? (
    <div className={clsx(`flex  h-screen `, isDark && "bg-primary")}>
      <Layout />
      <Chat />
    </div>
  ) : (
    <Auth />
  );
};

export default Home;
