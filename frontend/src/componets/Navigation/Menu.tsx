import clsx from "clsx";
import { FiUser } from "react-icons/fi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { bluePrimary, black, white } from "../../colors/colors";
import { HoverInfo } from "../HoverInfo";
import { useApp } from "../../hooks/UseApp";

const Menu = () => {
  const { pathname } = useLocation();
  const { isDark } = useApp();
  const menu = [
    {
      to: "/",
      active: pathname === "/",
      name: "chats",
      Icon: IoChatbubbleOutline,
    },
    {
      to: "/users",
      active: pathname.includes("users"),
      name: "users",
      Icon: FiUser,
    },
  ];
  return (
    <ul className="mt-5 p-5 menu mb-auto">
      {menu.map((item, i) => (
        <li className="flex relative mb-3" key={item.name + i}>
          <Link
            to={item.to}
            className={clsx(
              "p-5 rounded-lg",
              item.active &&
                (isDark ? "bg-blue-500  pointer-events-none" : "bg-gray-100"),
              isDark && !item.active && " hover:bg-gray-700 ",
              "transition duration-300"
            )}
          >
            <item.Icon
              size={25}
              className={isDark ? "hover:text-white" : ""}
              color={
                item.active
                  ? isDark
                    ? white
                    : bluePrimary
                  : isDark
                  ? white
                  : black
              }
            />
          </Link>
          <HoverInfo size="-65px" text={item.name} />
        </li>
      ))}
    </ul>
  );
};

export default Menu;
