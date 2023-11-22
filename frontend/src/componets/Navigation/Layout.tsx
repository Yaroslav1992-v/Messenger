import clsx from "clsx";
import { useApp } from "../../hooks/UseApp";
import { Logo } from "../Logo";
import Menu from "./Menu";
import NavBottom from "./NavBottom";
export const Layout = () => {
  const { isDark } = useApp();
  return (
    <div className={clsx(`layout h-screen `, isDark && "bg-primary")}>
      <nav
        className={clsx(
          "menu flex flex-col items-center max-w-[100px] py-6 w-full h-full border-r",
          isDark ? "border-gray-700" : "border-gray-200"
        )}
      >
        <Logo size="sm" />
        <Menu />
        <NavBottom />
      </nav>
    </div>
  );
};
