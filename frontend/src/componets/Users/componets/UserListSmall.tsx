import React from "react";
import { UserMinData } from "../../../store/types";
import { useApp } from "../../../hooks/UseApp";
import clsx from "clsx";
import { Avatar } from "../../Avatar";
import { Title } from "../../Title";
export const UserListSmall: React.FC<{
  users: UserMinData[];
  admin: string;
}> = ({ users, admin }) => {
  const { isDark } = useApp();

  return (
    <ul>
      {users.map((u, i) => (
        <li
          className={clsx(
            "mb-5  z-20 py-2   flex border-b  justify-between w-full cursor-pointer user-item",
            isDark ? "border-gray-700" : "border-gray-200"
          )}
          key={u.username + i}
        >
          <div className="flex">
            <div className="mr-3">
              <Avatar size="xs" image={u.image} />
            </div>
            <Title className="text-sm" hType="h4" text={u.username} />
          </div>
          {u._id === admin && (
            <span className="text-red-600 text-sm">Admin</span>
          )}
        </li>
      ))}
    </ul>
  );
};
