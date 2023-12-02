import React from "react";
import { Title } from "../../Title";

export const ChatInfo: React.FC<{ chatName: string; desc?: string }> = ({
  chatName,
  desc,
}) => {
  return (
    <div>
      <Title className="mb-2" hType="h3" text={chatName} />
      {desc && (
        <div className="text-gray-400 font-medium">
          <p>{desc}</p>
        </div>
      )}
    </div>
  );
};
