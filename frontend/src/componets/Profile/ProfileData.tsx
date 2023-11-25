import React from "react";
import { UserData } from "../../store/types";
import { ProfieTab } from "./ProfieTab";

export const ProfileData: React.FC<{ user: UserData }> = ({ user }) => {
  return (
    <div>
      {user.about && <ProfieTab name="About" value={user.about} />}
      {user.phone && <ProfieTab name="Phone" value={user.phone} />}
      {user.city && <ProfieTab name="City" value={user.city} />}
      {user.website && <ProfieTab name="website" value={user.website} />}
    </div>
  );
};
