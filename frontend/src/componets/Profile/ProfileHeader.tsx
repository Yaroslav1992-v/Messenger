import { useApp } from "../../hooks/UseApp";
import { Title, CloseBtn } from "../index";

export const ProfileHeader = () => {
  const { closeProfile } = useApp();
  return (
    <div className="flex w-full justify-between items-center  mb-14">
      <Title text="profile" className="text-4xl" hType="h2" />
      <CloseBtn action={closeProfile} />
    </div>
  );
};
