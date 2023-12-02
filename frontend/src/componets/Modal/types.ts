import { ReactNode } from "react";

export interface TabsProps<T> {
  action: (tab: T) => void;
  active: T;
  tabs: T[];
}
export interface ModalProps {
  modalName: string;
  children: ReactNode;
  close: () => void;
  Icon: JSX.Element;
}
