import clsx from "clsx";
import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";
import { HoverInfo } from "../HoverInfo";
import { black, white } from "../../colors/colors";
import { useApp } from "../../hooks/UseApp";
import { DropDown, Avatar } from "../index";

const NavBottom: React.FC<{ userId: string }> = ({ userId }) => {
  const {
    handleMode,
    isDark,
    openModal,
    openDropDown,
    dropdown,
    user,
    openProfile,
  } = useApp();
  const dropDownMenu = [
    {
      name: "Edit Profile",
      action: openModal,
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
          <HoverInfo size="-100px" text={"dark mode"} />
        </button>
      </div>
      <div onClick={openDropDown} className="relative">
        <button className="relative user-avatar">
          <Avatar image={user?.image || ""} size={"sm"} />{" "}
          <HoverInfo size="-120px" text={"User menu"} />
        </button>
        {dropdown && <DropDown menu={dropDownMenu} />}
      </div>
    </div>
  );
};

export default NavBottom;
