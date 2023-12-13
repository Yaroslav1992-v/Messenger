import React from "react";
import { ModalProps } from "./types";
import ModalHeader from "./ModalHeader";
import { useApp } from "../../hooks/UseApp";
import clsx from "clsx";
export const Modal: React.FC<ModalProps> = ({
  modalName,
  children,
  close,
  Icon,
}) => {
  const { isDark } = useApp();
  return (
    <div
      className={`fixed bg-black bg-opacity-75 inset-0 overflow-y-auto  z-40  ${"block"}`}
      id="crud-modal"
    >
      <div className="flex   mt-10 justify-center min-h-screen">
        <div className="relative p-4 w-full max-w-md max-h-full opacity-100">
          <div
            className={clsx(
              "relative  rounded-lg shadow dark:bg-gray-700",
              isDark ? "bg-primary" : "bg-white"
            )}
          >
            <ModalHeader Icon={Icon} title={modalName} close={close} />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
