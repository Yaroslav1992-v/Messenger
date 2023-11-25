import clsx from "clsx";
import React from "react";
import { useApp } from "../hooks/UseApp";
import { TitleProps } from "./componentTypes";

export const Title: React.FC<TitleProps> = ({ className, hType, text }) => {
  const { isDark } = useApp();
  const style = clsx(
    className,
    "capitalize font-semibold",
    isDark && "text-white"
  );
  switch (hType) {
    case "h1":
      return <h1 className={style}>{text}</h1>;
    case "h2":
      return <h2 className={style}>{text}</h2>;
    case "h3":
      return <h3 className={style}>{text}</h3>;
    case "h4":
      return <h4 className={style}>{text}</h4>;
  }
};
