import React from "react";
import { ClassDisplayProps } from "../types";

const ClassDisplay: React.FC<ClassDisplayProps> = ({
  name,
  isEligible,
  onClick,
}) => {
  return (
    <div onClick={onClick}>
      <strong>
        <span className={`${isEligible ? "text-red" : ""}`}>{name}</span>
      </strong>
    </div>
  );
};

export default ClassDisplay;
