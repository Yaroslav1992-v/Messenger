import { useEffect, useState } from "react";
import { SearchField } from "../../componets";
import { UserHeader } from "./componets/UserHeader";
import { checkString } from "../../utils/helpers";
import { useSelector } from "react-redux";
import { getSearchedUsers, searchUser } from "../../store/user";
import { getCurrentUserId } from "../../store/auth";
import { useAppDispatch } from "../../store/createStore";
import { UserList } from "./componets/UserList";
import { useApp } from "../../hooks/UseApp";
import clsx from "clsx";

export const Users = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQueries, setSearchQueries] = useState<string[]>([]);
  const { isDark } = useApp();
  const currentUserId = useSelector(getCurrentUserId());
  const searchedUsers = useSelector(getSearchedUsers());
  const filteredUsers = searchedUsers.filter(
    (u) => checkString(searchQuery, u.username) && u._id !== currentUserId
  );
  const dispatch = useAppDispatch();
  const handleSearchQuery = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    await setSearchQuery(target.value);
  };
  useEffect(() => {
    if (searchQuery && !searchQueries.includes(searchQuery)) {
      setSearchQueries((prevState) => [...prevState, searchQuery]);
      dispatch(searchUser(searchQuery));
    }
  }, [searchQuery]);
  return (
    <div
      className={clsx(
        "py-6  w-full h-full  border-r ",
        isDark ? "border-gray-700" : "border-gray-200"
      )}
    >
      <UserHeader />
      <div className="px-6">
        <SearchField
          placeholder="Search Users"
          search={handleSearchQuery}
          value={searchQuery}
        />
      </div>
      {filteredUsers.length > 0 && (
        <div className="pt-8  scrollbar scrollbar-w-1    scrollbar-thumb-gray-400 scrollbar-track-gray-200 overflow-x-hidden     overflow-auto  ">
          <UserList users={filteredUsers} />
        </div>
      )}
    </div>
  );
};
