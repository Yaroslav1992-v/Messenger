export interface ButtonProps {
  type?: "submit" | "button";
  onClick?: () => void;
  text: string;
}
