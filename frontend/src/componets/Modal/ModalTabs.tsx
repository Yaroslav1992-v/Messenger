import clsx from "clsx";
import { TabsProps } from "./types";

export const ModalTabs = <T,>({ action, active, tabs }: TabsProps<T>) => {
  return (
    <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul
        className="flex flex-wrap -mb-px text-sm font-medium text-center"
        id="default-tab"
        data-tabs-toggle="#default-tab-content"
        role="tablist"
      >
        {tabs.map((t, i) => (
          <li
            key={typeof t === "string" ? t : i}
            className="me-2"
            role="presentation"
          >
            <button
              className={clsx(
                "inline-block p-4 border-b-2 rounded-t-lg capitalize",
                active === t && "border-blue-500 text-blue-500"
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
