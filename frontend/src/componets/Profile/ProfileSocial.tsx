import React from "react";
import { Social } from "../Form/formTypes";
import { SocialWithIcon, setUserSocials } from "../../utils/social";
import clsx from "clsx";
import { useApp } from "../../hooks/UseApp";

export const ProfileSocial: React.FC<{ social: Social[] }> = ({ social }) => {
  const { isDark } = useApp();
  const socials = setUserSocials(social);
  const renderSoical = (s: SocialWithIcon, i: number) => {
    if (s.value) {
      return (
        <li className="mr-2" key={s.name + i}>
          <a href={s.value}>
            <s.Icon />
          </a>
        </li>
      );
    }
  };
  return (
    <div>
      <h4
        className={clsx(
          "font-semibold text-lg capitilize capitalize mb-2",
          isDark && "text-white"
        )}
      >
        Social Media Accounts
      </h4>
      <ul className="flex flex-wrap">
        {socials.map((s, i) => renderSoical(s, i))}
      </ul>
    </div>
  );
};
