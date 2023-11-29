import { ReactNode } from "react";

export interface ButtonProps {
  type?: "submit" | "button";
  onClick?: () => void;
  text: string;
  disabled?: boolean;
}
export interface HoverInfoProps {
  size: string;
  text: string;
  className?: string;
}
export interface AvatarProps {
  size: "sm" | "large";
  image?: string;
}
export interface DropDownProps {
  name: string;
  action: () => void;
  last?: boolean;
}
export interface TitleProps {
  text: string;
  className?: string;
  hType: "h1" | "h2" | "h3" | "h4";
}
export interface IconBtnProps {
  Icon: JSX.Element;
  action: () => void;
  isDark: boolean;
  name?: string;
}
export interface UserPreviewProps {
  text: string;
  image?: string;
  children?: ReactNode;
  className?: string;
}
