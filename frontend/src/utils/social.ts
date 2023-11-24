import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from "../componets/Icons";
import { Social } from "../store/types";
export interface SocialWithIcon extends Social {
  Icon: () => JSX.Element;
}
export const setUserSocials = (data: Social[]): SocialWithIcon[] => {
  const social: SocialWithIcon[] = [
    { name: "facebook", Icon: FacebookIcon, value: "" },
    { name: "github", Icon: GithubIcon, value: "" },
    { name: "instagram", Icon: InstagramIcon, value: "" },
    { name: "linkedIn", Icon: LinkedInIcon, value: "" },
    { name: "twitter", Icon: TwitterIcon, value: "" },
  ];
  for (let i = 0; i < social.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (social[i].name === data[j].name) {
        social[i].value = data[j].value;
      }
    }
  }
  return social;
};
export const deleteIcon = (data: SocialWithIcon[]): Social[] => {
  return data.map((item) => {
    return { name: item.name, value: item.value };
  });
};
