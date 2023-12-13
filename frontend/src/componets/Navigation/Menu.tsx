import clsx from "clsx";
import { bluePrimary, black, white } from "../../colors/colors";
import { HoverInfo } from "../HoverInfo";
import { useApp } from "../../hooks/UseApp";
import { Logo } from "../Logo";
import NavBottom from "./NavBottom";
import { useEffect, useState } from "react";
import { IconType } from "react-icons/lib";
interface MenuProps {
  menu: { to: () => void; active: boolean; name: string; Icon: IconType }[];
  close: () => void;
}
const Menu: React.FC<MenuProps> = ({ menu, close }) => {
  const { isDark, user, menuShow, bar } = useApp();
  const [dropdown, setDropDown] = useState<boolean>(false);
  const closeDropDown = () => {
    if (dropdown) {
      setDropDown(false);
    }
  };
  const openDropDown = () => {
    setDropDown(true);
  };
  useEffect(() => {
    const width = window.innerWidth;
    if (width) {
    }
  }, [menuShow]);

  return (
    <nav
      onClick={closeDropDown}
      onMouseLeave={closeDropDown}
      className={clsx(
        "menu lg:flex   flex-col items-center max-w-[100px] py-6 w-full h-full border-r  ",
        isDark ? "border-gray-700 bg-primary" : "border-gray-200 bg-white",
        !bar ? "flex" : "hidden"
      )}
    >
      <Logo size="sm" />
      <ul className="mt-5 p-5 menu mb-auto">
        {menu.map((item, i) => (
          <li className="flex relative mb-3" key={item.name + i}>
            <button
              onClick={() => item.to()}
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
            </button>

            <HoverInfo
              style={{ right: "-70px", top: "10px" }}
              text={item.name}
            />
          </li>
        ))}
      </ul>
      {user && (
        <NavBottom
          close={close}
          dropdown={dropdown}
          openDropDown={openDropDown}
          userId={user?._id}
        />
      )}
    </nav>
  );
};

export default Menu;
