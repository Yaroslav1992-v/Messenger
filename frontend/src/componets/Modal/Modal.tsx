import React from "react";
import { ModalProps } from "./types";
import ModalHeader from "./ModalHeader";
export const Modal: React.FC<ModalProps> = ({
  modalName,
  children,
  close,
  Icon,
}) => {
  return (
    <div
      className={`fixed bg-black bg-opacity-75 inset-0 overflow-y-auto  z-10  ${"block"}`}
      id="crud-modal"
    >
      <div className="flex   mt-32 justify-center min-h-screen">
        <div className="relative p-4 w-full max-w-md max-h-full opacity-100">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <ModalHeader Icon={Icon} title={modalName} close={close} />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
