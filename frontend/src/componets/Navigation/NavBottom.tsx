import clsx from "clsx";
import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";
import { HoverInfo } from "../HoverInfo";
import { black, white } from "../../colors/colors";
import { useApp } from "../../hooks/UseApp";
import { DropDown, Avatar } from "../index";

interface NavBottomProps {
  userId: string;
  dropdown: boolean;
  openDropDown: () => void;
  close: () => void;
}
const NavBottom: React.FC<NavBottomProps> = ({
  userId,
  dropdown,
  openDropDown,
  close,
}) => {
  const { handleMode, isDark, user, openProfile } = useApp();

  const dropDownMenu = [
    {
      name: "Edit Profile",
      action: () => close(),
    },
    {
      name: "Profile",
      action: () => openProfile(userId),
    },
    {
      name: "Logout",
      action: () => {},
      last: true,
    },
  ];
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
          )}

          <HoverInfo style={{ left: "70px", top: "10px" }} text={"dark mode"} />
        </button>
      </div>
      <div onClick={openDropDown} className="relative">
        <button className="relative user-avatar">
          <Avatar image={user?.image || ""} size={"sm"} />

          <HoverInfo style={{ left: "60px", top: "0" }} text={"User menu"} />
        </button>
        {dropdown && (
          <div
            style={{ bottom: "20px", left: " 50px" }}
            className="absolute z-30"
          >
            <DropDown menu={dropDownMenu} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBottom;
