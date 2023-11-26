import { useEffect, useState } from "react";
import { Layout, SearchField } from "../../componets";
import { UserHeader } from "./componets/UserHeader";
import { checkString } from "../../utils/helpers";
import { useSelector } from "react-redux";
import { getSearchedUsers, searchUser } from "../../store/user";
import { getCurrentUserId } from "../../store/auth";
import { useAppDispatch } from "../../store/createStore";
import { UserList } from "./componets/UserList";
import { useApp } from "../../hooks/UseApp";
import clsx from "clsx";

const Users = () => {
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
    <Layout>
      <div
        className={clsx(
          "py-6  max-w-ds w-full border-r",
          isDark ? "border-gray-700" : "border-gray-200"
        )}
      >
        <UserHeader />
        <div className="px-6">
          <SearchField search={handleSearchQuery} value={searchQuery} />{" "}
        </div>
        <div className="pt-8">
          <UserList users={filteredUsers} />
        </div>
      </div>
    </Layout>
  );
};

export default Users;
