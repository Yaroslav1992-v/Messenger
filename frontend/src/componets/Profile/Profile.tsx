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
import { getUserData, loadUser } from "../../store/user";

export const Profile = () => {
  const user = useSelector(getCurrentUser());
  const { isDark, profileId } = useApp();
  const userData = useSelector(getUserData());
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!user || (user && !("social" in user) && user._id === profileId)) {
      dispatch(loadCurrentUser(false));
    }
    if (profileId !== user?._id) {
      dispatch(loadUser(profileId));
    }
  }, [user, profileId]);

  const profile =
    profileId !== user?._id ? userData : "social" in user ? user : null;
  return (
    <div
      className={clsx(
        "absolute right-0 top-0 p-7  z-40  max-w-ds ",
        "w-full border-l border-b overflow-y-scroll h-full ",
        isDark ? "border-gray-700 bg-primary" : "border-gray-200 bg-white"
      )}
    >
      <ProfileHeader />
      {profile && (
        <>
          <ProfileInfo user={profile} />
          <ProfileData user={profile} />
          <ProfileSocial social={profile.social || []} />
        </>
      )}
    </div>
  );
};
