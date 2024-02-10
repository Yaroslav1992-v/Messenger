import React from "react";
import { UserMinData } from "../../../store/types";
import { UserItem } from "./UserItem";
import { useApp } from "../../../hooks/UseApp";
import clsx from "clsx";

export const UserList: React.FC<{ users: UserMinData[] }> = ({ users }) => {
  const { isDark } = useApp();

  return (
    <ul className=" h-screen">
      {users.map((u, i) => (
        <li
          className={clsx(
            "mb-5 py-4 z-20    px-6 border-b  cursor-pointer user-item",
            isDark ? "border-gray-700" : "border-gray-200"
          )}
          key={u.username + i}
        >
          <UserItem user={u} />
        </li>
      ))}
    </ul>
  );
};
