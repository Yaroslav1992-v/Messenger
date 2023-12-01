import { HoverInfoProps } from "./componentTypes";

export const HoverInfo: React.FC<HoverInfoProps> = ({ text, style }) => {
  return (
    <span
      style={style}
      className="hover absolute   flex   p-2 rounded-md inset-y-auto z-30  whitespace-nowrap
           bg-slate-950 capitalize  opacity-0  text-white text-base transition duration-300"
    >
      {text}
    </span>
  );
};
