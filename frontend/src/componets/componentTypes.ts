import { ReactNode } from "react";

export interface ButtonProps {
  type?: "submit" | "button";
  onClick?: () => void;
  text: string;
  disabled?: boolean;
}
export interface HoverInfoProps {
  text: string;
  className?: string;
  style: {};
}
export interface AvatarProps {
  size: "xs" | "sm" | "large";
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
  hoverText?: string;
}
export interface ItemPreviewProps {
  text: string;
  image?: string;
  children?: ReactNode;
  className?: string;
}
