import React from "react";
import { Title } from "../index";
export const ProfieTab: React.FC<{ name: string; value: string }> = ({
  name,
  value,
}) => {
  return (
    <div className="mb-2">
      <Title text={name} className="text-lg mb-2" hType="h4" />
      <div className="text-gray-500 font-medium">
        <p>{value}</p>
      </div>
    </div>
  );
};
