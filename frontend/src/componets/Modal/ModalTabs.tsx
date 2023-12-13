import clsx from "clsx";
import { TabsProps } from "./types";
import { useApp } from "../../hooks/UseApp";

export const ModalTabs = <T,>({ action, active, tabs }: TabsProps<T>) => {
  const { isDark } = useApp();
  return (
    <div
      className={clsx(
        "border-b  ",
        isDark ? "border-gray-700" : "border-gray-200"
      )}
    >
      <ul
        className="flex flex-wrap -mb-px text-sm font-medium text-center"
        id="default-tab"
        data-tabs-toggle="#default-tab-content"
        role="tablist"
      >
        {tabs.map((t, i) => (
          <li
            key={typeof t === "string" ? t : i}
            className="mr-2"
            role="presentation"
          >
            <button
              className={clsx(
                "inline-block p-4 border-b  rounded-t-lg capitalize",
                active === t && "border-blue-500 text-blue-500",
                isDark && active !== t && "text-gray-200 border-gray-700 "
              )}
              id="profile-tab"
              data-tabs-target="#profile"
              type="button"
              role="tab"
              onClick={() => action(t)}
              aria-controls="profile"
              aria-selected="false"
            >
              {typeof t === "string" && t}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
