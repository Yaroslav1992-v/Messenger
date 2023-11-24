import clsx from "clsx";
import { DropDownProps } from "../componentTypes";
import { useApp } from "../../hooks/UseApp";

export const DropDown: React.FC<{ menu: DropDownProps[] }> = ({ menu }) => {
  const { isDark } = useApp();
  return (
    <div
      id="dropdown"
      className={clsx(
        " absolute bottom-16 left-0  divide-y",
        " divide-gray-100 rounded-lg shadow w-44",
        isDark ? "bg-gray-700 dark:bg-gray-700" : "bg-white"
      )}
    >
      <ul
        className={clsx(
          "py-2 text-sm text-gray-700 dark:text-gray-200",
          isDark ? "text-white" : "text-gray-700"
        )}
        aria-labelledby="dropdownDefaultButton"
      >
        {menu.map((item, i) => (
          <li key={item.name + i}>
            <button
              onClick={item.action}
              className={clsx(
                "block px-4 py-2 w-full hover:bg-gray-100 text-lg",
                "dark:hover:bg-gray-600 dark:hover:text-white",
                item.last && "text-red-600 border-t border-grey-200",
                isDark && "hover:text-gray-700 "
              )}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
