import clsx from "clsx";
import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";
import { HoverInfo } from "../HoverInfo";
import { black, white } from "../../colors/colors";
import { useApp } from "../../hooks/UseApp";
import { useState } from "react";
import { DropDown, Avatar } from "../index";

const NavBottom = () => {
  const { handleMode, isDark } = useApp();
  const dropDownMenu = [
    {
      name: "Edit Profile",
      action: () => {},
    },
    {
      name: "Settings",
      action: () => {},
    },
    {
      name: "Logout",
      action: () => {},
      last: true,
    },
  ];
  const [dropDown, setDropDown] = useState<boolean>(false);
  const toggleDropDown = () => {
    setDropDown((prev) => !prev);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="nav-bottom-btn flex   ">
        <button
          onClick={handleMode}
          className={clsx(
            "p-5 rounded-lg mb-3  relative",
            isDark && " hover:bg-gray-700 ",
            "transition duration-300"
          )}
        >
          {isDark ? (
            <MdOutlineWbSunny
              className="cursor-pointer flex"
              size={25}
              color={isDark ? white : black}
            />
          ) : (
            <IoMoonOutline
              className="cursor-pointer flex"
              size={25}
              color={isDark ? white : black}
            />
          )}{" "}
          <HoverInfo size="-100px" text={"dark mode"} />
        </button>
      </div>
      <div onClick={toggleDropDown} className="relative">
        <button className="relative user-avatar">
          <Avatar size={"sm"} /> <HoverInfo size="-120px" text={"User menu"} />
        </button>
        {dropDown && <DropDown menu={dropDownMenu} />}
      </div>
    </div>
  );
};

export default NavBottom;
