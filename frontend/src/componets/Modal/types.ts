import { ReactNode } from "react";

export type Tab = "personal" | "about" | "social";
export interface EditTabsProps {
  action: (tab: Tab) => void;
  active: Tab;
}
export interface ModalProps {
  modalName: string;
  children: ReactNode;
  close: () => void;
  Icon: JSX.Element;
}
