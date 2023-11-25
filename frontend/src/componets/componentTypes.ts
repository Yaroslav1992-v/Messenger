export interface ButtonProps {
  type?: "submit" | "button";
  onClick?: () => void;
  text: string;
  disabled?: boolean;
}
export interface HoverInfoProps {
  size: string;
  text: string;
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
  className: string;
  hType: "h1" | "h2" | "h3" | "h4";
}
