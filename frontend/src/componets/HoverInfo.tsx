import { HoverInfoProps } from "./componentTypes";

export const HoverInfo: React.FC<HoverInfoProps> = ({ text, size }) => {
  return (
    <span
      style={{ right: size }}
      className="info-item absolute flex top-0 p-2 rounded-md inset-y-auto z-30 
           bg-slate-950 capitalize opacity-0  text-white text-base transition duration-300"
    >
      {text}
    </span>
  );
};
