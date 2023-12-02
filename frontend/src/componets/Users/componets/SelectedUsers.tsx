import React from "react";
import { MdDelete } from "react-icons/md";
import { HoverInfo, Avatar } from "../../index";
import { UserMinData } from "../../../store/types";
import clsx from "clsx";
export const SelectedUsers: React.FC<{
  users: UserMinData[];
  remove: (id: string) => void;
  text: string;
  admin?: string;
}> = ({ users, remove, text, admin }) => {
  return (
    <div className="py-2">
      <div className="block  mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">
        {text}
      </div>

      <ul className="flex flex-wrap ">
        {users.map((u) => (
          <li
            className={clsx("mr-2 user relative", admin === u._id && "hidden")}
            key={u._id}
          >
            <Avatar image={u.image} size="sm" />
            <button
              onClick={() => remove(u._id)}
              className="absolute top-0 right-0 "
            >
              <MdDelete className="text-red-600" size={15} />
            </button>
            <HoverInfo
              text={u.username}
              style={{ bottom: "-40px", right: "-70%" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
