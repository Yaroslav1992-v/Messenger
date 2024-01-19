import React, { useState } from "react";
import { Title, CloseBtn, IconBtn, Modal } from "../../index";
import { MdOutlineGroup } from "react-icons/md";
import { bluePrimary, white } from "../../../colors/colors";
import { GroupModal } from "../../Modal/GroupModal";
import { useApp } from "../../../hooks/UseApp";
export const ChatsHeader: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [modal, setModal] = useState<boolean>(false);
  const { toggleMenu } = useApp();
  const toggleModal = () => {
    setModal((prev) => !prev);
  };
  return (
    <>
      <div className="w-full mb-6 px-6">
        <div className="flex justify-between w-full">
          <Title hType="h2" text="chats" className="text-4xl" />
          <div className="flex items-center">
            <IconBtn
              hoverText="New Group"
              isDark={isDark}
              Icon={<MdOutlineGroup size={25} color={bluePrimary} />}
              action={toggleModal}
            />
            <div className="block lg:hidden">
              <CloseBtn action={toggleMenu} />
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <div className="absolute  inset-0  z-30">
          <Modal
            Icon={<MdOutlineGroup size={25} color={white} />}
            modalName="New Group"
            close={toggleModal}
          >
            <GroupModal />
          </Modal>
        </div>
      )}
    </>
  );
};
