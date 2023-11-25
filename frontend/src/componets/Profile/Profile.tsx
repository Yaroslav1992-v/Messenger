import React, { useEffect } from "react";
import { ProfileHeader } from "./ProfileHeader";
import { useSelector } from "react-redux";
import { getCurrentUser, loadCurrentUser } from "../../store/auth";
import { ProfileInfo } from "./ProfileInfo";
import { useAppDispatch } from "../../store/createStore";
import { ProfileData } from "./ProfileData";
import { ProfileSocial } from "./ProfileSocial";
import { useApp } from "../../hooks/UseApp";
import clsx from "clsx";

export const Profile: React.FC<{ userId: string }> = ({ userId }) => {
  const user = useSelector(getCurrentUser());
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!user || (user && !("social" in user))) {
      dispatch(loadCurrentUser(false));
    }
  }, [user]);
  const { isDark } = useApp();
  return (
    <div
      className={clsx(
        "absolute right-0 top-0 p-7 max-w-ds",
        "w-full border-l border-b  ",
        isDark ? "border-gray-700" : "border-gray-200"
      )}
    >
      <ProfileHeader />
      {user && "social" in user && (
        <>
          <ProfileInfo user={user} />
          <ProfileData user={user} />
          <ProfileSocial social={user.social || []} />
        </>
      )}
    </div>
  );
};
